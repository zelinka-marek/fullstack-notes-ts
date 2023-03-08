import axios from "axios";
import type { NewNote, Note } from "../types";

const baseUrl = "http://localhost:3001/notes";

export async function getAllNotes() {
  const response = await axios.get<Note[]>(baseUrl);

  return response.data;
}

export async function createNote(data: NewNote) {
  const response = await axios.post<Note>(baseUrl, data);

  return response.data;
}
