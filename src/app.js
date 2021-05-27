const { sendToAppOptics, parseIntArr, parseObject } = require("./helpers");

async function getAlert(action, settings) {
    const alert = (action.params.alert || "").trim();
    const token = action.params.token || settings.token;
    const alertQuery = Number.isInteger(alert) ? // check if ID or Name
                 `/${alert}` : `?name=${alert}`;
    return sendToAppOptics(token, "GET", "v1/alerts" + alertQuery);
}

async function createAlert(action, settings) {
    const token = action.params.token || settings.token;
    const rearm = action.params.rearm;
    const body = {
        name: (action.params.alertName || "").trim(),
        description: action.params.desc,
        conditions: action.params.conditions,
        services: parseIntArr(action.params.services),
        attributes: parseObject(action.params.attributes),
        active: (action.params.active === undefined || typeof(action.params.active) === "undefined") ?
                true : action.params.active,
    };
    if (!body.name || !body.conditions || body.services.length === 0){
        throw "Didn't provide one of the required parameters";
    }
    if (!Array.isArray(body.conditions)){
        throw "Bad conditions format";
    }
    if (rearm){
        try { body.rearm_seconds = Number.parseInt(rearm) * 60; }
        catch (err) { throw "Rearm Minutes must be an Integer"; }
    }
    return sendToAppOptics(token, "POST", "v1/alerts", body);
}

async function listServices(action, settings) {
    const token = action.params.token || settings.token;
    return sendToAppOptics(token, "GET", "v1/services");
}
///// Exports

module.exports = {
    getAlert,
    createAlert,
    listServices
}
