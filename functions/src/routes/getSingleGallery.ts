import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Gallery } from '../model/gallery';
import { Image } from '../model/image';

const cors = require('cors')({origin: true});

export const getSingleGallery = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            if (request.query.id !== undefined) {
                const type: string = (request.query.isPortfolio !== undefined && request.query.isPortfolio === 'true') ? 'portfolio' : 'galleries';
                const idToGet: string = request.query.id !== 'null' ? request.query.id as string : '';

                const gallery = await admin.database().ref(`${type}/${idToGet}`)
                                                        .once('value')
                                                        .then(
                                                            value => {
                                                                functions.logger.info(value.val(), {structuredData: true});
                                                                return value.val();
                                                            }
                                                        ).catch((error) => { throw error; }) as Gallery;
                
                if (gallery !== null) {
                    gallery.photos = [];
                    if (type === 'galleries') {
                        gallery.highlighted = await admin.database().ref(`images/${gallery.highlightedId}`)
                                                                        .once('value')
                                                                        .then(value => {
                                                                            return value.val();
                                                                        })
                                                                        .catch(error => { throw error; }) as Image;
                    }
                    if (gallery.photosID !== undefined) {
                        for (const id of gallery.photosID) {
                            gallery.photos.push(
                                await admin.database().ref(`images/${id}`)
                                                        .once('value')
                                                        .then(value => value.val())
                                                        .catch(error => { throw error; }) as Image);
                        }
                    } else {
                        gallery.photosID = [];
                    }

                    response.status(200).json(
                        {
                            status: 200,
                            datas: gallery,
                        }
                    );
                } else {
                    response.status(200).json(
                        {
                            status: 200,
                            datas: null,
                        }
                    );
                }
            } else {
                throw new Error('id is undifined');
            }
        } catch (error) {
            functions.logger.error(error, {structuredData: true});
            response.status(500).json({
                status: 500,
                message: error,
            });
        }
    });
});
