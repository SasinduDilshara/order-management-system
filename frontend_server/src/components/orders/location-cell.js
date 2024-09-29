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

import {
    TableCell,
  } from '@mui/material';
  import * as React from 'react';
  import { useEffect, useState } from 'react';
  
  export default function LocationCell({id}) {
    const [location, setLocation] = useState({longitude: "...", latitude: "..."});
  
    useEffect(() => {
      const wsClient1 = new WebSocket("ws://localhost:9091/logistics/cargos/" + id);
  
      wsClient1.onmessage = (message) => {
        setTimeout(()=>{
          setLocation(JSON.parse(message.data));
         }, 1000)
      }
      
    }, [location]);
  
    return (
        <TableCell>
            {location.longitude.toString() + " " + location.latitude.toString()}
        </TableCell>
    );
  };
  