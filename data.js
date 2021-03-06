var faker = require("faker");

var data = [];
var categories = ["Watersports", "Soccer", "Chess", "Running"];

faker.seed(100);

for (let i = 1; i <= 500; i++) {
    var category = faker.helpers.randomize(categories);
    data.push({
        id: i,
        name: faker.commerce.productName(),
        category: category,
        description: `${category}: ${faker.lorem.sentence(3)}`,
        price: faker.commerce.price()
    })
}

module.exports = function () {
    return { 
        products: data,
        categories: categories,
        orders: [],
        homes: [
            { "id": 1, "alias": "Stepa 23", "streetName": "Stefanika",  "streetNumber": 9, "homeNumber": 23, "city": "Belgrade", "country": "Serbia" },
            { "id": 2, "alias": "Stepa 19", "streetName": "Stefanika",  "streetNumber": 9, "homeNumber": 19, "city": "Belgrade", "country": "Serbia" }
        ]
    }
}
