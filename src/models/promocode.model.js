import mongoose,{Schema} from "mongoose";

const promoCodeSchema = new Schema({

    code:{
        type:String,
        required:true,
        unique:true,
    },
    discount:{
        type:Number,
        required:true 
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

 const Promo = mongoose.model('Promo',promoCodeSchema);

 export {Promo}