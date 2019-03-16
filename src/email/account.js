/**
 * http://usejsdoc.org/
 */

const sgMail = require('@sendgrid/mail');

const sendGridAPIKey= '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';

sgMail.setApiKey(sendGridAPIKey);

const msg = {
		  to: 'navdeep.singh308@gmail.com',
		  from: 'navdeep.singh308@gmail.com',
		  subject: 'Node JS Example Email ',
		  text: 'Hi, This message was from NODEJS Email Server. ',
		};

sgMail.send(msg);