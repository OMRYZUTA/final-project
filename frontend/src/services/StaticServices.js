import axios from "axios";

export function handleError(error) {
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

export async function getStatuses() {
    try {
        const result = await axios('/api/statuses/');
        return result.data.results;
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all statuses', err);
    }
}

export async function getEventTypes() {
    try {
        const result = await axios('/api/eventtypes/');
        return result.data.results;
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all stage event types', err);
    }
}

export async function getEventMedia() {
    try {
        const result = await axios('/api/eventmedia/');
        return result.data.results;
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all stage event media', err);
    }
}

export async function getStats() {
    try {
        return await axios('/stats');
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all stats', err);
    }
}

export async function getFiles() {
    try {
        const result = await axios('/api/documents');
        return result.data;
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all files', err);
    }
}