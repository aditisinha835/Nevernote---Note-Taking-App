import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotesList.css'

export default function NotesList() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Error fetching notes:', err));
  }, []);

  const openNote = (id) => {
    navigate(`/?id=${id}`); // go back to editor, pass note ID in URL
  };

  const createNewNote = () => {
    navigate('/');
  }

  const handleDelete = async (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this note?');
  if (!confirmed) return;

  try {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setNotes(notes.filter((note) => note._id !== id));
    } else {
      console.error('Failed to delete note');
    }
  } catch (err) {
    console.error('Error deleting note:', err);
  }
};
  return (
    <div style={{ padding: '20px' }}>
      <div className="notes-header">
        <h2>Saved Notes</h2>
        <button className="new-note-btn" onClick={createNewNote}>📝 New Note</button>
      </div>

      {notes.length === 0 ? (
        <div className="no-notes-card">
          <p>No saved notes yet.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div className="note-card" key={note._id} onClick={() => openNote(note._id)}>
              <h3>{note.title}</h3><button className='delete-btn' onClick={(e)=> {e.stopPropagation(); handleDelete(note._id);}}>🗑️</button>
              <p className="note-snippet" dangerouslySetInnerHTML={{ __html: note.content.slice(0, 100) + '...' }} />
              <span className="note-date">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
