
import express,{Application, Request, Response} from "express"
import { bookRouter } from "./app/controllers/bookController";
import { errorHandler } from "./app/ErrorMiddleware/errorHandle";
import { borrowRouter } from "./app/controllers/borrowController";
import cors from 'cors';

const app: Application = express();

app.use(express.json())

app.use(cors({
    origin: ["https://bookmanagementfrontend-orpin.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, 
 
}))
app.use("/api/books", bookRouter)
app.use("/api/borrow", borrowRouter)


app.use(errorHandler);

app.get("/", (req: Request,res: Response)=>{
    res.send("welcome")
})
export default app;