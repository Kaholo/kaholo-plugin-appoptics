const fetch = require("node-fetch");
const APP_OPTICS_API_URL = "https://api.appoptics.com/"

async function sendToAppOptics(token, httpMethod, path, body){
    if (!token){
        throw "Did not provide API token!"
    }
    const opts = {
        method: httpMethod,
        headers: new fetch.Headers()
    };
    opts.headers.set('Authorization', 'Basic ' + Buffer.from(token + ":").toString('base64'));
    if (httpMethod === "POST" && body){
        opts.body = JSON.stringify(body);
        opts.headers.set('Content-Type', 'application/json');
    }
    const res = await fetch(APP_OPTICS_API_URL + path, opts);
    const resBody = await res.json();
    if (!res.ok){
        throw resBody;
    }
    return resBody;
}

function parseIntArr(arr){
    if (Array.isArray(arr)) return arr;
    if (!arr) return [];
    if (typeof(arr) !== "string") {
        throw "Can only parse Array or String types";
    }
    arr = arr.split("/n");
    if (!arr.every((num) => Number.isInteger(Number(num)))){
        throw "Bad Service Format. Must be an integer";
    }
    return arr.map(Number.parseInt);
}

function parseObject(param){
    if (typeof(param) === "object") return param;
    if (!param) return param;
    if (typeof(param) !== "string") {
        throw "Unkown Object Format";
    }
    const obj = {};
    param.split("\n").forEach((field) => {
        let [key, ...val] = field.trim().split("=");
        if (!key || !val){
            throw "Bad Object Format";
        }
        if (Array.isArray(val)){
            val = val.join("=");
        }
        obj[key] = val;
    });
    return obj;
}

module.exports = {
    sendToAppOptics,
    parseIntArr,
    parseObject
}
