const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
	const transporter = mailer.createTransport({
		service: 'gmail',
		auth: {
			user: "skillxchange007@gmail.com",
			pass: "ckdq xlsv pbll mcof"
		}
	})
	const mailOptions = {
		from: 'skillxchange007@gmail.com',
		to: to,
		subject: subject,
		html: text
	}
	const mailresponse = await transporter.sendMail(mailOptions);
	console.log(mailresponse);
	return mailresponse;

}
module.exports = {
	sendingMail
}