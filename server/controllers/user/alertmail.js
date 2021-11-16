const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async (req, res) => {
  const { name, receiverEmail, reservedDate } = req.body;
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
      html: `<body class="main half-padding" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%">
      <table
        class="wrapper"
        style="
          border-collapse: collapse;
          table-layout: fixed;
          min-width: 320px;
          width: 100%;
          background-color: #f0eee7;"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
      >
        <tbody>
          <tr>
            <td>
              <div role="banner">
                <div
                  class="preheader"
                  style="
                    margin: 0 auto;
                    max-width: 560px;
                    min-width: 280px;
                    width: 280px;
                    width: calc(28000% - 167440px);
                  "
                >
                  <div
                    style="border-collapse: collapse; display: table; width: 100%"
                  >
                    <!--[if (mso)|(IE)]><table align="center" class="preheader" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="width: 280px" valign="top"><![endif]-->
                    <div
                      class="snippet"
                      style="
                        display: table-cell;
                        float: left;
                        font-size: 12px;
                        line-height: 19px;
                        max-width: 280px;
                        min-width: 140px;
                        width: 140px;
                        width: calc(14000% - 78120px);
                        padding: 10px 0 5px 0;
                        color: #b3b3b3;
                        font-family: PT Sans, Trebuchet MS, sans-serif;
                      "
                    ></div>
                    <!--[if (mso)|(IE)]></td><td style="width: 280px" valign="top"><![endif]-->
                    <div
                      class="webversion"
                      style="
                        display: table-cell;
                        float: left;
                        font-size: 12px;
                        line-height: 19px;
                        max-width: 280px;
                        min-width: 139px;
                        width: 139px;
                        width: calc(14100% - 78680px);
                        padding: 10px 0 5px 0;
                        text-align: right;
                        color: #b3b3b3;
                        font-family: PT Sans, Trebuchet MS, sans-serif;
                      "
                    ></div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="layout one-col fixed-width stack"
                  style="
                    margin: 0 auto;
                    max-width: 600px;
                    min-width: 320px;
                    width: 320px;
                    width: calc(28000% - 167400px);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                  "
                >
                  <div
                    class="layout__inner"
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #ffffff;"><td style="width: 600px" class="w560"><![endif]-->
                    <div
                      class="column"
                      style="
                        text-align: left;
                        color: #61606c;
                        font-size: 16px;
                        line-height: 24px;
                        font-family: PT Serif, Georgia, serif;
                      "
                    >
                      <div
                        style="
                          font-size: 12px;
                          font-style: normal;
                          font-weight: normal;
                          line-height: 19px;
                        "
                        align="center"
                      >
                        <img
                          class="
                            gnd-corner-image
                            gnd-corner-image-center
                            gnd-corner-image-top
                          "
                          style="
                            border: 0;
                            display: block;
                            height: auto;
                            width: 100%;
                            max-width: 900px;
                          "
                          alt=""
                          width="600"
                          src="https://i.imgur.com/TWkwmVO.png"
                        />
                      </div>
  
                      <div
                        style="
                          margin-left: 20px;
                          margin-right: 20px;
                          margin-top: 20px;
                        "
                      >
                        <div
                          style="
                            mso-line-height-rule: exactly;
                            line-height: 20px;
                            font-size: 1px;
                          "
                        >
                          &nbsp;
                        </div>
                      </div>
  
                      <div style="margin-left: 20px; margin-right: 20px">
                        <div
                          style="
                            mso-line-height-rule: exactly;
                            mso-text-raise: 11px;
                            vertical-align: middle;
                          "
                        >
                          <h1
                            style="
                              margin-top: 0;
                              margin-bottom: 0;
                              font-style: normal;
                              font-weight: normal;
                              color: #b59859;
                              font-size: 26px;
                              line-height: 34px;
                              text-align: center;
                            "
                          >
                            &#8212; &#50696;&#50557;&#54200;&#51648;
                            &#50508;&#47548;&nbsp;&#8212;
                          </h1>
                          <h3
                            class="size-20"
                            style="
                              margin-top: 20px;
                              margin-bottom: 0;
                              font-style: normal;
                              font-weight: normal;
                              color: #555;
                              font-size: 17px;
                              line-height: 26px;
                              font-family: PT Sans, Trebuchet MS, sans-serif;
                              text-align: center;
                            "
                            lang="x-size-20"
                          >
                            [&#50976;&#51200;&#51060;&#47492;]&#45784;&#44760;&#49436;
                            &#48372;&#45240;
                            &#50696;&#50557;&#54200;&#51648;&#44032;&nbsp;
                          </h3>
                          <h3
                            class="size-20"
                            style="
                              margin-top: 12px;
                              margin-bottom: 0;
                              font-style: normal;
                              font-weight: normal;
                              color: #555;
                              font-size: 17px;
                              line-height: 26px;
                              font-family: PT Sans, Trebuchet MS, sans-serif;
                              text-align: center;
                            "
                            lang="x-size-20"
                          >
                            [&#46356;&#45936;&#51060;] &#54980;&#50640;
                            &#46020;&#52265;&#54624;
                            &#50696;&#51221;&#51077;&#45768;&#45796;
                          </h3>
                          <p
                            style="
                              margin-top: 12px;
                              margin-bottom: 20px;
                              text-align: center;
                            "
                          >
                            &#45712;&#47536; &#50864;&#52404;&#53685;&#51008;
                            &#50696;&#50557;&#54620; &#45216;&#51676;&#50640;
                            &#47582;&#52628;&#50612;
                            &#51060;&#47700;&#51068;&#51012;
                            &#48372;&#45236;&#46300;&#47532;&#45716;
                            &#49436;&#48708;&#49828;&#47484;
                            &#51228;&#44277;&#54633;&#45768;&#45796;.
                            &#54200;&#51648; &#45236;&#50857;&#51060;
                            &#44417;&#44552;&#54616;&#49884;&#45796;&#47732;&nbsp;&#54616;&#45800;&#51032;
                            &#47553;&#53356;&#47484; &#53685;&#54644;
                            &#54924;&#50896;&#44032;&#51077;&#51012;
                            &#51652;&#54665;&#54644;&#51452;&#49464;&#50836;!
                            &#54200;&#51648; &#51204;&#49569;&#45817;&#51068;
                            &#46041;&#51068;&#54620; &#50508;&#47548;
                            &#51060;&#47700;&#51068;&#51012;
                            &#51228;&#44277;&#46300;&#47540;
                            &#50696;&#51221;&#51077;&#45768;&#45796;.&nbsp;
                          </p>
                        </div>
                      </div>
  
                      <div style="margin-left: 20px; margin-right: 20px">
                        <div
                          style="
                            mso-line-height-rule: exactly;
                            line-height: 5px;
                            font-size: 1px;
                          "
                        >
                          &nbsp;
                        </div>
                      </div>
  
                      <div style="margin-left: 20px; margin-right: 20px">
                        <div
                          style="
                            mso-line-height-rule: exactly;
                            line-height: 5px;
                            font-size: 1px;
                          "
                        >
                          &nbsp;
                        </div>
                      </div>
  
                      <div style="margin-left: 20px; margin-right: 20px">
                        <div
                          class="divider"
                          style="
                            display: block;
                            font-size: 2px;
                            line-height: 2px;
                            margin-left: auto;
                            margin-right: auto;
                            width: 40px;
                            background-color: #c9c2a8;
                            margin-bottom: 20px;
                          "
                        >
                          &nbsp;
                        </div>
                      </div>
  
                      <div
                        style="
                          margin-left: 20px;
                          margin-right: 20px;
                          margin-bottom: 12px;
                        "
                      >
                        <div
                          style="
                            mso-line-height-rule: exactly;
                            line-height: 5px;
                            font-size: 1px;
                          "
                        >
                          &nbsp;
                        </div>
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]--></div>
                  </div>
                </div>
                <div
                  style="
                    mso-line-height-rule: exactly;
                    line-height: 20px;
                    font-size: 20px;
                  "
                >
                  &nbsp;
                </div>
  
                <div
                  class="layout one-col fixed-width stack"
                  style="
                    margin: 0 auto;
                    max-width: 600px;
                    min-width: 320px;
                    width: 320px;
                    width: calc(28000% - 167400px);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                  "
                >
                  <div
                    class="layout__inner"
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #f0eee7;
                    "
                  >
                    <!--[if (mso)|(IE)]><table align="center" cellpadding="0" cellspacing="0" role="presentation"><tr class="layout-fixed-width" style="background-color: #f0eee7;"><td style="width: 600px" class="w560"><![endif]-->
              <div role="contentinfo">
                <div
                  style="line-height: 4px; font-size: 4px"
                  id="footer-top-spacing"
                >
                  &nbsp;
                </div>
                <div
                  class="layout email-flexible-footer email-footer"
                  style="
                    margin: 0 auto;
                    max-width: 600px;
                    min-width: 320px;
                    width: 320px;
                    width: calc(28000% - 167400px);
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                  "
                  id="footer-content"
                >
                  <div
                    class="layout__inner center-aligned-footer"
                    style="border-collapse: collapse; display: table; width: 100%"
                  >
                    <!--[if (mso)|(IE)]><table style="width: 600px;" align="center" cellpadding="0" cellspacing="0" role="presentation"><![endif]-->
                    <!--[if (mso)|(IE)]><tr class="layout-email-footer"><![endif]-->
                    <div
                      class="column"
                      style="
                        text-align: center;
                        font-size: 12px;
                        line-height: 19px;
                        color: #b3b3b3;
                        font-family: PT Sans, Trebuchet MS, sans-serif;
                        display: none;
                      "
                      align="center"
                    >
                      <div
                        class="footer-logo emb-logo-margin-box"
                        style="
                          font-size: 26px;
                          line-height: 32px;
                          margin-top: 10px;
                          margin-bottom: 20px;
                          color: #7b663d;
                          font-family: Roboto, Tahoma, sans-serif;
                        "
                        align="center"
                      >
                        <div emb-flexible-footer-logo align="center"></div>
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></tr><![endif]-->
                    <!--[if (mso)|(IE)]><tr class="layout-email-footer"><![endif]-->
                    <div
                      class="column"
                      style="
                        text-align: center;
                        font-size: 12px;
                        line-height: 19px;
                        color: #b3b3b3;
                        font-family: PT Sans, Trebuchet MS, sans-serif;
                        display: none;
                      "
                      align="center"
                    ></div>
                    <!--[if (mso)|(IE)]></tr><![endif]-->
                    <!--[if (mso)|(IE)]><tr class="layout-email-footer"><![endif]-->
                    <table
                      style="
                        border-collapse: collapse;
                        table-layout: fixed;
                        width: 100%;
                      "
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <div
                              class="column js-footer-additional-info"
                              style="
                                text-align: center;
                                font-size: 12px;
                                line-height: 19px;
                                color: #b3b3b3;
                                font-family: PT Sans, Trebuchet MS, sans-serif;
                                display: inline;
                                width: 100%;
                              "
                              align="center"
                            >
                              <div
                                style="
                                  margin-left: 0;
                                  margin-right: 0;
                                  margin-top: 10px;
                                  margin-bottom: 10px;
                                "
                              >
                                <div
                                  class="email-footer__additional-info"
                                  style="
                                    font-size: 12px;
                                    line-height: 19px;
                                    margin-bottom: 15px;
                                  "
                                >
                                <a href="https://www.slow-postbox" style="border:none; border-radius:10px; background-color:#E84B35; width:100px; height:35px; color:white; font-weight:bold;">느린우체통으로 이동</a>
                                </div>
                                <!--[if mso]>&nbsp;<![endif]-->
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (mso)|(IE)]></tr></table><![endif]-->
                  </div>
                </div>
                <div
                  style="line-height: 40px; font-size: 40px"
                  id="footer-bottom-spacing"
                >
                  &nbsp;
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <style type="text/css">
        @media (max-width: 619px) {
          .email-flexible-footer .left-aligned-footer .column,
          .email-flexible-footer .center-aligned-footer,
          .email-flexible-footer .right-aligned-footer .column {
            max-width: 100% !important;
            text-align: center !important;
            width: 100% !important;
          }
          .flexible-footer-logo {
            margin-left: 0px !important;
            margin-right: 0px !important;
          }
          .email-flexible-footer
            .left-aligned-footer
            .flexible-footer__share-button__container,
          .email-flexible-footer
            .center-aligned-footer
            .flexible-footer__share-button__container,
          .email-flexible-footer
            .right-aligned-footer
            .flexible-footer__share-button__container {
            display: inline-block;
            margin-left: 5px !important;
            margin-right: 5px !important;
          }
          .email-flexible-footer__additionalinfo--center {
            text-align: center !important;
          }
          .email-flexible-footer .left-aligned-footer table,
          .email-flexible-footer .center-aligned-footer table,
          .email-flexible-footer .right-aligned-footer table {
            display: table !important;
            width: 100% !important;
          }
          .email-flexible-footer .footer__share-button,
          .email-flexible-footer .email-footer__additional-info {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      </style>
    </body>`,
    });
    console.log(info);
    return res.status(201).json({ message: '메시지가 전송되었습니다' });
  } catch (err) {
    return res.status(500).json({ message: '서버 에러' });
  }
};
