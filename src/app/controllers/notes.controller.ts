
import express, { Request, Response } from "express"
import { Note } from "../models/notes.model";

export const notesRoute =  express.Router();



notesRoute.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  // notesRoute.roch-1
  // const myNote = new Note({
  //   title: "Learning Mongooes",
  // });
  // await myNote.save();

  // notesRoute.roch-2

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Create Successfully",
    note,
  });
});

notesRoute.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Note Get Successfully",
    notes,
  });
});

notesRoute.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Get single Note Successfully",
    note,
  });
});



notesRoute.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true});

  res.status(201).json({
    success: true,
    message: " Note updated Successfully",
    note,
  });
});



notesRoute.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    success: true,
    message: " Note Delete Successfully",
    note,
  });
});