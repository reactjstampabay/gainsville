import { initiateFetch } from './handlers';
import { MEDIA_API_URL, MEDIA_API_ENDPOINTS } from '../constants';

export function uploadPicture(accessToken, base64Image) {
  const url = MEDIA_API_URL + MEDIA_API_ENDPOINTS.UPLOAD;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      media: base64Image
    }),
    headers: {
      'Authentication': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  };

  return initiateFetch(url, options);
}