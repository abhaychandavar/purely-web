import appConfig from "@/config/config";
import pAxios from "@/utils/http/pAxios";

class profileService {
    static host = appConfig.services.profiles.baseUrl;

    static getSelfProfile = async() => {
        try {
            const { data: profile } = await pAxios.get(`${this.host}/date/`);
            return profile.data;
        }
        catch (error: any) {
            console.log('Error fetching profile', error);
            const { code } = error?.response?.data;
            if (code === 'purely/profiles/requests/errors/profile-not-found') {
                return null;
            }
            throw new Error("Could not fetch profile");
        }
    }
    
    static getProfileLayout = async() => {
        try {
            const { data: profile } = await pAxios.get(`${this.host}/date/layout`);
            return profile.data;
        }
        catch (error) {
            console.log('Error fetching profile layout', error);
            throw new Error("Could not fetch profile layout");
        }
    }

    static createProfile = async(data: Record<string, any>) => {
        try {
            const { data: profile } = await pAxios.post(`${this.host}`, data);
            return profile.data;
        }
        catch (error) {
            console.log('Error creating profile', error);
            throw new Error("Could not create profile");
        }
    }

    static updateProfile = async(data: {
        name?: string,
        age?: number,
        gender?: string,
        lookingForGender?: string,
        hereFor?: string,
        bio?: string,
        prompts?: Array<{
            promptId: string,
            promptResponse: string
        }>,
        location?: {
            lat: number,
            lng: number
        }
    }) => {
        try {
            const { data: profile } = await pAxios.patch(`${this.host}`, data);
            return profile.data;
        }
        catch (error) {
            console.log('Error updating profile', error);
            throw new Error("Could not update profile");
        }
    }

    static upsertProfile = async ({data, purpose}: {
        data: Record<string, any>,
        purpose: string
    }) => {
        const { data: profileData } = await pAxios.patch(`${this.host}/${purpose}/upsert`, data);
        return profileData.data;
    }

    static getPrompts = async ({category}: {
        category: string
    }) => {
        const { data: profileData } = await pAxios.get(`${this.host}/prompts/${category}`);
        return profileData.data;
    }

    static getGenders = async () => {
        const { data: profileData } = await pAxios.get(`${this.host}/genders`);
        return profileData.data;
    }

    static searchLocations = async ({query, pageToken}: {query?: string, pageToken?: string}) => {
        const { data: profileData } = await pAxios.get(`${this.host}/locations?${query ?`query=${query}`: `pageToken=${pageToken}`}`);
        return profileData.data;
    }

    static getProfiles = async () => {
        try {
            const { data: profileData } = await pAxios.get(`${this.host}/date/profiles`);
            return profileData.data;
        }
        catch (error) {
            console.log('Error fetching profiles', error);
            return null;
        }
    }
}

export default profileService;