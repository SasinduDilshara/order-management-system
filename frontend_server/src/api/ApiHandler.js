/**
 * Copyright (c) 2023, WSO2 LLC (http://www.wso2.com) All Rights Reserved.
 *
 * WSO2 LLC licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import axios from 'axios';

// Valid token with admin as the scope
const token = "Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiNWEwYjc1NC04OTVmLTQyNzktODg0My1iNzQ1ZTExYTU3ZTkifQ.eyJpc3MiOiJ3c28yIiwgInN1YiI6ImJhbGxlcmluYSIsICJhdWQiOlsiYmFsbGVyaW5hIiwgImJhbGxlcmluYS5vcmciLCAiYmFsbGVyaW5hLmlvIl0sICJleHAiOjE3Mjc2MDk2MDEsICJuYmYiOjE3Mjc2MDYwMDEsICJpYXQiOjE3Mjc2MDYwMDEsICJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwgInNjb3BlIjoiYWRtaW4ifQ.c4fQSU9brRFRMl8nuyAbanCx77cej_Ne5BUoKinjlGD_UaoQYjFkWnc6KxftSqUhw8kMWtSRnrlZ2G3w9dejpTdic5Yr78rRzKESL-U9KJZHC-ceeekv4pSUApMlkJcYiLIXb_VdGrYSOaS-nENqLtrLT-t81e8s3j_v17ZJLiG5oxdYJaO-RDgEcAZA07ATH8vBEkFREvT8WfL9aXJrfAmV7bsav4_2-1_A4O7GULS3ehA60_2AQRrZBNdWAGcoJU5Qmy4TJ1QNRuNvJfeVfa8KZ9LBhnK--HyNMR_gNeIwWYDOf6wJShTE29iiM6EWqmHC5IfXJBzh_YA2bVIOPw";

// // Invalid token with admin1 as the scope
// const token = "Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiNWEwYjc1NC04OTVmLTQyNzktODg0My1iNzQ1ZTExYTU3ZTkifQ.eyJpc3MiOiJ3c28yIiwgInN1YiI6ImJhbGxlcmluYSIsICJhdWQiOlsiYmFsbGVyaW5hIiwgImJhbGxlcmluYS5vcmciLCAiYmFsbGVyaW5hLmlvIl0sICJleHAiOjE3Mjc2MDk3NzIsICJuYmYiOjE3Mjc2MDYxNzIsICJpYXQiOjE3Mjc2MDYxNzIsICJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwgInNjb3BlIjoiYWRtaW4xIn0.XTT9x6NJLXldgd54RNi7QWF5hTswI1maLIor6tjEMJ95yFB0dxWmoVPSfHV9Pcf5kAY7iUKD82yuVE6-At0YSnmQnOiExCZ_jEw1Ouw7jBICR0W_pevxoFgay4wkhcECCSIj2k1mAjbtNv3b5R8sYrm5PMjnhk8E5ESWzwooKBF1pk-WwQTkMnJj6jhc_n1bmORyY9HbN1yQDZ7oak-P_oqz_cBBkx0TqBAA2yKP-Ynbmb3IMgrseKz13qfnGPEzZ9Jtsr7rsp358TJm-xNFSEtaA6078OE9SDS6K-sPchR8Nab_t8B3vG0la5UULdfQBqztUTVFnF30QAxDMKCw3A";

export const getAPI = async ( url) => {
    try {
        const response = await axios.get(url, {headers: {Authorization: token, 'Content-Type': 'application/json'}});
        return response;
    } catch (error) {
        return error;
    }
}

export const postAPI = async ( url, data) => {
    try {
        const response = await axios.post(url, data, {headers: {Authorization: token, 'Content-Type': 'application/json'}});
        return response;
    } catch (error) {
        throw {error: true, data: error};
    }
}
