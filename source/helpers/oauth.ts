export function OAuthHelper(token: string, refresh_token: string){
    return {
        OAuth20: {
            access_token: token,
            refresh_token,
            expires_in: 3600
        }
    }
}

export function ServiceTokenHelper(token: string){
    return {
        service_token: {
            token
        }
    };
}