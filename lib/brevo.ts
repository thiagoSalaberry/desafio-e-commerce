import * as brevo from "@getbrevo/brevo";
let apiInstance = new brevo.AccountApi();

apiInstance.setApiKey(
  brevo.AccountApiApiKeys.apiKey,
  process.env.BREVO_CODE_SENDER
);

let emailSender = new brevo.TransactionalEmailsApi();
emailSender.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_CODE_SENDER
);
let sendSmtpEmail = new brevo.SendSmtpEmail();
export async function sendCodeEmail(email: string, code: number) {
  sendSmtpEmail.subject = "Tu código para ingresar";
  sendSmtpEmail.htmlContent = `<html><body><h1>Desafío E-Commerce: Backend</h1><p>Tu código para ingresar es:</p></br><h2>${code}</h2></body></html>`;
  sendSmtpEmail.sender = { name: "Teoxys", email: "teoxys.tattoo@gmail.com" };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "New Subject",
  };
  await emailSender.sendTransacEmail(sendSmtpEmail);
}

export async function sendPaymentEmail(email: string, productTitle: string) {
  sendSmtpEmail.subject = `Compraste ${productTitle}`;
  sendSmtpEmail.htmlContent = `<html><body><h1>Desafío E-Commerce: Backend</h1><p>¡Tu compra se realizó con éxito!</p></body></html>`;
  sendSmtpEmail.sender = { name: "Teoxys", email: "teoxys.tattoo@gmail.com" };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.params = {
    parameter: "My param value",
    subject: "New Subject",
  };
  await emailSender.sendTransacEmail(sendSmtpEmail);
}
