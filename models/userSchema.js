
const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')

const schema = new mongoose.Schema({

    
        name:{
            type: String,
            trim: true,
            required: [true, "Name is required"],
            minLength: [2, "Name must be atleast 4 characters long"],
        },
        username:{
            type: String,
            trim: true,
            unique: true,
            required: [true, "Username is required"],
            minLength: [4, "Username must be atleast 4 characters long"],
        },
        email:{
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            required: [true, "Email is required"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        image: {
            type: String,
            default: "default.jpg",
        },
         password: String,

},
{ timestamps: true}

)

schema.plugin(plm)

module.exports= mongoose.model('user',schema);