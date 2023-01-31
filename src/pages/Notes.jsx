import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";

import NoteItem from "../components/NoteItem";
import { useState } from "react";
import { useEffect } from "react";

// import dummyNote from "../dummy_note";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");

  const [filteredNotes, setTilteredNotes] = useState(notes);

  const handleSearch = () => {
    setTilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);
  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            autoFocus
            placeholder="Keyword..."
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && (
          <p className="empty__notes">Note not found...</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
        <Link to="/Create-note" className="btn add__btn">
          <BsPlusLg />
        </Link>
      </div>
    </section>
  );
};

export default Notes;
