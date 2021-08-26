const mongoose = require('mongoose');

mongoose.connect(process.env.HOST,{
    useNewUrlParser:true,
})
    .then(()=>console.log('db connection successed'))
    .catch((error)=>console.log('db connection falid', error));