import axios from "axios";
import handleError from "./StaticServices";

export async function getFiles() {
    try {
        return await axios('/api/documents');
    } catch (err) {
        handleError(err);
        throw new Error('Failed getting all files', err);
    }
}
