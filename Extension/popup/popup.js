let position = {};
let checkbox = document.getElementById("checkbox-link");
let jobTitleField = document.getElementById("job-title");
let companyNameField = document.getElementById("company-name");
chrome.storage.sync.get(['position'], function (positionWrapper) {
    if (positionWrapper) {
        position = positionWrapper.position;
        checkbox.checked = true;
        jobTitleField.value = position.job_title || '';
        companyNameField.value = position.company_name || '';
    }
})
document.getElementById("save-position-btn").addEventListener("click", function (e) {
    chrome.runtime.sendMessage(position);
    document.getElementById("position-sent-text").innerText = "position saved!";
    jobTitleField.value = "";
    companyNameField.value = "";
})
