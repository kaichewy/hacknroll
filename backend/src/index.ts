import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})