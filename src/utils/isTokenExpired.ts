export const isTokenExpired = (accessToken: string | null) => {
    if (accessToken) {
        const expiry = JSON.parse(atob(accessToken.split('.')[1])).exp;
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const timeLeft = expiry - currentTime;

        if (timeLeft < 120) {
            return true
        }


        return currentTime >= expiry;
    }
    return true
}