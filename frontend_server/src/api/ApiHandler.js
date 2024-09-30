import axios from 'axios';

// Valid token with admin as the scope
const token = "Bearer eyJhbGciOiJSUzI1NiIsICJ0eXAiOiJKV1QiLCAia2lkIjoiNWEwYjc1NC04OTVmLTQyNzktODg0My1iNzQ1ZTExYTU3ZTkifQ.eyJpc3MiOiJ3c28yIiwgInN1YiI6ImJhbGxlcmluYSIsICJhdWQiOlsiYmFsbGVyaW5hIiwgImJhbGxlcmluYS5vcmciLCAiYmFsbGVyaW5hLmlvIl0sICJleHAiOjE3Mjc3Mjk5MDYsICJuYmYiOjE3Mjc2OTM5MDYsICJpYXQiOjE3Mjc2OTM5MDYsICJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwgInNjb3BlIjoiYWRtaW4ifQ.NsdH45ZlDR9jvhQb89MzW1Js8hgyNlMslyEcYx6zV4DMgWsPQDvPPEfPydzSu1O-NGvrqkZGGnrOrL_vcIpum94BwJMOevkZQ9mMmYz3-SaQVb07NUpgPYzrxebr26bCNQRmbARTMUFUArYaTvCK2qvNXG_O4YeZs6dFU9wG-Pp599gWXRqxmuMvCAsop4x5afhbyoJhCT9lzJtjzv3KVuufATh14e7aj4xFSc_4WEbahSqYjGSd4WFn1nAraj-sYZvfJMx6ljivvXOijRPhASJOFZN0BWDgmTnUrSx03wMK_9Sldv06gPn8q3TAP6ayPqGWGmYPIxSV5nRoNPNhzg";

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
