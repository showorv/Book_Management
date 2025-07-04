# Book_Management

A full-featured RESTful API built using **TypeScript**, **Express.js**, and **Mongoose** to manage a collection of books and their borrowing activities. Designed with clean folder structure, error handling, and query flexibility for filtering, sorting, and limiting results.

---

## 🎯 Objective

 - Proper schema validation
 - Business logic enforcement (e.g., availability control on borrow)
 - Use of aggregation pipeline
 - Mongoose static or instance method
 - Use of Mongoose middleware (pre, post)
 - Filtering features

## 🚀 Features

- CRUD operations for Books
- Borrow book functionality
- Filtering, sorting, and pagination for books
- Centralized error handling
- Built with scalable folder structure

## 🛠 Tech Stack

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **dotenv** for environment configuration

---

## ⚙️ Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/showorv/Book_Management.git
cd Book_Management
```
**2. Install Dependencies**

```bash
npm install
```

**3. Set up .env**

Create a `.env` file in the root directory of your project and add the following:

```bash
PORT=5500
MONGODB_URI= your_mongodb_connection_string_here

```

**4. Run the development server**

```bash
cd src
npm run dev
```

```markdown
### 📚 Books And Borrow API

| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /api/books         | Get all books with optional filters |
| GET    | /api/books/:id     | Get a book by ID                   |
| POST   | /api/books         | Add a new book                     |
| PATCH  | /api/books/:id     | Update a book                      |
| DELETE | /api/books/:id     | Delete a book  
| POST   | /api/borrow        | Add a borrow book                  |
| GET    | /api/borrow        | Get all borrow book and filtering  |

```


## 🧑‍💻 Author
**Yousuf Showrov**
Feel free to reach out on `GitHub` or `LinkedIn` for suggestions or contributions.