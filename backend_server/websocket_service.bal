import ballerina/lang.runtime;
import ballerina/log;
import ballerina/websocket;
import ballerina/io;

type Location record {|
    decimal latitude;
    decimal longitude;
|};

// Example ws://localhost:9091/logistics/cargos/S-225.
service /logistics on new websocket:Listener(9091) {
    resource function get cargos/[string cargoId]() returns websocket:Service {
        return new LocationService(cargoId);
    }
}

distinct service class LocationService {
    *websocket:Service;

    private final string cargoId;

    function init(string cargoId) { 
        self.cargoId = cargoId;
    }

    remote function onOpen(websocket:Caller caller) returns error? {
        // Create a new strand  and allocate it to send the locations to the client 
        _ = start self.routeLocationFromServerToClient(caller, self.cargoId);
        return;
    }

    remote function onClose(websocket:Caller caller) {
        log:printInfo("WebSocket connection closed");
    }

    remote function onError(websocket:Caller caller, error err) {
        log:printInfo("Error occured", err);
    }

    function routeLocationFromServerToClient(websocket:Caller caller, string cargoId) returns error? {
        while true {
            Location|error currentLocation = getLocation(cargoId);
            io:println("Sending location: ", currentLocation);
            check caller->writeMessage(check currentLocation);
            runtime:sleep(3);
        }
    }
}

function getLocation(string cargoId) returns Location|error {
    // return {latitude: 6.9271, longitude: 79.8612};
    return getLocationOfCargo(cargoId);
}
