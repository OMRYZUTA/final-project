import axios from "axios";
import * as StaticServices from "./StaticServices";

export async function getAll() {
    try {
        const result = await axios('/api/applicationprocesses/');
        return result.data.results;
    } catch (err) {
        StaticServices.handleError(err);
        return []; //in case we have a problem getting the applications
    }
}

export async function addNew(app) {
    const result = await axios.post("/api/applicationprocesses/", app);
    return result.data;
}

export async function update(app) {
    const result = await axios.put(app.url, app);
    return result.data;
}

export async function remove(app) {
    return await axios.delete(app.url);
}