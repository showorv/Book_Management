import { Schema, model } from "mongoose";
import { iBorrow } from "../interface/borrowInterface";

const borrowSchema = new Schema<iBorrow>({

    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    dueDate:{
        type: Date,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

borrowSchema.post("save", function(doc,next){
    console.log(`${doc.book} is borrowed`);
    next();
    
})

export const Borrow = model<iBorrow>("Borrow", borrowSchema)