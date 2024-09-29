final table<Order> key(id) orders = table [
    {id: "HM-278", quantity: 5, item: "TV", customerId: "C-124", cargoId: "S-224", date: "22-11-2023", status: PENDING},
    {id: "HM-340", quantity: 3, item: "IPhone 14", customerId: "C-73", cargoId: "S-225", date: "12-11-2023", status: DELIVERED}
];

function insertOrder(Order entry) {
    orders.add(entry);
}

function selectOrder(string id) returns Order|error {
    if (orders.hasKey(id)) {
        return orders.get(id);
    }
    return error("Order not found");
}

function selectAllOrders() returns Order[] {
    return orders.toArray();
}

function selectOrdersByCargoId(string cargoId) returns Order[]|error {
    return from Order ord in orders where ord.cargoId == cargoId select ord;
}
