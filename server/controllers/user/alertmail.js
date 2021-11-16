const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (req, res) => {
  const { name, receiverEmail, reserved_at } = req.body;
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
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

    let info = await transporter.sendMail({
      from: process.env.ACCOUNT_USER,
      to: `${receiverEmail}`,
      subject: '느린우체통에서 편지가 도착했습니다', // Subject line
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
        <p class="size-20;"><span class="size-28">${name}</span>님께서 예약전송한 편지가 <span class="size-28">${reserved_at}</span>일에 도착할 예정입니다💌</p>
        <p class="size-14" style="Margin-top: 0;Margin-bottom: 20px;font-size: 14px;line-height: 21px;text-align: center;" lang="x-size-14">&#45712;&#47536; &#50864;&#52404;&#53685;&#51008; &#50696;&#50557;&#54620; &#45216;&#51676;&#50640; &#47582;&#52628;&#50612; &#51060;&#47700;&#51068;&#51012; &#48372;&#45236;&#46300;&#47532;&#45716; &#49436;&#48708;&#49828;&#47484; &#51228;&#44277;&#54633;&#45768;&#45796;. &#54200;&#51648;&#45716; &#45712;&#47536; &#50864;&#52404;&#53685; &#49324;&#51060;&#53944;&#50640;&#49436;&#47564; &#54869;&#51064;&#44032;&#45733;&#54633;&#45768;&#45796;. &#54200;&#51648; &#45236;&#50857;&#51060;&nbsp;&#44417;&#44552;&#54616;&#49884;&#45796;&#47732;&nbsp;&#54616;&#45800;&#51032; &#47553;&#53356;&#47484; &#53685;&#54644; &#54924;&#50896;&#44032;&#51077;&#51012;&nbsp; &#51652;&#54665;&#54644;&#51452;&#49464;&#50836;! &#54200;&#51648; 
&#51204;&#49569;&#45817;&#51068; &#46041;&#51068;&#54620;&nbsp;&#50508;&#47548; &#51060;&#47700;&#51068;&#51012; &#51228;&#44277;&#46300;&#47540; &#50696;&#51221;&#51077;&#45768;&#45796;.&nbsp;</p>
      </div>
    </div>
        
            <div style="Margin-left: 20px;Margin-right: 20px;">
      <div class="btn btn--flat btn--large" style="text-align:center;">
        <![if !mso]><a style="border-radius: 0;display: inline-block;font-size: 14px;font-weight: bold;line-height: 24px;padding: 12px 24px;text-align: center;text-decoration: none !important;transition: opacity 0.1s ease-in;color: #ffffff !important;background-color: #e84b35;font-family: Avenir, sans-serif;" href="https://www.slow-postbox.com">&#44032;&#51077;&#54616;&#47084;&#44032;&#44592;</a><![endif]>
      <!--[if mso]><p style="line-height:0;margin:0;">&nbsp;</p><v:rect xmlns:v="urn:schemas-microsoft-com:vml" href="https://www.slow-postbox.com" style="width:125px" fillcolor="#E84B35" stroke="f"><v:textbox style="mso-fit-shape-to-text:t" inset="0px,12px,0px,12px"><center style="font-size:14px;line-height:24px;color:#FFFFFF;font-family:Avenir,sans-serif;font-weight:bold;mso-line-height-rule:exactly;mso-text-raise:4px">&#44032;&#51077;&#54616;&#47084;&#44032;&#44592;</center></v:textbox></v:rect><![endif]--></div>
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
</style>`,
    });
    return res.status(201).json({ message: '메시지가 전송되었습니다' });
  } catch (err) {
    return res.status(500).json({ message: '서버 에러' });
  }
};
