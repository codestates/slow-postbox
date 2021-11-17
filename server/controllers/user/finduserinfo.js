"use strict";
const db = require("../../db");
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (req, res) => {
    const { receiver } = req.body;
    // console.log(receiver)
    try {
        const sql = `SELECT email FROM users WHERE email = ?`;
        const params = [receiver];
        const [result, fields, err] = await db.query(sql, params)
        if (err) {
            console.log(err);
            return
        }
        if (result.length !== 0) {
            //일치하는 이메일이 없는 경우 (해당 이메일로 회원가입 가능하므로 인증번호 보내기)
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            //let testAccount = await nodemailer.createTestAccount();
            // create reusable transporter object using the default SMTP transport

            let transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                //host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.ACCOUNT_USER,
                    pass: process.env.ACCOUNT_PASS,
                },
            });
            // verify transporter
            transporter.verify(function (error, success) {
                if (error) console.log(error);
                else {
                    console.log("Server is ready to take our messages");
                }
            });
            let str = "";
            const generatedRandomCode = () => {
                for (let i = 0; i < 6; i++) {
                    str += Math.floor(Math.random() * 10);
                }
                return str;
            };
            generatedRandomCode();
            const message = {
                from: process.env.ACCOUNT_USER, // sender address
                to: `${receiver}`, // list of receivers
                subject: "Hello ✔", // Subject line
                text: `느린 우체통 이메일 인증 코드입니다.${str}`, // plain text body
                html: `<b>slowpost 인증코드</b><br><p>${str}</p>`, // html body
            };
            // send mail with defined transport object
            let info = await transporter.sendMail(message);
            //console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            return res
                .status(200)
                .json({ data: `${str}`, email: `${receiver}`, message: "메시지가 전송되었습니다" });
        } else {
            //console.log("이미 가입된 이메일 존재");
            return res
                .status(200)
                .json({ data: null, message: "이미 가입된 이메일입니다" });
        }
    } catch (err) {
        console.log(err);
    }
};
