import { useEffect } from 'react';
import axios from 'axios';

const PostAppProcess = ({ appProcess }) => {
    const app = {
        "position": {
            "job_title": "Junior Data analyst",
            "company_name": "Checkpoint",
            "country_id": "IL",
            "city": "Tel-Aviv",
            "initial_contact_email_address": "email@email.com",
            "job_posting_URL": "https://www.jobs.com",
            "about_the_job": "nice"
        },
        "contact_set": [],
        "stage_set": [],
        "user_id": 2,
        "note": null,
        "date": "2021-07-09",
        "status": "CL"
    }

    const postApplication = async () => {
        const result = await axios.post(
            '/api/applicationprocesses/', app
        );
        console.log(result.data.results);
    };
    postApplication();
};
export default PostAppProcess;