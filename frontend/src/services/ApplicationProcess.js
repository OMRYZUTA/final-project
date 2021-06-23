import { useState, useEffect } from 'react';
import axios from 'axios';

const GetAllApplicationProcesses = () => {
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const fetchApplications = async () => {
            const result = await axios(
                '/api/applicationprocesses/',
            );
            setApplications(result.data.results);
        };
        fetchApplications();
    }, []);
    return applications;

};
export default GetAllApplicationProcesses;