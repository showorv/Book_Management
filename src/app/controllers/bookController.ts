import { Router, NextFunction, Request, Response } from "express";

import { Book } from "../models/bookModel";
import { FilterQuery } from "mongoose";
import { iBook } from "../interface/bookInterface";

export const bookRouter = Router();

bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, author, genre, isbn, description, copies, available } =
        req.body;

      const book = await Book.create({
        title,
        author,
        genre,
        isbn,
        description,
        copies,
        available,
      });

      res.status(200).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "5",page="1" } = req.query;

    const sorting = sort === "desc" ? -1 : 1;
    const query: FilterQuery<iBook> = {};
    const currentPage = parseInt(page as string) || 1;
    const limitPage = parseInt(limit as string) || 5;
    const skip = (currentPage-1)* limitPage;

    if (filter) {
      query.genre = filter;
    }

    const books = filter
    ? await Book.find(query)
    .sort({ [sortBy as string]: sorting}).
    skip(skip)
    .limit(Number(limitPage))
    : await Book.find().sort({ createdAt: 1 }).skip(skip).limit(limitPage);

    const totalBooks = await Book.countDocuments(query);
    const totalPages = Math.ceil(totalBooks / limitPage);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      meta: {
        total: totalBooks,
        page: currentPage,
        limit:limitPage,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
});

bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;

      const book = await Book.findById(bookId);


      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;
      const updatedBody = req.body;

      const book = await Book.findByIdAndUpdate(bookId, updatedBody, {
        new: true,
      });

      await Book.updateAvailable(bookId);

      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;

       await Book.findByIdAndDelete(bookId);

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
