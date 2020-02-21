import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Config from 'react-native-config';
import { Navigation } from 'react-native-navigation';
import { 
    SCAN_IMAGE_TROUGH_SERVER_REQUEST,
    SCAN_IMAGE_TROUGH_SERVER_SUCCESS,
    SCAN_IMAGE_TROUGH_SERVER_ERROR,
    REMOVE_ITEM_FROM_HISTORY
} from "./scannerReducer";

URL = Config.SCANNER_API;

const scanImageThroughServerRequest = () => ({ type: SCAN_IMAGE_TROUGH_SERVER_REQUEST });
const scanImageThroughServerSuccess = (result) => ({ type: SCAN_IMAGE_TROUGH_SERVER_SUCCESS, payload: result });
const scanImageThroughServerError = (err) => ({ type: SCAN_IMAGE_TROUGH_SERVER_ERROR, payload: err });

const pickImageFromPhone = () => ImagePicker.openPicker({ compressImageMaxWidth: 250, compressImageMaxHeight: 250, cropping: true });
const pickImageFromCamera = () => ImagePicker.openCamera({ compressImageMaxWidth: 250, compressImageMaxHeight: 250, cropping: true });
const pickImageFromNativeCamera = (path) => ImagePicker.openCropper({ path, width: 250, height: 250, showCropGuidelines: false });

sendImageToServer = (dispatch, image, componentId) => {

            dispatch(scanImageThroughServerRequest());

            var formData = new FormData();
            let file = { uri: image.path, type: 'image/jpeg', name: image.path }
            formData.append('file', file);

            Navigation.push(componentId, {component: {name: 'ScannerResult'}})
            
            axios({
                method: 'post',
                url: `${URL}/uploader`,
                data:  formData,
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    // "Access-Control-Allow-Origin": "*"
                },
                // timeout: 2000
            })
            .then((response) => {
                const result = response.data;
                result.originalPicture = image.path;
                // alert(JSON.stringify(result));
                dispatch(scanImageThroughServerSuccess(result))
                
            })
            .catch((error) => {
                // alert(JSON.stringify(error));
                dispatch(scanImageThroughServerError(error.message))
            })
}

export const pickAndUploadImageFromPhone = (componentId) => {
    return (dispatch) => {
        // dummyRequest(dispatch, componentId);
        pickImageFromPhone()
        .then(image => sendImageToServer(dispatch, image, componentId))
        .catch(error => console.log(error))
    } 
};

export const pickAndUploadImageFromCamera = (componentId) => {
    return (dispatch) => {
        // dummyRequest(dispatch, componentId);
        pickImageFromCamera()
        .then(image => sendImageToServer(dispatch, image, componentId))
        .catch(error => console.log(error))
    }
};

export const uploadImageTakenFromCamera = (imagePath, componentId) => {
    return (dispatch) => {
        // dummyRequest(dispatch, componentId);
        pickImageFromNativeCamera(imagePath)
        .then(image => sendImageToServer(dispatch, image, componentId))
        .catch(error => console.log(error))
    }
};

export const uploadCroppedImageTakenFromCamera = (imagePath, componentId) => {
    return (dispatch) => {
        // dummyRequest(dispatch, componentId);
        sendImageToServer(dispatch, {path: imagePath}, componentId)
        .catch(error => console.log(error))
    }
};

const dummyRequest = (dispatch, componentId) => {
        dispatch(scanImageThroughServerRequest());

            Navigation.push(componentId, {component: {name: 'ScannerResult'}});

            try {

                var response1 = {
                    firstResult: { breed: 'golden retriever', percentage: 0.6 },
                    secondResult: { breed: 'German Sheperd', percentage: 0.25 },
                    thirdResult: { breed: 'Shih Tzu', percentage: 0.15 }
                };

                var response2 = {
                    firstResult: { breed: 'mexican hairless', percentage: 0.4 },
                    secondResult: { breed: 'German Sheperd', percentage: 0.35 },
                    thirdResult: { breed: 'Shih Tzu', percentage: 0.25 }
                }

                setTimeout(() => {
                    dispatch(scanImageThroughServerSuccess(response2))
                }, 1000);

            } catch (err) {
                dispatch(scanImageThroughServerError(err))
            }
};

export const removeItemFromHistory = (id) => ({ type: REMOVE_ITEM_FROM_HISTORY, payload: id });