import { Router, NextFunction, Request, Response } from "express";

import { Book } from "../models/bookModel";

export const bookRouter = Router();

bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
    const { filter, sortBy = "createdAt", sort = "asc", limit = "5" } = req.query;

    const sorting = sort === "desc" ? -1 : 1;
    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const books = filter
      ? await Book.find(query)
      .sort({ [sortBy as string]: sorting})
      .limit(Number(limit))
      : await Book.find().sort({ createdAt: 1 }).limit(10);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
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

      await Book.updateAvailable(bookId);

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

      const book = await Book.findByIdAndDelete(bookId);

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
