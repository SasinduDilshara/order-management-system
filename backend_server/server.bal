import ballerina/http;
import ballerina/random;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on new http:Listener(9090) {
    resource function get orders() returns Order[]|error {
        return selectAllOrders();
    };

    resource function get orders/[string id]() returns Order|error {
        return selectOrder(id);
    };

    resource function get cargos/[string cargoId]/orders() returns Order[]|error {
        return selectOrdersByCargoId(cargoId);
    };

    resource function post orders(Order orderEntry) returns http:Ok|http:InternalServerError {
        orderEntry.cargoId = getCargoId();
        insertOrder(orderEntry);
        return http:OK;
    };
}

isolated function getCargoId() returns string {
    int|random:Error id = random:createIntInRange(224, 226);
    return id is int ? string `S-${id}` : "S-224";
}
