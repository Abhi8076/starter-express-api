var easyinvoice = require('easyinvoice');

async function invoice(client, order){
    let d = new Date(order.date);
    let date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
    let products = order.items.map((o)=>{
        return {
            "quantity": o.quantity*1,
            "description": o.itemName,
            "tax-rate": 5,
            "price": o.itemRate*1
        }
    });

var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        "logo": "http://abhiatwork.com/images/logo.png"
        // "background": ""
    },
    "sender": {
        "company": "Fresh Agri Product",
        "address": "ajadpur mandi",
        "zip": "1234 AB",
        "city": "New Delhi",
        "country": "India"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": `${client.fullname}`,
        "address": `${client.address}`,
        // "zip": "4567 CD",
        "state": `${client.state}`,
        "phone": `${client.phnno}`
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": `${order._id}`,
        // Invoice data
        "date": `${date}`
        // Invoice due date
        // "due-date": "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products":products,
    //     {
    //         "quantity": 2,
    //         "description": "Product 1",
    //         "tax-rate": 6,
    //         "price": 33.87
    //     },
    //     {
    //         "quantity": 4.1,
    //         "description": "Product 2",
    //         "tax-rate": 6,
    //         "price": 12.34
    //     },
    //     {
    //         "quantity": 4.5678,
    //         "description": "Product 3",
    //         "tax-rate": 21,
    //         "price": 6324.453456
    //     }
    // ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "Kindly pay your invoice.",
    // Settings to customize your invoice
    "settings": {
        "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "gst", // Defaults to 'vat'
        // "margin-top": 25, // Defaults to '25'
        // "margin-right": 25, // Defaults to '25'
        // "margin-left": 25, // Defaults to '25'
        // "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};

//Create your invoice! Easy!
let result = await easyinvoice.createInvoice(data);
return result.pdf;
// console.log(products);
}

module.exports = invoice