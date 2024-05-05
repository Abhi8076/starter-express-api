const express = require('express');
const handleClient = require('./routes/handleClient');
const handleOrder = require('./routes/handleOrder');
const handleUser = require('./routes/handleUser');
const handleItem = require('./routes/handleItem');
const handlePayment = require('./routes/handlePayment');
const handleLog = require('./routes/handleLog');
const dashboard = require('./routes/dashboard');
const cors = require('cors');
const path = require('path');
const { connect } = require('./config/connect');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.join(__dirname,'/client/build')));
app.use(express.json());
app.use(cors());

connect()
.then((res)=>{ 
    if(res){
        app.listen(PORT, () => {
            console.log("server running");
        });
    }
});

app.use('/api/login', handleUser);
app.use('/api/client', handleClient);
app.use('/api/order', handleOrder);
app.use('/api/item', handleItem);
app.use('/api/payments', handlePayment);
app.use('/api/logs', handleLog);
app.use('/api/dash', dashboard);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+"/client/build/index.html"))
});