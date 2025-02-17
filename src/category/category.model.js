import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    description:{
        type:String,
        required: true,
        maxlength: [50, `The description cannot be longer than 50 characters`]
    }
},
    {versionKey: false}
)

export default model('Category', categorySchema)