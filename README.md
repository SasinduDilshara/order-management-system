# Order management system

This guide demonstrates how to build a simple order management system using Ballerina and React. The system consists of two services, a backend service that is built using Ballerina and a frontend service that is built using React. The backend service is responsible for manipulating data in a MySQL database and the frontend service is responsible for displaying the order data in a web page.

## Set up

1. Clone the project 

```
$ git clone https://github.com/SasinduDilshara/order-management-system.git
```

2. Add a new file named `Config.toml` in the `/backend_server` directory and add the following configurations for the MySQL server.

```
host = "<Database Host>"
port = <Database Port>
user = <Username of MySQL user>
password = <Password of MySQL user>
database = <database name>
```

3. Run the following SQL query to create a new database in the MySQL server.

```
CREATE DATABASE <database name>;
```

4. Run the SQL scripts `backend_server/resources/init-data.sql` to create the tables and insert data into the tables in the MySQL database.

5. Open a new Terminal in the project path and run the Ballerina service

```
$ cd order-management-system/backend_server
$ bal run
```

6. Then open a new terminal in the project path and run the React service

```
$ cd order-management-system/frontend_server
$ npm run dev
```
