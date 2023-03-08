import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import type { Note } from "./types";

export function App() {
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "testing" }]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get<Note[]>("http://localhost:3001/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  const createNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await axios.post<Note>("http://localhost:3001/notes", {
      content: newNote,
    });
    setNotes((notes) => notes.concat(response.data));
    setNewNote("");
  };

  return (
    <>
      <form onSubmit={createNote}>
        <input
          type="text"
          required
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
          aria-label="New note"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </>
  );
}
