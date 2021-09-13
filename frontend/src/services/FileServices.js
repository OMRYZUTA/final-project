import axios from "axios";
import { handleError } from "./StaticServices";

export async function getFiles() {
    try {
        return await axios('/api/documents');
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all files', err);
    }
}

export async function getFile(relativeURL) {
    try {
        const response = await axios(relativeURL);
        const blob = response.blob();
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting the file', err);
    }
}
