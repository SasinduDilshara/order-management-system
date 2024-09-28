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

const tokenWithAdminScope = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhMGI3NTQtODk1Zi00Mjc5LTg4NDMtYjc0NWUxMWE1N2U5IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImJhbGxlcmluYSIsImlzcyI6IndzbzIiLCJhdWQiOlsiYmFsbGVyaW5hIiwiYmFsbGVyaW5hLm9yZyIsImJhbGxlcmluYS5pbyJdLCJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwic2NvcGUiOiJhZG1pbiIsImV4cCI6MTcyNzU0ODQzMX0.BdobO5FSqic_V4523kSfrXTIxa1FnuarHFIUnlEduTSvLo7uebiVrsCvVmQxFpWSI4jnJl7QquPfP8ppu9SaOzhMIcc58JTCUTNkyAnJf0mgRHOpsa0OizFcQfoKK5KlLpnUA_7izYtoucYaKfuAsLPg-GqzIPNx9mde_JcOZAzjMoedJ2fj5ZQWomosrkKzkBD2zc-DW2fE5zIfQgbxTWZAQVGR5WBkuX1n6Ao89SpLa5K8imG_-ZbH6HFsdoz6EeuaAsScRPZw95UnBtIixF8Pch08Iujr7bXoyACtji6SCJ4OCitl7rzrpMmhyV30QSUrM5Jch5zqOy3DmiOytw";
const tokenWithoutAdminScope = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhMGI3NTQtODk1Zi00Mjc5LTg4NDMtYjc0NWUxMWE1N2U5IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImJhbGxlcmluYSIsImlzcyI6IndzbzIiLCJhdWQiOlsiYmFsbGVyaW5hIiwiYmFsbGVyaW5hLm9yZyIsImJhbGxlcmluYS5pbyJdLCJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwic2NvcGUiOiJub3QtYS1hZG1pbiIsImV4cCI6MTcyNzU0ODY2N30.gCoBUn-OFuUbzPQiMo3LiH3sk5KSI5x5p0k3mB4fExKDUhmqeiht1cSn4ErMXJCxLFQqWA22gA27Ix3CWvYEn8H3f_7bVt_DkgM3wcJtYoJ9lmwPj-5SWFQ73X_OJsnZH3PZgevKhG0BZ7I_K7dej9kXexJ21xzgsf9Kvg94QdWx6WOvJaGRvM06xz2hPWBnLOULPzrXdpTMXo2T9x8LZDd1am4zUFJaNWqgXLH-_6VPv_CSBcBQk1ddKLHds02msCLtStO7QZwqBBP0ytsA3p-bUbKprohXHu_494vXM7pK5xaXzveIU-DZRpCElzkZeOOXSagVLv_PgeG-gl0gUw";

export const getAPI = async ( url, config) => {
    try {
        // Valid user with admin scope
        const response = await axios.get(url, config);

        // // Invalid user without admin scope
        // const response = await axios.get(url, {...config, headers: {'Authorization': 'Bearer ' + tokenWithAdminScope}});
        return response;
    } catch (error) {
        console.log({error});
        return error;
    }
}

export const postAPI = async ( url, data, config) => {
    try {
        // Valid user with admin scope
        const response = await axios.post(url, data, config);

        // // Invalid user without admin scope
        // const response = await axios.post(url, data, {...config, headers: {'Authorization': 'Bearer ' + tokenWithoutAdminScope}});
        return response;
    } catch (error) {
        throw {error: true, data: error};
    }
}
