
function validateLandArea(area) {
    if (!Number.isFinite(area) || area <= 0) {
        return false;
    }

    return true;
}

const form = document.getElementById("landForm");
const message = document.getElementById("formMessage");
const summary = document.getElementById("landSummary");
const summaryContent = document.getElementById("summaryContent");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const district = document.getElementById("district").value.trim();
    const village = document.getElementById("village").value.trim();
    const survey = document.getElementById("survey").value.trim();
    const areaInput = document.getElementById("area");
    const area = Number(areaInput.value);
    const project = document.getElementById("project").value;

    summary.hidden = true;

    if (!district || !village || !survey ||
        areaInput.value.trim() === "" || !project) {
        message.textContent =
            "Please complete all required fields.";
        message.style.color = "#b42318";
        return;
    }

    if (!validateLandArea(area)) {
        message.textContent =
            "Land extent must be a number greater than zero.";
        message.style.color = "#b42318";
        return;
    }

    const landDetails = {
        district: district,
        village: village,
        surveyNumber: survey,
        areaAcres: area,
        projectType: project
    };

    const projectNames = {
        road: "Road",
        railway: "Railway",
        port: "Port",
        industry: "Industrial project",
        other: "Other"
    };

    const rows = [
        ["District", landDetails.district],
        ["Village", landDetails.village],
        ["Survey number", landDetails.surveyNumber],
        ["Land extent", landDetails.areaAcres + " acres"],
        ["Project type", projectNames[landDetails.projectType]]
    ];

    summaryContent.replaceChildren();

    rows.forEach(function (row) {
        const item = document.createElement("p");
        item.className = "summary-row";

        const label = document.createElement("span");
        label.className = "summary-label";
        label.textContent = row[0] + ": ";

        const value = document.createElement("span");
        value.textContent = row[1];

        item.append(label, value);
        summaryContent.appendChild(item);
    });

    const note = document.createElement("p");
    note.className = "summary-note";
    note.textContent =
        "This is a summary of your entered details, not a compensation estimate. Official valuation records and applicable acquisition rules must be verified.";

    summaryContent.appendChild(note);

    summary.hidden = false;
    message.textContent =
        "Your land details have been captured successfully.";
    message.style.color = "#176b3a";
});
