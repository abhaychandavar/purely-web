interface StorageInterface {
    uploadFile(signedUrl: string, fileType: string, file: Blob): Promise<string | null>;
}

export default StorageInterface;