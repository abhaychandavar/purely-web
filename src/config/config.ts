const appConfig = {
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    host: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    services: {
        auth: {
            baseUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8080',
        },
        profiles: {
            baseUrl: process.env.NEXT_PUBLIC_PROFILES_SERVICE_URL || 'http://localhost:8081',
        }
    }
}

export default appConfig;