import axios from 'axios';

export default function kakaoLoginClickHandler() {
    const { Kakao } = window; // 카카오 관련 method 사용가능하게(index.html head부분에도 추가된 부분있음)
    Kakao.Auth.login({
        scope: 'profile_nickname, account_email',
        success: function (authObj) {
            console.log(authObj);
            Kakao.API.request({
                url: '/v2/user/me',
                data: {
                    property_keys: [
                        'kakao_account.email',
                        'kakao_account.profile.nickname',
                    ],
                },
                success: async function (res) {
                    const email = res.kakao_account.email;
                    const nickname = res.kakao_account.profile.nickname;
                    await axios.post(
                        `${process.env.REACT_APP_SERVER_API}/users/kakaologin`,
                        { email, nickname },
                        { withCredentials: true }
                    );
                    window.location.replace('/');
                },
            });
        },
    });
}
