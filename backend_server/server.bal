import ballerina/http;
import ballerina/random;
import ballerina/sql;

listener http:Listener securedEndPoint = new (9090,
    secureSocket = {
        key: {
            certFile: "resources/public.crt",
            keyFile: "resources/private.key"
        }
    }
);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on securedEndPoint {
    // @http:ResourceConfig {
    //     cors: {
    //         allowOrigins: ["*"]
    //     },
    //     auth: [
    //         {
    //             jwtValidatorConfig: {
    //                 issuer: "wso2",
    //                 audience: "ballerina",
    //                 signatureConfig: {
    //                     certFile: "resources/public.crt"
    //                 }
    //             },
    //             scopes: ["admin"]
    //         }
    //     ]
    // }
    resource function get orders() returns Order[]|error {
        return selectAllOrders();
    };

    @http:ResourceConfig {
        cors: {
            allowOrigins: ["*"]
        },
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "wso2",
                    audience: "ballerina",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                },
                scopes: ["admin"]
            }
        ]
    }
    resource function get orders/[string id]() returns Order|http:NotFound|http:InternalServerError {
        Order|sql:Error orderEntry = selectOrder(id);
        if orderEntry is Order {
            return orderEntry;
        }
        if (orderEntry is sql:NoRowsError) {
            return <http:NotFound>{body: {message: "Order not found"}};
        }
        if (orderEntry is sql:Error) {
            return <http:InternalServerError>{body: {message: "Error occurred while retrieving the order"}};
        }
    };

    @http:ResourceConfig {
        cors: {
            allowOrigins: ["*"]
        },
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "wso2",
                    audience: "ballerina",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                },
                scopes: ["admin"]
            }
        ]
    }
    resource function get cargos/[string cargoId]/orders() returns Order[]|error {
        return selectOrdersByCargoId(cargoId);
    };

    @http:ResourceConfig {
        cors: {
            allowOrigins: ["*"]
        },
        auth: [
            {
                jwtValidatorConfig: {
                    issuer: "wso2",
                    audience: "ballerina",
                    signatureConfig: {
                        certFile: "resources/public.crt"
                    }
                },
                scopes: ["admin"]
            }
        ]
    }
    resource function post orders(Order orderEntry) returns http:Ok|http:InternalServerError {
        orderEntry.cargoId = getCargoId();
        sql:ExecutionResult|error result = insertOrder(orderEntry);
        if result is sql:ExecutionResult {
            return http:OK;
        }
        return http:INTERNAL_SERVER_ERROR;
    };
}

isolated function getCargoId() returns string {
    int|random:Error id = random:createIntInRange(224, 226);
    return id is int ? string `S-${id}` : "S-224";
}
