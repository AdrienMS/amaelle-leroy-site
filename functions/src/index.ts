import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { Gallery } from './model/gallery';

import { contactMail } from './routes/contactMail';
import { deleteImage } from './routes/deleteImage';
import { getGalleries } from './routes/getGalleries';
import { getSingleGallery } from './routes/getSingleGallery';

// const cors = require('cors')({origin: true});

admin.initializeApp();

exports.contactMail = contactMail;
exports.deleteImage = deleteImage;
exports.getGalleries = getGalleries;
exports.getSingleGallery = getSingleGallery;

// export const contactMail = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         functions.logger.info('contact Mail', {structuredData: true});
//         functions.logger.info(request.query, {structuredData: true});

//         const datas: {
//             name: string,
//             mail: string,
//             phone: string,
//             content: string
//         } = {name: '', mail: '', phone: '', content: ''};

//         if (request.query.name) {
//             datas.name = request.query.name.toString();
//         }
//         if (request.query.mail) {
//             datas.mail = request.query.mail.toString();
//         }
//         if (request.query.phone) {
//             datas.phone = request.query.phone.toString();
//         }
//         if (request.query.content) {
//             datas.content = request.query.content.toString();
//         }

//         functions.logger.info(datas, {structuredData: true});

//         const mailOptions = {
//             to: 'adrien.musserotte@gmail.com',
//             subject: `${datas.name} veut vous contacter depuis le site`,
//             html: `<div style="width: 80%;margin: 0 auto;">
//                         <h1 style="text-align: center;">Vous avez un nouveau mail depuis le site</h1>
//                         <div style="text-align: right;">
//                             <p style="margin: 5px 0;">De : ${datas.name}</p>
//                             <p style="margin: 5px 0;">Mail : ${datas.mail}</p>
//                             <p style="margin: 5px 0;">Téléphone : ${datas.phone}</p>
//                         </div>
//                         <div>
//                             <p>${datas.content}</p>
//                         </div>
//                         <p style="text-align: center;">Ceci est un e-mail automatique, merci de ne pas répondre</p>
//                     </div>`,
//         };

//         functions.logger.info(mailOptions, {structuredData: true});

//         const mailCustomer = {
//             to: datas.mail,
//             subject: `Prise de contact avec Amaëlle Leroy`,
//             html: `<div style="width: 80%;margin: 0 auto;">
//                         <h1 style="text-align: center;">Demande de contact envoyé</h1>
//                     </div>
//                     <div style="width: 80%;margin: 0 auto;">
//                         <p>Bonjour,<br/>
//                         <br/>
//                         Je vous remercie d'avoir pris le temps de me contacter.<br/>
//                         Je vous répondrai dans les plus bref délais.<br/>
//                         <br/>
//                         Cordialement,<br/>
//                         <br/>
//                         <span style="text-align:right">Amaëlle LEROY</span>
//                         </p>
//                     </div>
//                     <p style="text-align: center;">Ceci est un e-mail automatique, merci de ne pas répondre</p>`,
//         };
//         functions.logger.info(mailCustomer, {structuredData: true});

//         return mailTransport.sendMail(mailOptions).then(() => {
//             functions.logger.info('Mail sent to: adrien.musserotte@gmail.com', {structuredData: true});
//             return mailTransport.sendMail(mailCustomer).then(() => {
//                 functions.logger.info(`Mail sent to : ${datas.mail}`, {structuredData: true});
//                 response.status(200).send(true);
//             }).catch((err) => {
//                 functions.logger.error(err, {structuredData: true});
//                 response.status(500).send(false);
//             });
//         }).catch((err) => {
//             functions.logger.error(err, {structuredData: true});
//             response.status(500).send(false);
//         });
//     });
// });

export const uploadImages = functions.https.onRequest((request, response) => {
    functions.logger.info('upload', {structuredData: true});
});

// const deleteImageFromGallery = async (type: string, data: Gallery, index: number = -1) => {
//     if (type === 'portfolio') {
//         return await admin.database().ref(type).set(data).then(
//             () => { return true },
//             (error) => { functions.logger.error(error, {structuredData: true}); return false; }
//         );
//     } else {
//         return await admin.database().ref(type).child(index.toString()).set(data).then(
//             () => { return true },
//             (error) => { functions.logger.error(error, {structuredData: true}); return false; }
//         );
//     }
// }

// const deleteInPortfolio = async (portfolio: Gallery, request: functions.https.Request) => {
//     const toDeleteInPortfolio: Array<number> = [];
//     const toDeleteInDraftPortfolio: Array<number> = [];
    
//     functions.logger.info(`portfolio : ${portfolio}`, {structuredData: true});
    
