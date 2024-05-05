const { findAllOrders } = require("../databases/orders");

async function dashboardData(req, res) {
    try {
        const allOrders = await findAllOrders();
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const revenue = allOrders.reduce((sum, order) => sum + order.amount, 0);
        const oneWeekAgoRevenue = allOrders.reduce((sum, order) => {
            if (new Date(order.createdAt) <= oneWeekAgo) {
                return sum + order.amount;
            }
            return sum;
        }, 0);
        const topSellingItems = getTopSellingItems(allOrders);
        res.status(200).send({
            revenueProfitChart: {
                months: ["Apr", "May", "Jun", "Jul", "Aug", "Sept", "Nov"],
                revenueDataset: [65, 59, 80, 81, 56, 55, 40],
                collection: [28, 48, 40, 19, 86, 27, 90]
            },
            revenue,
            oneWeekAgoRevenue: oneWeekAgoRevenue ? oneWeekAgoRevenue : revenue,
            topSellingItems
        });
    } catch (err) {
        res.status(500).send(err);
    }
}

function getRevenueChartData(orders, currentDate) {
    const currMonth = currentDate.getMonth();
    let l;
    let revenue;
    let profit;
    if(currMonth == 3) {

    }
    else if(currMonth > 3) {

    }
    else {

    };
    for(let i=3; i<l; i++) {

    }
}

function getTopSellingItems(orders) {
    const itemsMap = new Map();

    orders.forEach(order => {
        order.items.forEach(item => {
            const { itemId, itemName, amount } = item;

            if (itemsMap.has(itemId)) {
                const existingAmount = itemsMap.get(itemId);
                itemsMap.set(itemId, existingAmount + amount);
            } else {
                itemsMap.set(itemId, amount);
            }
        });
    });

    const sortedItems = [...itemsMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([itemId, amount]) => {
            const itemOrder = orders.find(order => order.items.some(item => item.itemId === itemId));
            const item = itemOrder.items.find(item => item.itemId === itemId);
            return {
                itemId,
                itemName: item.itemName,
                totalAmount: amount
            };
        });

    return sortedItems;
}

module.exports = {
    dashboardData
};
