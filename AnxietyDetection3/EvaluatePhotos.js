import { STATUS_GREEN, STATUS_RED, STATUS_YELLOW, STATUS_NONE } from "./utils";
import axios from 'axios';

export const evaluatePhoto = async (photo) => {
    // const statuses = [STATUS_GREEN, STATUS_YELLOW, STATUS_RED];
    // const randomIndex = Math.floor(Math.random() * statuses.length);
    // return statuses[randomIndex];
    try {
        const formData = new FormData();
        formData.append('photo', {
            uri: photo.photoUri,
            type: 'image/jpeg',
            name: 'photo.jpg'
        });
        const response = await axios.post('http://192.168.0.199:8000/evaluate', formData, { // While testing locally, use the computer's ip that is printed when running the server (the second one, not 127.0.0.1)
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        const result = response.data.result;
        const status = result === 'green' ? STATUS_GREEN : result === 'yellow' ? STATUS_YELLOW : result === 'red' ? STATUS_RED : STATUS_NONE;
        console.log('Evaluated photo successfully:', status);
        return status;
    } catch(error) {
        console.log('Error evaluating photo:', error);
        return STATUS_NONE;
    }
}

export const evaluateAllPhotos = async (photoHistory, updatePhoto) => {
    photoHistory.forEach(async photo => {
        if(photo.status === STATUS_NONE) {
            const status = await evaluatePhoto(photo);
            if (status !== photo.status) {
                updatePhoto({ ...photo, status });
                return;
            }
        }
    });
}