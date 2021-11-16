import axios from "axios"
const crypto = require('crypto')

export default function kakaoLoginClickHandler() {

    const { Kakao } = window // 카카오 관련 method 사용가능하게(index.html head부분에도 추가된 부분있음)
    Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: function (authObj) {
            console.log(authObj)
            Kakao.API.request({
                url: '/v2/user/me',
                data: {
                    property_keys: ["kakao_account.email", "kakao_account.profile.nickname"]
                },
                success: async function (res) {

                    const email = res.kakao_account.email
                    const response = await axios.post(`${process.env.REACT_APP_SERVER_API}/user/kakaologin`,
                        { email },
                        { withCredentials: true })
                    if (!response.data.data) {
                        //받아온 이메일로 회원가입 처리
                        const name = res.kakao_account.profile.nickname
                        const email = res.kakao_account.email
                        const oauth = 1
                        await axios({
                            url: `${process.env.REACT_APP_SERVER_API}/user/signup`,
                            method: "post",
                            data: {
                                name,
                                email,
                                oauth
                            },
                        })
                            .then((res) => {
                                console.log(res);
                                kakaoLoginClickHandler()

                            })
                            .catch((err) => {
                                console.log(err);
                            });

                    }
                    else {
                        axios
                            .post(`${process.env.REACT_APP_SERVER_API}/user/login`, {
                                email: email,
                            },
                                { withCredentials: true })
                            .then((res) => {
                                console.log('로그인성공')
                                console.log(res.data)
                                window.location.replace('/')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                }
            }
            )
        }
    })
}