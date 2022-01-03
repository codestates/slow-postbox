'use strict';
const db = require('../../db');
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (req, res) => {
  const { receiver } = req.body;
  // console.log(receiver)
  try {
    const sql = `SELECT email FROM users WHERE email = ?`;
    const params = [receiver];
    const [result, fields, err] = await db.query(sql, params);
    if (err) {
      console.log(err);
      return;
    }
    if (result.length === 0) {
      //일치하는 이메일이 없는 경우 (해당 이메일로 회원가입 가능하므로 인증번호 보내기)

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
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
          console.log('Server is ready to take our messages');
        }
      });
      let str = '';
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
        subject: '💌느린우체통 회원가입 인증코드가 도착했습니다💌', // Subject line
        text: `느린 우체통 이메일 인증 코드입니다.${str}`, // plain text body
        html: `<table class="wrapper" style="border-collapse: collapse;table-layout: fixed;min-width: 320px;width: 100%;background-color: #fff;" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td>
        <div role="banner">
          <div class="preheader" style="Margin: 0 auto;max-width: 560px;min-width: 280px; width: 280px;width: calc(28000% - 167440px);">
            <div style="border-collapse: collapse;display: table;width: 100%;">
            <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
              <div class="snippet" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 140px; width: 140px;width: calc(14000% - 78120px);padding: 10px 0 5px 0;color: #000;font-family: Avenir,sans-serif;">
                
              </div>
            <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
              <div class="webversion" style="display: table-cell;Float: left;font-size: 12px;line-height: 19px;max-width: 280px;min-width: 139px; width: 139px;width: calc(14100% - 78680px);padding: 10px 0 5px 0;text-align: right;color: #000;font-family: Avenir,sans-serif;">
                <p style="Margin-top: 0;Margin-bottom: 0;" emb-social="webversion">No images? <webversion style="text-decoration: underline;">Click here</webversion></p>
              </div>
            <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </div>
          </div>
          
        </div>
        <div>
        <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #e84b35;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #e84b35;"><td style="width: 600px" class="w560"><![endif]-->
            <div class="column" style="text-align: left;color: #000;font-size: 16px;line-height: 24px;font-family: Avenir,sans-serif;">
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 40px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 1px;">&nbsp;</div>
      </div>
          
              <div style="Margin-left: 20px;Margin-right: 20px;">
          <div style="font-size: 12px;font-style: normal;font-weight: normal;line-height: 19px;" align="center">
            <a style="text-decoration: underline;transition: opacity 0.1s ease-in;color: #418812;" href="http://www.example.com"><img style="border: 0;display: block;height: auto;width: 100%;max-width: 545px;" alt="" width="545" src="https://i.imgur.com/jQf2E3L.png" /></a>
          </div>
        </div>
          
            </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
    
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
    
        <div class="layout one-col fixed-width stack" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;">
          <div class="layout__inner" style="border-collapse: collapse;display: table;width: 100%;background-color: #ffffff;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
            <div class="column" style="text-align: left;color: #000;font-size: 16px;line-height: 24px;font-family: Avenir,sans-serif;">
          
          <div style="font-size: 12px;font-style: normal;font-weight: normal;line-height: 19px;" align="center">
            <img class="gnd-corner-image gnd-corner-image-center gnd-corner-image-top" style="border: 0;display: block;height: auto;width: 100%;max-width: 900px;" alt="" width="600" src="https://i.imgur.com/jFvaC4w.png?1" />
          </div>
        
              <div style="Margin-left: 20px;Margin-right: 20px;Margin-top: 20px;">
        <div style="mso-line-height-rule: exactly;mso-text-raise: 11px;vertical-align: middle;">
          <p class="size-20;" style="text-align: center;">이메일 인증코드는 <span class="size-28">${str}</span>입니다.</p>
          <p class="size-14" style="Margin-top: 0;Margin-bottom: 20px;font-size: 14px;line-height: 21px;text-align: center;" lang="x-size-14">느린 우체통은 예약한 날짜에 맞추어 메일을 보내드리는 서비스를 제공합니다. 미래의 나에게 또는 소중한 누군가에게, 전하고 싶은 얘기가 있다면 느린 우체통에서 마음을 전달하세요!</p>
        </div>
      </div>
             
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </div>
        </div>
    
        <div style="mso-line-height-rule: exactly;line-height: 20px;font-size: 20px;">&nbsp;</div>
    
        </div>
        <div role="contentinfo"><div style="line-height:0px;font-size:0px;" id="footer-top-spacing">&nbsp;</div><div class="layout email-flexible-footer email-footer" style="Margin: 0 auto;max-width: 600px;min-width: 320px; width: 320px;width: calc(28000% - 167400px);overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;" dir="rtl" id="footer-content">
        <div class="layout__inner right-aligned-footer" style="border-collapse: collapse;display: table;width: 100%;">
          <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-email-footer"><![endif]-->
          <!--[if (mso)|(IE)]><td><table cellpadding="0" cellspacing="0"><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top"><![endif]-->
            <div class="column" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;display: none;" dir="ltr">
        <div class="footer-logo emb-logo-margin-box" style="font-size: 26px;line-height: 32px;Margin-top: 10px;Margin-bottom: 20px;color: #7b663d;font-family: Roboto,Tahoma,sans-serif;" align="center">
          <div emb-flexible-footer-logo align="center"></div>
        </div>
      </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top" class="w60"><![endif]-->
            <div class="column" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;display: none;" dir="ltr">
        <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
          <div class="footer__share-button">
            
            
            
            
          </div>
        </div>
      </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td valign="top" class="w260"><![endif]-->
            <table style="border-collapse: collapse;table-layout: fixed;display: inline-block;width: 600px;" cellpadding="0" cellspacing="0"><tbody><tr><td><div class="column js-footer-additional-info" style="text-align: right;font-size: 12px;line-height: 19px;color: #000;font-family: Avenir,sans-serif;width: 600px;" dir="ltr">
        <div style="margin-left: 0;margin-right: 0;Margin-top: 10px;Margin-bottom: 10px;">
          <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 18px;margin-top: 0px;">
            <div bind-to="address"><p class="email-flexible-footer__additionalinfo--center" style="Margin-top: 0;Margin-bottom: 0;"><span style="color:#a1a1a1">&#45712;&#47536; &#50864;&#52404;&#53685;</span></p></div>
          </div>
          <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 18px;margin-top: 0px;">
            <div><p class="email-flexible-footer__additionalinfo--center" style="Margin-top: 0;Margin-bottom: 0;"><span style="color:#a1a1a1">developed by &#47928;&#49440;&#50689;, &#51076;&#50976;&#48712;, &#50504;&#44305;&#51032;, &#44608;&#49548;&#54788;&nbsp;</span></p></div>
          </div>
          <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 15px;">
            <div bind-to="permission"><p class="email-flexible-footer__additionalinfo--center" style="Margin-top: 0;Margin-bottom: 0;"><span style="color:#a1a1a1">&#45712;&#47536;&#50864;&#52404;&#53685; &#49436;&#48708;&#49828;&#50640; &#46384;&#47480; &#49688;&#49888; &#51204;&#50857; &#50508;&#47548;&#47700;&#51068;&#51077;&#45768;&#45796;.</span></p></div>
          </div>
          <div class="email-footer__additional-info" style="font-size: 12px;line-height: 19px;margin-bottom: 15px;">
            <span><preferences style="text-decoration: underline;" lang="en">Preferences</preferences>&nbsp;&nbsp;|&nbsp;&nbsp;</span><unsubscribe style="text-decoration: underline;">Unsubscribe</unsubscribe>
          </div>
          <!--[if mso]>&nbsp;<![endif]-->
        </div>
      </div></td></tr></tbody></table>
          <!--[if (mso)|(IE)]></table></td><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </div>
      </div><div style="line-height:40px;font-size:40px;" id="footer-bottom-spacing">&nbsp;</div></div>
        
      </td></tr></tbody></table>
    <style type="text/css">
  @media (max-width:619px){.email-flexible-footer .left-aligned-footer .column,.email-flexible-footer .center-aligned-footer,.email-flexible-footer .right-aligned-footer .column{max-width:100% !important;text-align:center !important;width:100% !important}.flexible-footer-logo{margin-left:0px !important;margin-right:0px !important}.email-flexible-footer .left-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .center-aligned-footer .flexible-footer__share-button__container,.email-flexible-footer .right-aligned-footer .flexible-footer__share-button__container{display:inline-block;margin-left:5px !important;margin-right:5px !important}.email-flexible-footer__additionalinfo--center{text-align:center !important}.email-flexible-footer .left-aligned-footer table,.email-flexible-footer .center-aligned-footer table,.email-flexible-footer .right-aligned-footer 
  table{display:table !important;width:100% !important}.email-flexible-footer .footer__share-button,.email-flexible-footer .email-footer__additional-info{margin-left:20px;margin-right:20px}}
  </style>`, // html body
      };
      // send mail with defined transport object
      let info = await transporter.sendMail(message);
      //console.log("Message sent: %s", info.messageId);
      return res
        .status(201)
        .json({ data: `${str}`, message: '메시지가 전송되었습니다' });
    } else {
      //console.log("이미 가입된 이메일 존재");
      return res
        .status(200)
        .json({ data: null, message: 'data already exists' });
    }
  } catch (err) {
    console.log(err);
  }
};
