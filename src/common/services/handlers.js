function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return response.text()
      .then(responseObj => {
        let response = responseObj ? JSON.parse(responseObj) : {message: 'There has been an error communicating with the API'};
        throw Object.assign({}, new Error(), {
          serverResponse: response
        });
      });
  }
}

export function initiateFetch(url, options) {
  //
  return new Promise(
    (resolve, reject) => {
      fetch(url, options)
        .then(response => {
          return checkStatus(response);
        })
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          return resolve(responseJson);
        })
        .catch(error => {
          return reject(error);
        });
    }
  )
}