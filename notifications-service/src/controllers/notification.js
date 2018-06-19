const nodemailer = require('nodemailer');
const nodemailerExpressHandlebars = require('nodemailer-express-handlebars');
const handlebars = require('express-handlebars');
const path = require('path');



function setUpViewEngine(transporter){
    const viewEngine = handlebars.create({});
    const compiler = nodemailerExpressHandlebars({
        viewEngine: viewEngine,
        viewPath: path.join(__dirname, '../views'),
        extName: '.hbs'
    });
    transporter.use('compile', compiler);
}


async function createAccount(){
    return await nodemailer.createTestAccount();
}


/**
 *
 * @returns {Promise<*|Error>}
 */
async function createTransport() {
    const account = await createAccount();
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });
    setUpViewEngine(transporter);
    return transporter;
}


let transporter = null;


module.exports = {
    /**
     *
     * @param {object} mail
     * @param {string} mail.from
     * @param {string} mail.to
     * @param {string} mail.subject
     * @param {string} mail.template - template name in 'views' directory
     * @param {object} mail.context - template data
     * @returns {Promise<void|Error>}
     */
    async send(mail){
        transporter = transporter || await createTransport();
        const info =  await transporter.sendMail(mail);
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
};