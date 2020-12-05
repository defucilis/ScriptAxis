import firebase from './Firebase'

const FirebaseUtils = {
    uploadFile: (file, path, handleProgress) => {
        return new Promise((resolve, reject) => {
            const storage = firebase.storage();
            const ref = storage.ref().child(path);
            const uploadTask = ref.put(file);
            uploadTask.on('state_changed', snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                handleProgress(progress);
            }, error => {
                reject(error);
            }, async () => {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                resolve(downloadURL);
            })
        })
    }
}

export default FirebaseUtils;