
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
    const mandal = document.getElementById("mandal").value.trim();
    const village = document.getElementById("village").value.trim();
    const survey = document.getElementById("survey").value.trim();
    const areaInput = document.getElementById("area");
    const area = Number(areaInput.value);
    const project = document.getElementById("project").value;
    const landCategory = document.getElementById("landCategory").value;
    summary.hidden = true;

    
console.log("LandFair form values:", {
    district: district,
    mandal: mandal,
    village: village,
    survey: survey,
    area: areaInput.value,
    project: project,
    landCategory: landCategory
});


    
if (!district || !mandal || !village || !survey ||
    areaInput.value.trim() === "" || !project || !landCategory) {

    message.dataset.messageType = "required";

    message.textContent =
        translations[currentLanguage].required;

    message.style.color = "#b42318";
    return;
}


    if (!validateLandArea(area)) {
        message.textContent =
            "Land extent must be a number greater than zero.";
        message.style.color = "#b42318";
        return;
    }

const state = "Andhra Pradesh";

    const landDetails = {
        
        state: state,
        district: district,
        mandal: mandal,
        village: village,
        surveyNumber: survey,
        areaAcres: area,
        projectType: project,
        landCategory: landCategory
    };

    const projectNames = {
        road: "Road",
        railway: "Railway",
        port: "Port",
        industry: "Industrial project",
        other: "Other"
    };

    const categoryNames = {
    agricultural: translations[currentLanguage].agricultural,
    "non-agricultural": translations[currentLanguage].nonAgricultural
};

    const rows = [
        
       [translations[currentLanguage].summaryLabels[0],
 currentLanguage === "te" ? "ఆంధ్రప్రదేశ్" : state],

        ["District", landDetails.district],
       ["Mandal", landDetails.mandal], 
        ["Village", landDetails.village],
        ["Survey number", landDetails.surveyNumber],
        ["Land extent", landDetails.areaAcres + " acres"],
        ["Project type", projectNames[landDetails.projectType]],
        [
    translations[currentLanguage].landCategory.replace(/:$/, ""),
    categoryNames[landDetails.landCategory]
]
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
    updateMarketValueStatus(landDetails);
    message.textContent =
        "Your land details have been captured successfully.";
    message.style.color = "#176b3a";
});

