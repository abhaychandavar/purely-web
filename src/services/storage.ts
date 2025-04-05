import pAxios from "@/utils/http/pAxios";
import GcpStorageProvider from "./storage/providers/awsStorageProvider";
import StorageInterface from "./storage/storageInterface";
import appConfig from "@/config/config";

class StorageService {
    private provider: StorageInterface;
    private host = appConfig.services.media.baseUrl;
    constructor(storageProvider: StorageInterface) {
        this.provider = storageProvider;
    }

    uploadFile = async (signedUrls: Record<string, string>, file: File, partSize: number) => {
        const partPromises = [];
        console.log('Total file size >>', file.size)
        for (const key in signedUrls) {
            const start = ((parseInt(key, 10) - 1) * partSize);
            const end = Math.min(start + partSize, file.size);
            partPromises.push(this.provider.uploadFile(signedUrls[key], 'image/jpeg', file.slice(start, end)))
        }
        const res = await Promise.all(partPromises);
        return res;
    }

    completeUpload = async (uploadID: string, url: string, signedUrls: Record<string, string>) => {
        const { data: mediaUploadData } = await pAxios.post(`${this.host}/media/multipart/complete`, {
            uploadID,
            url,
            parts: signedUrls
        });
        const { data } = mediaUploadData;
        return data;
    }

    getMediaUploadUrl = async ({
        fileName,
        contentType,
        fileSize,
        purpose,
        partsCount
    }: {
        fileName: string,
        contentType: string,
        fileSize: number,
        purpose: string,
        partsCount: number
    }) => {
        const { data: imageUploadUrl } = await pAxios.post(`${this.host}/media/multipart/signed-urls`, {
            fileName,
            contentType,
            fileSize,
            purpose,
            partsCount
        });
        const { data } = imageUploadUrl;
        console.log('getImageUploadUrl data', data)
        return data;
    }
}

const storageService = new StorageService(new GcpStorageProvider());
export default storageService;