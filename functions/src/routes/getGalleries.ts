import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Gallery } from '../model/gallery';
import { Image } from '../model/image';

const cors = require('cors')({origin: true});

export const getGalleries = functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const galleries = await admin.database().ref('galleries/').once('value').then(value => { return value.val() }).catch((error) => { throw error }) as Array<Gallery>;

            if (galleries !== null) {
                for (const gallery of galleries) {
                    gallery.photos = [];
                    gallery.highlighted = await admin.database().ref(`images/${gallery.highlightedId}`).once('value').then(value => { return value.val() }).catch(error => { throw error }) as Image;
                    for(const id of gallery.photosID) {
                        gallery.photos.push(await admin.database().ref(`images/${id}`).once('value').then(value => { return value.val() }).catch(error => { throw error }) as Image);
                    }
                }
            }

            response.status(200).json(
                {
                    status: 200,
                    datas: galleries,
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
