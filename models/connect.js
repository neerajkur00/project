const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/multerbackup')
.then(()=>{
    console.log('data is established')
})
.catch((err)=>{
    console.log(err.message)
})