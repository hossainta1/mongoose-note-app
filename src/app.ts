import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["Personal", "Work", "Others"],
    default: "Personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongooes",
  });
  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Create Successfully",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Note app");
});

export default app;
