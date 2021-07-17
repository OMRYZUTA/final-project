import axios from "axios";

function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      console.error(error.config);
}

export async function getAll() {
    try {
        return await axios('/api/applicationprocesses/');
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all application processes', err);
    }
}

export async function addNew(app) {
    return await axios.post("/api/applicationprocesses/", app);
}

export async function update(app) {
    return await axios.put(app.url, app);
}
