const appConfig = {
    env: process.env.NEXT_PUBLIC_APP_ENV || 'development',
    host: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    services: {
        auth: {
            baseUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:8080',
        },
        profiles: {
            baseUrl: process.env.NEXT_PUBLIC_PROFILES_SERVICE_URL || 'http://localhost:8081',
        },
        media: {
            baseUrl: process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL || 'http://localhost:8082',
        }
    },
    google: {
        maps: {
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        },
    }
}

export default appConfig;