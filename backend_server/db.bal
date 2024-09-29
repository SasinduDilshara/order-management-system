import ballerinax/mysql;
import ballerina/sql;

configurable int port = ?;
configurable string host = ?;
configurable string user = ?;
configurable string database = ?;
configurable string password = ?;
configurable mysql:Options & readonly connectionOptions = {};

final mysql:Client dbClient = check new(
    host = host,
    port =  port,
    database =  database,
    user =  user,
    password =  password,
    options = connectionOptions
);

isolated function insertOrder(Order entry) returns sql:ExecutionResult|error {
    Order {id, customerId, date, status, quantity, item, cargoId} = entry;
    sql:ParameterizedQuery insertQuery = `INSERT INTO Orders (id, customerId, date, status, quantity, item, cargoId) VALUES (
                                            ${id}, ${customerId}, ${date}, ${status}, ${quantity}, ${item}, ${cargoId})`;
    return dbClient->execute(insertQuery);
}

isolated function selectOrder(string id) returns Order|sql:Error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM Orders WHERE id = ${id}`;
    return dbClient->queryRow(selectQuery);
}

isolated function selectAllOrders() returns Order[]|error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM Orders`;
    stream<Order, error?> orderStream = dbClient->query(selectQuery);
    return from Order ord in orderStream select ord;
}

isolated function selectOrdersByCargoId(string cargoId) returns Order[]|error {
    sql:ParameterizedQuery selectQuery = `SELECT * FROM Orders WHERE cargoId = ${cargoId} order by quantity desc`;
    stream<Order, error?> orderStream = dbClient->query(selectQuery);
    return from Order ord in orderStream select ord;
}

isolated function getLocationOfCargo(string cargoId) returns Location|sql:Error {
    sql:ParameterizedQuery selectQuery = `SELECT latitude, longitude FROM locations ORDER BY RAND() LIMIT 1`;
    return dbClient->queryRow(selectQuery);
}
