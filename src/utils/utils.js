import axios from 'axios';

const projectName = 'xxx';
const userName = 'xxx';
const password = 'xxx';
const projectId = 'xxx';
const qabotId = 'xxx';

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