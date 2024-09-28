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

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { useEffect, useState } from 'react';

export const OrdersTable = (props) => {
  const {
    items = [],
    handleClick,
    open = false
  } = props;

  const [location1, setLocation1] = useState({longitude: "...", latitude: "..."});
  const [location2, setLocation2] = useState({longitude: "...", latitude: "..."});
  const [location3, setLocation3] = useState({longitude: "...", latitude: "..."});

  useEffect(() => {
    const wsClient1 = new WebSocket("ws://localhost:9091/logistics/cargos/S-224");
    const wsClient2 = new WebSocket("ws://localhost:9091/logistics/cargos/S-225");
    const wsClient3 = new WebSocket("ws://localhost:9091/logistics/cargos/S-226");

    wsClient1.onmessage = (message) => {
      setTimeout(()=>{
        setLocation1(JSON.parse(message.data));
       }, 10000)
    }
    wsClient2.onmessage = (message) => {
       setTimeout(()=>{
        setLocation2(JSON.parse(message.data));
       }, 10000)
    }
    wsClient3.onmessage = (message) => {
       setTimeout(()=>{
        setLocation3(JSON.parse(message.data));
       }, 10000)
    }
  }, [location1, location2, location3]);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Ship
                </TableCell>
                <TableCell>
                  Item
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      {order.status}
                    </TableCell>
                    <TableCell>
                      {order.cargoId != null ? order.cargoId : "Not Assigned"}
                    </TableCell>
                    <TableCell>
                      {order.item}
                    </TableCell>
                    <TableCell>
                      {order.quantity}
                    </TableCell>
                    <TableCell>
                      {order.date}
                    </TableCell>
                    <TableCell>
                      {order.cargoId === "S-224" ? location1.longitude.toString() + " " + location1.latitude.toString() :
                      order.cargoId === "S-225" ? location2.longitude.toString() + " " + location2.latitude.toString() :
                      order.cargoId === "S-226" ? location3.longitude.toString() + " " + location3.latitude.toString() : "Not Available"}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleClick(order.id)}>View</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  handleClick: PropTypes.func,
  open: PropTypes.bool
};
