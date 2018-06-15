const nodemailer = require('nodemailer');



async function createAccount(){
    try{
        const account= await nodemailer.createTestAccount();
        return account;
    }catch (e) {
        return Promise.reject(e);
    }
}


async function createTransport(){
    try{
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
        return Promise.resolve(transporter);
    }catch (e) {
        return Promise.reject(e);
    }
}


let transporter = null;


module.exports = {
    /**
     *
     * @param {object} mailOptions
     * @param {string} mailOptions.from
     * @param {string} mailOptions.to
     * @param {string} mailOptions.subject
     * @param {string} mailOptions.text
     * @returns {Promise<void>}
     */
    async send(mailOptions){
        transporter = transporter || await createTransport();
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return Promise.reject(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            return Promise.resolve();
        });
    }
};