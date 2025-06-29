import { Router, NextFunction, Request, Response } from "express";
import { Book } from "../models/bookModel";
import { Borrow } from "../models/borrowModels";

export const borrowRouter = Router();

borrowRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { book, quantity, dueDate } = req.body;

      const bookCopies = await Book.findById(book);

      if (!bookCopies) {
        res.status(404).json({
          success: false,
          message: "Book not found",
          data: null,
        });
        return;
      }

      if (bookCopies?.copies < quantity) {
        res.status(400).json({
          success: false,
          message: `Not enough copies available. Only ${bookCopies.copies} left.`,
          data: null,
        });
        return
      }

      const borrow = await Borrow.create({ book, quantity, dueDate });

      bookCopies.copies = bookCopies?.copies - quantity;

      await bookCopies.save();

      await Book.updateAvailable(book._id);

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
  
    } catch (error) {
      next(error);
    }
  }
);

borrowRouter.get("/", async ( req: Request, res: Response, next: NextFunction)=>{
  try {

    const  borrow = await Borrow.aggregate([
      {
        $group: {
          _id: "$book", 
       
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ])

    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrow,
    });
 
  } catch (error) {
    next(error)
  }
})