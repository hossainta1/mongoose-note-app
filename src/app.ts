import express, { Application, Request, Response } from "express";
import { notesRoute } from "./app/controllers/notes.controller";
import { usersRoutes } from "./app/controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoute);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Note app");
});

export default app;
