import mongoose,{Schema} from "mongoose";

const codeSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    validTime:{
        type:Date,
        required:true
    }
});
export const Code = mongoose.models.Code || mongoose.model('Code',codeSchema)