const translations = {
    en: {
        tagline: "Know your land. Understand your compensation.",
        heading: "Check Your Land Compensation",
        intro: "Enter your land details to begin understanding government land acquisition compensation.",
        district: "District:",
        village: "Village:",
        survey: "Survey Number:",
        area: "Land Extent (acres):",
        project: "Government Project:",
        selectProject: "Select a project",
        road: "Road",
        railway: "Railway",
        port: "Port",
        industry: "Industrial project",
        other: "Other",
        submit: "Check Compensation",
        summaryHeading: "Land Details Summary",
        summaryLabels: [
            "District",
            "Village",
            "Survey number",
            "Land extent",
            "Project type"
        ],
        acres: "acres",
        success: "Your land details have been captured successfully.",
        required: "Please complete all required fields.",
        invalidArea: "Land extent must be a number greater than zero.",
        landCategory: "Land Category:",
        selectLandCategory: "Select land category",
        agricultural: "Agricultural",
        nonAgricultural: "Non-agricultural",
        mandal: "Mandal:",
        mandalPlaceholder: "Enter your mandal",
        
        state: "State:",
        stateName: "Andhra Pradesh",

        note: "This is a summary of your entered details, not a compensation estimate. Official valuation records and applicable acquisition rules must be verified."
    },
    te: {
        tagline: "మీ భూమిని తెలుసుకోండి. పరిహారాన్ని అర్థం చేసుకోండి.",
        heading: "మీ భూమి పరిహారాన్ని తెలుసుకోండి",
        intro: "ప్రభుత్వ భూసేకరణ పరిహారాన్ని అర్థం చేసుకోవడానికి మీ భూమి వివరాలను నమోదు చేయండి.",
        district: "జిల్లా:",
        village: "గ్రామం:",
        survey: "సర్వే నంబర్:",
        area: "భూమి విస్తీర్ణం (ఎకరాలు):",
        project: "ప్రభుత్వ ప్రాజెక్ట్:",
        selectProject: "ప్రాజెక్ట్‌ను ఎంచుకోండి",
        road: "రోడ్డు",
        railway: "రైల్వే",
        port: "పోర్ట్",
        industry: "పారిశ్రామిక ప్రాజెక్ట్",
        other: "ఇతర",
        submit: "పరిహార వివరాలను చూడండి",
        summaryHeading: "భూమి వివరాల సారాంశం",
        summaryLabels: [
            "జిల్లా",
            "గ్రామం",
            "సర్వే నంబర్",
            "భూమి విస్తీర్ణం",
            "ప్రాజెక్ట్ రకం"
        ],
        acres: "ఎకరాలు",
        success: "మీ భూమి వివరాలు విజయవంతంగా నమోదు చేయబడ్డాయి.",
        required: "దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి.",
        invalidArea: "భూమి విస్తీర్ణం సున్నా కంటే ఎక్కువగా ఉండాలి.",
        landCategory: "భూమి వర్గం:",
        selectLandCategory: "భూమి వర్గాన్ని ఎంచుకోండి",
        agricultural: "వ్యవసాయ భూమి",
        nonAgricultural: "వ్యవసాయేతర భూమి",
        mandal: "మండలం:",
        mandalPlaceholder: "మీ మండలాన్ని నమోదు చేయండి",
        
        state: "రాష్ట్రం:",
        stateName: "ఆంధ్రప్రదేశ్",

        note: "ఇది మీరు నమోదు చేసిన వివరాల సారాంశం మాత్రమే; పరిహారం అంచనా కాదు. అధికారిక భూమి విలువ రికార్డులు మరియు వర్తించే భూసేకరణ నిబంధనలను ధృవీకరించాలి."
    }
};
let currentLanguage = "en";
function setLanguage(language) {
    const t = translations[language];
    
    if (!t) return;
    currentLanguage = language;
    document.documentElement.lang = language === "te" ? "te" : "en";

document.getElementById("stateLabel").textContent = t.state;
document.getElementById("state").value = t.stateName;

    document.getElementById("tagline").textContent = t.tagline;
    document.querySelector("main h2").textContent = t.heading;
    document.querySelector("main > p").textContent = t.intro;

    const categorySelect = document.getElementById("landCategory");

    categorySelect.options[0].textContent = t.selectLandCategory;
    categorySelect.options[1].textContent = t.agricultural;
    categorySelect.options[2].textContent = t.nonAgricultural;

    document.querySelector('label[for="landCategory"]').textContent =
        t.landCategory;
    const labels = {
        district: t.district,
        village: t.village,
        survey: t.survey,
        area: t.area,
        project: t.project
    };

    Object.keys(labels).forEach(function (id) {
        document.querySelector('label[for="' + id + '"]').textContent =
            labels[id];
    });

    


    document.getElementById("district").placeholder =
        language === "te" ? "జిల్లా పేరును నమోదు చేయండి" : "Enter your district";

    document.getElementById("village").placeholder =
        language === "te" ? "గ్రామం పేరును నమోదు చేయండి" : "Enter your village";

    document.getElementById("survey").placeholder =
        language === "te" ? "సర్వే నంబర్ నమోదు చేయండి" : "Enter survey number";

    document.getElementById("area").placeholder =
        language === "te" ? "ఉదాహరణకు, 2.5" : "For example, 2.5";

    const projectSelect = document.getElementById("project");
    const options = projectSelect.options;

    options[0].textContent = t.selectProject;
    options[1].textContent = t.road;
    options[2].textContent = t.railway;
    options[3].textContent = t.port;
    options[4].textContent = t.industry;
    options[5].textContent = t.other;

    document.querySelector('#landForm button[type="submit"]').textContent =
        t.submit;

    document.querySelector("#landSummary h2").textContent =
        t.summaryHeading;

    document.querySelector('label[for="mandal"]').textContent =
    t.mandal;

    document.getElementById("mandal").placeholder =
    t.mandalPlaceholder;
    // Update messages if the form has already been submitted.
    const message = document.getElementById("formMessage");

    if (message.dataset.messageType === "success") {
        message.textContent = t.success;
    } else if (message.dataset.messageType === "required") {
        message.textContent = t.required;
    } else if (message.dataset.messageType === "invalidArea") {
        message.textContent = t.invalidArea;
    }

    // Update summary labels and project type if a summary is visible.
    const summary = document.getElementById("landSummary");

    if (!summary.hidden) {
        const rows = document.querySelectorAll("#summaryContent .summary-row");

        rows.forEach(function (row, index) {
            const label = row.querySelector(".summary-label");

            if (label && t.summaryLabels[index]) {
                label.textContent = t.summaryLabels[index] + ": ";
            }

            if (index === 3 && row.children[1]) {
                const number = document.getElementById("area").value;
                row.children[1].textContent = number + " " + t.acres;
            }
        });

        const note = document.querySelector("#summaryContent .summary-note");

        if (note) {
            note.textContent = t.note;
        }
    }
}

