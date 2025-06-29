import { Types } from "mongoose";

export interface iBorrow{
    book: Types.ObjectId,
    quantity: number,
    dueDate: Date
}

