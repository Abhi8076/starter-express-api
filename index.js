const express = require('express');
const mongoose = require('mongoose');
const handleClient = require('./routes/handleClient');
const handleOrder = require('./routes/handleOrder');
const handleUser = require('./routes/handleUser');
const handleItem = require('./routes/handleItem');
const handlePayment = require('./routes/handlePayment');
const handleLog = require('./routes/handleLog');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.join(__dirname,'/client/build')));
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connetion Successfull");
})
.catch((err) => {
    console.log(err.message);
});

app.use('/api/login', handleUser);
app.use('/api/client', handleClient);
app.use('/api/order', handleOrder);
app.use('/api/item', handleItem);
app.use('/api/payments', handlePayment);
app.use('/api/logs', handleLog);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+"/client/build/index.html"))
});

app.listen(PORT, () => {
    console.log("server running");
});