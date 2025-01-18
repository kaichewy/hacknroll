import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// routes
app.get('/api/data', (req: Request, res: Response) => {
    const { name, email } = req.query;
    console.log(`Received (GET): Name - ${name}, Email - ${email}`);
    res.status(200).json({ message: `GET received: Hello ${name}` });
});

// POST route to receive data from the request body
app.post('/api/data', (req: Request, res: Response) => {
    const { name, email } = req.body;
    console.log(`Received (POST): Name - ${name}, Email - ${email}`);
    res.status(200).json({ message: `POST received: Hello ${name}` });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})