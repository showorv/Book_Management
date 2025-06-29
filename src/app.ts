
import express,{Application, Request, Response} from "express"
import { bookRouter } from "./app/controllers/bookController";
import { errorHandler } from "./app/ErrorMiddleware/errorHandle";
import { borrowRouter } from "./app/controllers/borrowController";

const app: Application = express();

app.use(express.json())

app.use("/api/books", bookRouter)
app.use("/api/borrow", borrowRouter)


app.use(errorHandler);

app.get("/", (req: Request,res: Response)=>{
    res.send("welcome")
})
export default app;