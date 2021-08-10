import axios from "axios";
import * as StaticServices from "./StaticServices";


export async function getAll() {
    try {
        return await axios('/api/applicationprocesses/');
    } catch (err) {
        StaticServices.handleError(err);
        throw new Error('Failed getting all application processes', err);
    }
}

export async function addNew(app) {
    return await axios.post("/api/applicationprocesses/", app);
}

export async function update(app) {
    return await axios.put(app.url, app);
}
