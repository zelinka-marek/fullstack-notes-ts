import { FormEvent, useEffect, useState } from "react";
import { createNote, getAllNotes } from "./services/note";
import type { Note } from "./types";

export function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getAllNotes().then(setNotes);
  }, []);

  const addNewNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = await createNote({ content: newNote });
    setNotes((notes) => notes.concat(note));
    setNewNote("");
  };

  return (
    <>
      <form onSubmit={addNewNote}>
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
