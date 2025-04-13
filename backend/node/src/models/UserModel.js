const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    full_name: { type: String, required: true },
    
   status:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId, 
        ref:"roles"
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String,
        required:false
    },
    bio: { type: String },
    
    address: 
    { type: String }, 
    dateOfBirth: { type: Date },

    connectedUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],
   
    skillsProficientAt: { type: [String], required: true },
    skillsToLearn: { type: [String], required: true },
    
    specification:{
        type:String
    }
},
{timestamps:true})

module.exports = mongoose.model("users",userSchema)