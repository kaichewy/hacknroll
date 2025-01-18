import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { RouteController } from "./controllers/route-controller";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})

app.post("/route", RouteController.getRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})