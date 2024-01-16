import * as brevo from "@getbrevo/brevo";
let apiInstance = new brevo.AccountApi();

apiInstance.setApiKey(brevo.AccountApiApiKeys.apiKey, process.env.BREVO_CODE_SENDER);

let emailSender = new brevo.TransactionalEmailsApi();
emailSender.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_CODE_SENDER);
let sendSmtpEmail = new brevo.SendSmtpEmail();
export async function sendEmail(email:string, code:number) {
    const cleanEmail = email.trim().toLowerCase();
    sendSmtpEmail.subject = "Tu código para ingresar"
    sendSmtpEmail.htmlContent = `<html><body><h1>Desafío E-Commerce: Backend</h1><p>Tu código para ingresar es:</p></br><h2>${code}</h2></body></html>`;
    sendSmtpEmail.sender = {"name":"Teoxys","email":"teoxys.tattoo@gmail.com"};
    sendSmtpEmail.to = [{"email":cleanEmail}];
    sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
    await emailSender.sendTransacEmail(sendSmtpEmail);
};
