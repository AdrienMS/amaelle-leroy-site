import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

import { Contact } from '../model/contact';

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const cors = require('cors')({origin: true});

const saveContactInformations = async (contact: Contact) => {
    return await admin.database().ref('contact/').push(contact);
}

export const contactMail = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        functions.logger.info('contact Mail', {structuredData: true});
        functions.logger.info(request.query, {structuredData: true});

        const datas: {
            name: string,
            mail: string,
            phone: string,
            content: string,
            pricing: string,
        } = {name: '', mail: '', phone: '', content: '', pricing: ''};

        if (request.query.name) {
            datas.name = request.query.name.toString();
        }
        if (request.query.mail) {
            datas.mail = request.query.mail.toString();
        }
        if (request.query.phone) {
            datas.phone = request.query.phone.toString();
        }
        if (request.query.content) {
            datas.content = request.query.content.toString();
        }
        if (request.query.pricing) {
            datas.pricing = request.query.pricing.toString();
        }

        functions.logger.info(datas, {structuredData: true});

        const mailOptions = {
            to: 'contact@amaelleleroy.fr',
            subject: `[Amaëlle Leroy] Contact - ${datas.name} pour ${datas.pricing}`,
            html: `<div style="width: 80%;margin: 0 auto;">
                        <h1 style="text-align: center;">Vous avez un nouveau mail depuis le site</h1>
                        <div style="text-align: right;">
                            <p style="margin: 5px 0;">De : ${datas.name}</p>
                            <p style="margin: 5px 0;">Mail : ${datas.mail}</p>
                            <p style="margin: 5px 0;">Téléphone : ${datas.phone}</p>
                            <p style="margin: 5px 0;">Prestation : ${datas.pricing}</p>
                        </div>
                        <div>` + datas.content + 
                        `</div>
                        <p style="text-align: center;">Ceci est un e-mail automatique, merci de ne pas répondre</p>
                    </div>`,
        };

        functions.logger.info(mailOptions, {structuredData: true});

        const mailCustomer = {
            to: datas.mail,
            subject: `Prise de contact avec Amaëlle Leroy`,
            html: `<div style="width: 80%;margin: 0 auto;">
                        <h1 style="text-align: center;">Demande de contact envoyé</h1>
                    </div>
                    <div style="width: 80%;margin: 0 auto;">
                        <p>Bonjour,<br/>
                        <br/>
                        Je vous remercie d'avoir pris le temps de me contacter.<br/>
                        Je vous répondrai dans les plus bref délais.<br/>
                        <br/>
                        Cordialement,<br/>
                        <br/>
                        <span>Amaëlle LEROY</span><br/>
                        <span>06.45.33.59.85</span><br/>
                        <a href="https://amaelleleroy.fr">www.amaelleleroy.fr</a><br/>
                        <img src="https://firebasestorage.googleapis.com/v0/b/amaelleleroy-325ff.appspot.com/o/images%2Fthumbnail-1612972748046?alt=media&token=c0e66193-21c8-4011-88ee-a18b6fcc1492" alt="photo" style="height: 70px;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/amaelleleroy-325ff.appspot.com/o/images%2Ffull-1614614992163?alt=media&token=be930fa3-7ce2-48d4-b16b-65447c1e0c4c" alt="logo" style="height: 70px;"/>
                        </p>
                    </div>
                    <p style="text-align: center;">Ceci est un e-mail automatique, merci de ne pas répondre</p>`,
        };
        functions.logger.info(mailCustomer, {structuredData: true});

        const contact = new Contact(datas.name, datas.pricing, Date.now().toString(), mailOptions.html, false);
        functions.logger.info(contact, {structuredData: true});
        await saveContactInformations(contact);


        return mailTransport.sendMail(mailOptions).then(() => {
            functions.logger.info('Mail sent to: adrien.musserotte@gmail.com', {structuredData: true});
            return mailTransport.sendMail(mailCustomer).then(() => {
                functions.logger.info(`Mail sent to : ${datas.mail}`, {structuredData: true});
                response.status(200).send(true);
            }).catch((err) => {
                functions.logger.error(err, {structuredData: true});
                response.status(500).send(false);
            });
        }).catch((err) => {
            functions.logger.error(err, {structuredData: true});
            response.status(500).send(false);
        });
    });
});