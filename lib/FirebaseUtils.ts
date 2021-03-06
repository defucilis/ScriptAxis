import firebase from "firebase";
import "firebase/storage";

const FirebaseUtils = {
    uploadFile: (
        file: File | Blob,
        path: string,
        handleProgress: (progress: number) => void
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            console.log("Uploading file", typeof file, file);
            const storage = firebase.storage();
            const ref = storage.ref().child(path);
            const uploadTask = ref.put(file);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    console.log("Upload snapshot", snapshot);
                    const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                    handleProgress(progress);
                },
                error => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    resolve(downloadURL);
                }
            );
        });
    },
    deleteFile: (path: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            console.log("Deleting file", path);
            const storage = firebase.storage();
            const ref = storage.ref().child(path);
            ref.delete()
                .then(() => {
                    resolve();
                })
                .catch(error => {
                    console.log("Failed to delete file", error);
                    reject(`Failed to delete file: ${error.message}`);
                });
        });
    },
};

export default FirebaseUtils;
