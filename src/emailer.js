// sending ordinary emails using SendGrid API
// https://sendgrid.com/docs/for-developers/sending-email/quickstart-nodejs/
const sgMail = require('@sendgrid/mail')

// sending emails using the full SendGrid API
// for example if we want to use dynamic templates
// https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/client
const sgClient = require('@sendgrid/client')

// a little wrapper object that makes
// sending emails more convenient
let emailSender

const initEmailer = async () => {
  if (emailSender) {
    // already created
    return emailSender
  }

  emailSender = {
    /**
     * Sends an email through SendGrid
     * @param {*} options Email options object
     * @returns info object with sent email id
     */
    async sendMail(options) {
      if (process.env.SENDGRID_FROM) {
        options = { ...options, from: process.env.SENDGRID_FROM }
      }
      const info = await sgMail.send(options)
      console.log('Message sent to %s', options.to)

      return info
    },

    /**
     * Sends an email by using SendGrid dynamic design template
     * @see Docs https://sendgrid.api-docs.io/v3.0/mail-send/v3-mail-send
     */
    async sendTemplateEmail({ from, template_id, dynamic_template_data, to }) {


      // console.log('zalupa:')
      // console.log(process.env)
      //send json
      return fetch('https://proxiedmail.com/api/v1/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Token': process.env.PROXIEDMAIL_API_TOKEN,
        },
        body: JSON.stringify({
          "email": to,
          "name": "Confirmation",
          "message": "Email confirmation code is " + dynamic_template_data.code + '.',
          'subject': 'Confirmation code'
        })
      }).then(response => response.json()).then(data => {
        console.log(data);
      }).catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  return emailSender
}

module.exports = initEmailer
