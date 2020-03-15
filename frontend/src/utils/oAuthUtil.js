export default class OAuthUtil {
    static async storeTokens(accessToken) {
        localStorage.setItem('accessToken', accessToken);
    }

    static async logout(accessToken) {
        localStorage.removeItem('accessToken');
    }
}