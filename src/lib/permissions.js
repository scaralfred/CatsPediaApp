import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { isIos } from './util';

// CAMERA //
export const checkCameraPermission = () => (
    check(isIos() ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
    .then(result => result)
    .catch(error => {
      // …
    })
);

export const requestCameraPermission = () => (
    request(isIos() ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
    .then(result => result)
    .catch(error => {
      // …
    })
);

// STORAGE//
export const checkStoragePermission = () => (
  check(isIos() ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  .then(result => result)
  .catch(error => {
    // …
  })
);

export const requestStoragePermission = () => (
  request(isIos() ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
  .then(result => result)
  .catch(error => {
    // …
  })
);