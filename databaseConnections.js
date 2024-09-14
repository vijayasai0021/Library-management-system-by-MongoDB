const mongoose = require('mongoose');

function DbConnections(){
    const DB_URL = process.env.MONGODB_URI;

    
    mongoose.connect(DB_URL,{
        // useNewUrlParser:true,
        
        // useUnifiedTopology:true,
        
    });
    // mongoose.connect(DB_URL, { useNewUrlParser: true });
}
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('DB Connected');
})
module.exports = DbConnections;