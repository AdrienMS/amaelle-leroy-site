import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Gallery } from '../model/gallery';

const cors = require('cors')({origin: true});

const deleteImageFromGallery = async (type: string, data: Gallery, index: number = -1) => {
    if (type === 'portfolio') {
        return await admin.database().ref(type).set(data).then(
            () => { return true },
            (error) => { functions.logger.error(error, {structuredData: true}); return false; }
        );
    } else {
        return await admin.database().ref(type).child(index.toString()).set(data).then(
            () => { return true },
            (error) => { functions.logger.error(error, {structuredData: true}); return false; }
        );
    }
}

const deleteInPortfolio = async (portfolio: Gallery, request: functions.https.Request) => {
    const toDeleteInPortfolio: Array<number> = [];
    const toDeleteInDraftPortfolio: Array<number> = [];
    
    functions.logger.info(`portfolio : ${portfolio}`, {structuredData: true});
    
    if (portfolio !== null && portfolio.photosID.length > 0) {
        for(const [index, photo] of portfolio.photosID.entries()) {
            if (photo === request.query.image_key) {
                toDeleteInPortfolio.push(index);
            }
        }
        if (portfolio.draft !== undefined) {
            for(const [index, photo] of portfolio.draft.photosID.entries()) {
                if (photo === request.query.image_key) {
                    toDeleteInDraftPortfolio.push(index);
                }
            }
        }
    }
    let isModifyPortfolio = false;
    if (toDeleteInPortfolio.length > 0) {
        for(const index of toDeleteInPortfolio.reverse()) {
            portfolio.photosID.splice(index, 1);
            isModifyPortfolio = true;
        }
    }
    if (toDeleteInDraftPortfolio.length > 0) {
        for(const index of toDeleteInDraftPortfolio.reverse()) {
            portfolio.draft.photosID.splice(index, 1);
            isModifyPortfolio = true;
        }
    }
    if (isModifyPortfolio) {
        await deleteImageFromGallery('portfolio', portfolio);
    }
}

const deleteInGalleries = async (galleries: Array<Gallery>, request: functions.https.Request) => {
    const toDeleteInGalleries: Array<number[]> = [];
    const toDeleteInDrafts: Array<number[]> = [];

    functions.logger.info(`galleries : ${galleries}`, {structuredData: true});

    if (galleries.length > 0) {
        for (const gallery of galleries) {
            const toDeleteInGallery: Array<number> = [];
            if (gallery.photosID.length > 0) {
                for(const [index, photo] of gallery.photosID.entries()) {
                    if (photo === request.query.image_key) {
                        toDeleteInGallery.push(index);
                    }
                }
            }
            toDeleteInGalleries.push(toDeleteInGallery);
            const toDeleteDraft: Array<number> = [];
            if (gallery.draft !== undefined && gallery.draft.photosID.length > 0) {
                for (const [index, photo] of gallery.draft.photosID.entries()) {
                    if (photo === request.query.image_key) {
                        toDeleteDraft.push(index);
                    }
                }
            }
            toDeleteInDrafts.push(toDeleteDraft);
        }
    }

    if (toDeleteInGalleries.length > 0) {
        for(const [i, indexes] of toDeleteInGalleries.entries()) {
            let isModify = false;
            if (indexes.length > 0) {
                for(const index of indexes.reverse()) {
                    galleries[i].photosID.splice(index, 1);
                    isModify = true;
                }
            }
            if (toDeleteInDrafts[i].length > 0) {
                for(const index of toDeleteInDrafts[i].reverse()) {
                    galleries[i].draft.photosID.splice(index, 1);
                    isModify = true;
                }
            }
            if (isModify) {
                await deleteImageFromGallery('galleries', galleries[i], i);
            }
        }
    }
}

const deleteImageFromStorage = async (request: functions.https.Request) => {
    functions.logger.info(`image_key : ${request.query.image_key}`, {structuredData: true});
    functions.logger.info(`image_paths : ${request.query.image_paths}`, {structuredData: true});
    if (request.query.image_key !== undefined && request.query.image_paths !== undefined) {
        const paths = request.query.image_paths as Array<string>;
        for (const path of paths) {
            const f = await admin.storage().bucket('amaelleleroy-325ff.appspot.com').file(path).delete().then(() => { return true }, error => { return error });
            functions.logger.info(`delete storage : ${f}`, {structuredData: true});
        }
        const t = await admin.database().ref('images/').child(request.query.image_key as string).remove().then(() => { return true }, error => { return error });
        functions.logger.info(`delete database : ${t}`, {structuredData: true});
      } else {
          throw new Error('image key or image paths are empty').message;
      }
}

export const deleteImage = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const portfolio = await admin.database().ref('portfolio/').once('value').then(value => { return value.val() }).catch((error) => { throw error }) as Gallery;
            const galleries = await admin.database().ref('galleries/').once('value').then(value => { return value.val() }).catch((error) => { throw error }) as Array<Gallery>;

            await deleteInPortfolio(portfolio, request);
            await deleteInGalleries(galleries, request);

            await deleteImageFromStorage(request);

            response.status(200).json(
                {
                    status: 200,
                    message: 'Image is deleted',
                }
            );
        } catch (error) {
            functions.logger.error(error, {structuredData: true});
            response.status(500).json({
                status: 500,
                message: error,
            });
        }
    });
});
