chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    sendResponse(scrape());
    return true;
})
let job_title = "";
let job_posting_URL = window.location.href;
let position = {};

const scrape = () => {
    //incase of a not logged in user
    if (job_posting_URL.includes("indeed")) {
        if (job_posting_URL.includes("vjk") || job_posting_URL.includes("vjs")) {
            job_title = document.getElementsByClassName("jobsearch-JobInfoHeader-title")[0]?.innerText.replace("- job post", "");
            if (typeof job_title === "undefined") {//incase of not a logged in user
                job_title = document.getElementById('vjs-jobtitle').innerText
                company_name = document.getElementById("vjs-cn").innerText;
                let city = document.getElementById("vjs-loc").innerText
                let about_the_job = document.getElementById("vjs-desc").innerText;
                let job_posting_URL = String(window.location.href);
                position = { company_name, job_title, city, about_the_job, job_posting_URL };
            }

            else {//incase of a  logged in user
                position = { job_title };
                company_name = document.getElementsByClassName("jobsearch-InlineCompanyRating")[0].innerText;
                let job_posting_url = String(window.location.href);
                position = { company_name, job_title, job_posting_url };
            }
        }
    }
    //incase of  a logged in user - otherwise, it is different tags, need to scrape with setinterval.
    else if (job_posting_URL.includes("linkedin")) {
        let jobDescriptionCollection = document.getElementsByClassName("jobs-unified-top-card__content--two-pane");
        if (jobDescriptionCollection.length > 0) {
            let job_description_div = jobDescriptionCollection[0];
            let anchorTag = job_description_div.getElementsByTagName("a")[0]
            let job_title = anchorTag.innerText;
            job_posting_URL = anchorTag.href;
            let company_nameDiv = job_description_div.getElementsByTagName("div")[0];
            let company_name = company_nameDiv.getElementsByTagName("span")[1].innerText;
            let city = company_nameDiv.getElementsByTagName("span")[2].innerText;
            position = { job_title, company_name, city, job_posting_URL };
        }
    }
    return position;
}
