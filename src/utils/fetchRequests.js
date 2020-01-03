/* @copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author     : Shiv Charan Panjeta < shiv@toxsl.com >
 
All Rights Reserved.
Proprietary and confidential :  All information contained herein is, and remains
the property of ToXSL Technologies Pvt. Ltd. and its partners.
Unauthorized copying of this file, via any medium is strictly prohibited. */
import { commonErrorMsg } from "../utils/Message";
import * as routes from "../../src/app/globals/endpoints";
import * as session from "../utils/session";
import { async } from "q";

export const getFetch = async (api) => {
    let result = sleep(100).then(async () => {
        let result = await fetch(routes.baseURL + api, {
            method: 'GET',
            headers: await routes.reqHeader()
        }).then(function (response) {
            if (response.status === 401) {
                session.clearSession();
                this.props.history.push("/");
                return false;
            }
            return response.json();
        }).then(function (responseBody) {
            if (responseBody.status === 200) {
                return responseBody;
            } else {
                throw responseBody.msg ? responseBody.msg : commonErrorMsg;
            }
        })
            .catch(function (error) {
                throw commonErrorMsg;
            });

        return result;
    })
    return result;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const patchFetch = async (api, data) => {
    let result = await fetch(routes.baseURL + api, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: await routes.reqHeader()
    }).then(function (response) {
        return response.json();
    }).then(function (responseBody) {
        if (responseBody.status === 200) {
            return responseBody;
        } else {
            throw responseBody.msg ? responseBody.msg : commonErrorMsg;
        }
    })
        .catch(function (error) {
            throw commonErrorMsg;
        });

    return result;
}

export const postFetch = async (api, data) => {
    let result = await fetch(routes.baseURL + api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: await routes.reqHeader()
    }).then(function (response) {
        return response.json();
    }).then(function (responseBody) {
        return responseBody;
    })
        .catch(function (error) {
            throw commonErrorMsg;
        });
    return result;
}

export const postFetchMutiPart = async (api, data) => {
    let result = await fetch(routes.baseURL + api, {
        method: 'POST',
        body: data,
        headers: await routes.reqHeaderMultipart()
    }).then(function (response) {
        return response.json();
    }).then(function (responseBody) {
        return responseBody;
    })
        .catch(function (error) {
            throw commonErrorMsg;
        });
    return result;
}

export const postDelete = async (api) => {
    let result = await fetch(routes.baseURL + api, {
        method: 'DELETE',
        headers: await routes.reqHeader()
    }).then(function (response) {
        return response.json();
    }).then(function (responseBody) {
        if (responseBody.status === 200) {
            return responseBody;
        } else {
            throw responseBody.msg ? responseBody.msg : commonErrorMsg;
        }
    })
        .catch(function (error) {
            throw commonErrorMsg;
        });
    return result;
}

export const getSkills = async () => {
    let result = sleep(100).then(async () => {
        let result = await fetch(routes.baseURL + `user_skill/`, {
            method: 'GET',
            headers: await routes.reqHeaderOuter
        }).then(function (response) {
            return response.json();
        }).then(function (responseBody) {
            if (responseBody.status === 200) {
                return responseBody;
            } else {
                throw responseBody.msg ? responseBody.msg : commonErrorMsg;
            }
        })
            .catch(function (error) {
                throw commonErrorMsg;
            });

        return result;
    })
    return result;
}

export const downloadDoc = async (url, fileName) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}