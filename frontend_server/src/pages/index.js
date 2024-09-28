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

import { useEffect, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { OrdersTable } from 'src/components/orders/orders-table';
import { OrdersSearch } from 'src/components/orders/orders-search';
import { getCargoOrderUrl, getOrderUrl } from 'src/constants/Constants';
import { getAPI } from 'src/api/ApiHandler';
import SimpleDialog from 'src/components/orders/view-order';

const tokenWithAdminScope = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhMGI3NTQtODk1Zi00Mjc5LTg4NDMtYjc0NWUxMWE1N2U5IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImJhbGxlcmluYSIsImlzcyI6IndzbzIiLCJhdWQiOlsiYmFsbGVyaW5hIiwiYmFsbGVyaW5hLm9yZyIsImJhbGxlcmluYS5pbyJdLCJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwic2NvcGUiOiJhZG1pbiIsImV4cCI6MTcyNzU0ODQzMX0.BdobO5FSqic_V4523kSfrXTIxa1FnuarHFIUnlEduTSvLo7uebiVrsCvVmQxFpWSI4jnJl7QquPfP8ppu9SaOzhMIcc58JTCUTNkyAnJf0mgRHOpsa0OizFcQfoKK5KlLpnUA_7izYtoucYaKfuAsLPg-GqzIPNx9mde_JcOZAzjMoedJ2fj5ZQWomosrkKzkBD2zc-DW2fE5zIfQgbxTWZAQVGR5WBkuX1n6Ao89SpLa5K8imG_-ZbH6HFsdoz6EeuaAsScRPZw95UnBtIixF8Pch08Iujr7bXoyACtji6SCJ4OCitl7rzrpMmhyV30QSUrM5Jch5zqOy3DmiOytw";
const tokenWithoutAdminScope = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhMGI3NTQtODk1Zi00Mjc5LTg4NDMtYjc0NWUxMWE1N2U5IiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6ImJhbGxlcmluYSIsImlzcyI6IndzbzIiLCJhdWQiOlsiYmFsbGVyaW5hIiwiYmFsbGVyaW5hLm9yZyIsImJhbGxlcmluYS5pbyJdLCJqdGkiOiJKbGJtTWlPaUpCTVRJNFEwSkRMVWhUTWpVMkluIiwic2NvcGUiOiJub3QtYS1hZG1pbiIsImV4cCI6MTcyNzU0ODY2N30.gCoBUn-OFuUbzPQiMo3LiH3sk5KSI5x5p0k3mB4fExKDUhmqeiht1cSn4ErMXJCxLFQqWA22gA27Ix3CWvYEn8H3f_7bVt_DkgM3wcJtYoJ9lmwPj-5SWFQ73X_OJsnZH3PZgevKhG0BZ7I_K7dej9kXexJ21xzgsf9Kvg94QdWx6WOvJaGRvM06xz2hPWBnLOULPzrXdpTMXo2T9x8LZDd1am4zUFJaNWqgXLH-_6VPv_CSBcBQk1ddKLHds02msCLtStO7QZwqBBP0ytsA3p-bUbKprohXHu_494vXM7pK5xaXzveIU-DZRpCElzkZeOOXSagVLv_PgeG-gl0gUw";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [cargo, setCargo] = useState("");
  const [filter, setFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [order, setOrder] = useState('');

  const fetchOrderData = async (id) => {
    try {
      const response = await getAPI(getOrderUrl + "/" + id, {headers: {'Authorization': 'Bearer ' + tokenWithAdminScope, 'Content-Type': 'application/json'}});
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        setOrder(response.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleClickOpen = async (id) => {
    setId(id);
    await fetchOrderData(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAPI(cargo != '' ? getCargoOrderUrl(cargo): getOrderUrl, {headers: {'Authorization': 'Bearer ' + tokenWithAdminScope, 'Content-Type': 'application/json'}});
      if (response.status !== 200) {
        setError(response.message);
      } else {
        setError(null);
        const d = await response.data;
        setData(d);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
};

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {

  }, [data]);


  const onSearchButtonClick = (e) => {
    e.preventDefault();
    setFilter(!filter);
  }
  
  const onSearchChange = (e) => {
    setCargo(e.target.value);
  }

  return (
    loading ? <div>Loading...</div> : error != null ? <div>{error}</div> :
    <>
      <Head>
        <title>
          Orders | MegaPort Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Orders
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  href='/create-order'
                >
                  Add
                </Button>
              </div>
            </Stack>
            <Stack
              direction="row"
              alignContent={'center'}
              >
            <OrdersSearch 
              onChange={onSearchChange} 
              cargo={cargo}
            />
            <Button label="Search" value="Search" onClick={onSearchButtonClick}> Search </Button>
            </Stack>
            <OrdersTable
              count={data.length}
              items={data}
              handleClick={handleClickOpen}
              open={open}
            />
          </Stack>
        </Container>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          id={id}
          order={order}
      />
      </Box>
    </>
  );
};


export default Page;
