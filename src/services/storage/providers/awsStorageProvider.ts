import axios from "axios";
import StorageInterface from "../storageInterface";

class GcpStorageProvider implements StorageInterface {
    uploadFile = async (signedUrl: string, fileType: string, file: Blob) => {
        try {
            console.log('Content type >>', fileType, '>> URL', signedUrl, ">> file", file);
            const response = await axios.put(signedUrl, file, {
                headers: {
                    "Content-Type": fileType || "application/octet-stream",
                }
            });
            console.log('ETag >>', response.headers.etag)
            return response.headers.etag.replaceAll("\"", '');
        }
        catch (error) {
            console.log('Upload failed', error);
            return undefined;
        }
    }
}

export default GcpStorageProvider;