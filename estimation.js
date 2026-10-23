
function checkMarketValueRecord(record, landDetails) {
    const reasons = [];

    if (!record) {
        reasons.push("No matching market-value record was found.");
        return {
            canProceed: false,
            reasons: reasons
        };
    }

    const normalize = value =>
        String(value ?? "").trim().toLowerCase();

    if (normalize(record.state) !== "andhra pradesh") {
        reasons.push("The state does not match.");
    }

    if (
        normalize(record.district) !==
        normalize(landDetails.district)
    ) {
        reasons.push("The district does not match.");
    }

    if (
        normalize(record.mandal) !==
        normalize(landDetails.mandal)
    ) {
        reasons.push("The mandal does not match.");
    }

    if (
        normalize(record.village) !==
        normalize(landDetails.village)
    ) {
        reasons.push("The village does not match.");
    }

    
    if (
        normalize(record.landCategory) !==
        normalize(landDetails.landCategory)
    ) {
        reasons.push("The land category does not match.");
    }


    if (record.verificationStatus !== "verified") {
        reasons.push("The market-value record is not verified.");
    }

    if (
        typeof record.rate !== "number" ||
        !Number.isFinite(record.rate) ||
        record.rate <= 0
    ) {
        reasons.push("The rate is missing or invalid.");
    }

    if (
        typeof record.unit !== "string" ||
        record.unit.trim() === ""
    ) {
        reasons.push("The rate unit is missing.");
    }

    if (
        typeof record.sourceReference !== "string" ||
        record.sourceReference.trim() === ""
    ) {
        reasons.push("The source reference is missing.");
    }

    return {
        canProceed: reasons.length === 0,
        reasons: reasons
    };
}
