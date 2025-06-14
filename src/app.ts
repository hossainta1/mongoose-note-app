import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongooes",
    content: "I am Learning Mongooes last Two days"
  })
  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Create Successfully",
    note: myNote

  })
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Note app");
});

export default app;
