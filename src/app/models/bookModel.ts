import {  Schema, model} from "mongoose";
import { iBook, updateAvailableStaticMethod } from "../interface/bookInterface";
const bookSchema = new Schema<iBook, updateAvailableStaticMethod>({
            
    title: {
        type: String,
        required: [ true, "Book title required"]
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION' , 'NON_FICTION' ,'SCIENCE' , 'HISTORY' , 'BIOGRAPHY' , 'FANTASY']
    },
    isbn: {
        type: String,
        unique: [true,"Isbn must be unique"],
        required: true,
        minlength: 13,
        maxlength: 13
    },
    description:{
        type: String,

    },
    copies:{
        type: Number,
        required: true,
        min: 0
    },
    available:{
        type: Boolean,
        default: true
    }

},
{
    timestamps: true,
    versionKey: false
})


bookSchema.static("updateAvailable",async function(bookId: string){

    const book = await Book.findById(bookId);
    if(!book) return;

    if(book.copies <=0 && book.available=== true){
        book.available = false;
        await book.save();
        
    }else if(book.copies > 0 && book.available === false){
        book.available = true;
       return await book.save()
    }
})

export const Book = model<iBook,updateAvailableStaticMethod>("Book", bookSchema)