//     if (portfolio !== null && portfolio.photos.length > 0) {
//         for(const [index, photo] of portfolio.photos.entries()) {
//             if (photo === request.query.image_full) {
//                 toDeleteInPortfolio.push(index);
//             }
//         }
//         if (portfolio.draft !== undefined) {
//             for(const [index, photo] of portfolio.draft.photos.entries()) {
//                 if (photo === request.query.image_full) {
//                     toDeleteInDraftPortfolio.push(index);
//                 }
//             }
//         }
//     }
//     let isModifyPortfolio = false;
//     if (toDeleteInPortfolio.length > 0) {
//         for(const index of toDeleteInPortfolio.reverse()) {
//             portfolio.photos.splice(index, 1);
//             isModifyPortfolio = true;
//         }
//     }
//     if (toDeleteInDraftPortfolio.length > 0) {
//         for(const index of toDeleteInDraftPortfolio.reverse()) {
//             portfolio.draft.photos.splice(index, 1);
//             isModifyPortfolio = true;
//         }
//     }
//     if (isModifyPortfolio) {
//         await deleteImageFromGallery('portfolio', portfolio);
//     }
// }

// const deleteInGalleries = async (galleries: Array<Gallery>, request: functions.https.Request) => {
//     const toDeleteInGalleries: Array<number[]> = [];
//     const toDeleteInDrafts: Array<number[]> = [];

//     functions.logger.info(`galleries : ${galleries}`, {structuredData: true});

//     if (galleries.length > 0) {
//         for (const gallery of galleries) {
//             const toDeleteInGallery: Array<number> = [];
//             if (gallery.photos.length > 0) {
//                 for(const [index, photo] of gallery.photos.entries()) {
//                     if (photo === request.query.image_full) {
//                         toDeleteInGallery.push(index);
//                     }
//                 }
//             }
//             toDeleteInGalleries.push(toDeleteInGallery);
//             const toDeleteDraft: Array<number> = [];
//             if (gallery.draft !== undefined && gallery.draft.photos.length > 0) {
//                 for (const [index, photo] of gallery.draft.photos.entries()) {
//                     if (photo === request.query.image_full) {
//                         toDeleteDraft.push(index);
//                     }
//                 }
//             }
//             toDeleteInDrafts.push(toDeleteDraft);
//         }
//     }

//     if (toDeleteInGalleries.length > 0) {
//         for(const [i, indexes] of toDeleteInGalleries.entries()) {
//             let isModify = false;
//             if (indexes.length > 0) {
//                 for(const index of indexes.reverse()) {
//                     galleries[i].photos.splice(index, 1);
//                     isModify = true;
//                 }
//             }
//             if (toDeleteInDrafts[i].length > 0) {
//                 for(const index of toDeleteInDrafts[i].reverse()) {
//                     galleries[i].draft.photos.splice(index, 1);
//                     isModify = true;
//                 }
//             }
//             if (isModify) {
//                 await deleteImageFromGallery('galleries', galleries[i], i);
//             }
//         }
//     }
// }

// const deleteImageFromStorage = async (request: functions.https.Request) => {
//     functions.logger.info(`image_key : ${request.query.image_key}`, {structuredData: true});
//     functions.logger.info(`image_paths : ${request.query.image_paths}`, {structuredData: true});
//     if (request.query.image_key !== undefined && request.query.image_paths !== undefined) {
//         const paths = request.query.image_paths as Array<string>;
//         for (const path of paths) {
//             const f = await admin.storage().bucket('amaelleleroy-325ff.appspot.com').file(path).delete().then(() => { return true }, error => { return error });
//             functions.logger.info(`delete storage : ${f}`, {structuredData: true});
//         }
//         const t = await admin.database().ref('images/').child(request.query.image_key as string).remove().then(() => { return true }, error => { return error });
//         functions.logger.info(`delete database : ${t}`, {structuredData: true});
//       } else {
//           throw new Error('image key or image paths are empty').message;
//       }
// }

// export const deleteImage = functions.https.onRequest(async (request, response) => {
//     cors(request, response, async () => {
//         try {
//             const portfolio = await admin.database().ref('portfolio/').once('value').then(value => { return value.val() }).catch((error) => { throw error }) as Gallery;
//             const galleries = await admin.database().ref('galleries/').once('value').then(value => { return value.val() }).catch((error) => { throw error }) as Array<Gallery>;

//             await deleteInPortfolio(portfolio, request);
//             await deleteInGalleries(galleries, request);

//             await deleteImageFromStorage(request);

//             response.status(200).json(
//                 {
//                     status: 200,
//                     message: 'Image is deleted',
//                 }
//             );
//         } catch (error) {
//             functions.logger.error(error, {structuredData: true});
//             response.status(500).json({
//                 status: 500,
//                 message: error,
//             });
//         }
//     });
// });