document.getElementById("englishBtn").addEventListener("click", function () {
    setLanguage("en");
});

document.getElementById("teluguBtn").addEventListener("click", function () {
    setLanguage("te");
});
message.dataset.messageType = "required";
message.textContent = "Please complete all required fields.";
message.dataset.messageType = "success";
message.textContent = translations[currentLanguage].success;
message.style.color = "#176b3a";
message.dataset.messageType = "success";
message.textContent = "Your land details have been captured successfully.";




async function updateMarketValueStatus(landDetails) {
    const status = document.getElementById("marketValueStatus");

    status.textContent =
        currentLanguage === "te"
            ? "మార్కెట్ విలువ వివరాలను పరిశీలిస్తున్నాము..."
            : "Checking market-value records...";

    try {
        const params = new URLSearchParams({
            district: landDetails.district,
            mandal: landDetails.mandal,
            village: landDetails.village,
            land_category: landDetails.landCategory
        });

        const response = await fetch(
            `http://127.0.0.1:8000/market-value?${params}`
        );

        if (!response.ok) {
            throw new Error("The market-value API request failed.");
        }

        const data = await response.json();

        if (
            data.status !== "verified_record_found" ||
            !Array.isArray(data.records) ||
            data.records.length === 0
        ) {
            status.textContent =
                currentLanguage === "te"
                    ? "ధృవీకరించిన మార్కెట్ విలువ సమాచారం అందుబాటులో లేదు. పరిహారం అంచనా ఇవ్వలేము."
                    : "Verified market-value data is unavailable. A compensation estimate cannot be provided.";

            return;
        }

        const record = data.records[0];

        status.textContent =
            currentLanguage === "te"
                ? `ధృవీకరించిన మార్కెట్ విలువ: ₹${record.rate.toLocaleString("en-IN")} ${record.unit}. ఇది తుది పరిహారం మొత్తం కాదు.`
                : `Verified market value: ₹${record.rate.toLocaleString("en-IN")} ${record.unit}. This is not the final compensation amount.`;

    } catch (error) {
        console.error("Market-value API error:", error);

        status.textContent =
            currentLanguage === "te"
                ? "మార్కెట్ విలువ వివరాలను లోడ్ చేయలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి."
                : "Could not load market-value data. Please try again.";
    }
}


function resultRecordRate(record) {
    return record.rate.toLocaleString("en-IN");
}

