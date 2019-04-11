import axios from 'axios';

const projectName = 'cn-north-1';
const userName = 'ifnota';
const password = 'Huawei@123';
const projectId = '7ffc84e4cd6349e0a3062c4f6ad4ce64';
const qabotId = 'cef2a219-6040-4143-98e8-17fa1bb283f4';

export function getToken() {
    const url = '/myhuaweicloud/v3/auth/tokens';
    const data = {
        "auth": {
            "identity": {
                "methods": [
                    "password"
                ],
                "password": {
                    "user": {
                        "name": userName,
                        "password": password,
                        "domain": {
                            "name": userName
                        }
                    }
                }
            },
            "scope": {
                "project": {
                    "name": projectName
                }
            }
        }
    };
    return axios.post(url, data);
}

export function getSuggestions(data, config) {
    const url = `/v1/${projectId}/qabots/${qabotId}/suggestions`;
    return axios.post(url, data, config);
}

export function getAnswer(data, config) {
    const url = `/v1/${projectId}/qabots/${qabotId}/requests`;
    return axios.post(url, data, config);
}