import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NoteInput.css'
import Ribbon from './Ribbon';

export default function NoteInput () {
    const location = useLocation();
    const editableRef = useRef(null);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [noteId, setNoteId] = useState(null);
    const [title, setTitle] = useState('Note');
    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    setNoteId(id);

    if (id) {
      fetch(`http://localhost:5000/api/notes/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && editableRef.current) {
         editableRef.current.innerHTML = data.content;
         setTitle(data.title || 'Note'); // set the title from DB
        }
        })
        .catch(err => console.error('Failed to load note:', err));
    }
    }, [location]);

    const SaveNote = async () => {
    const value = editableRef.current.innerHTML;
    if (value.trim() === '') return;

    const payload = {
      title: title.trim() || 'Note', // You can enhance this later
      content: value,
    };

    const url = noteId
      ? `http://localhost:5000/api/notes/${noteId}`
      : `http://localhost:5000/api/notes`;

    const method = noteId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('Note saved:', data);
      setShowSavedMessage(true);

      setTimeout(() => setShowSavedMessage(false), 2000);
    } catch (error) {
      console.error('Error saving note:', error);
    }
    };

    return(
        <div className='Note-Container'>
            <Ribbon gotoSave={SaveNote} editorRef={editableRef} />
            {showSavedMessage && <p className="saved-message">Saved!</p>}
            <input
              className="note-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title >_<"
            />
            <div
                ref={editableRef} contentEditable
                data-placeholder="Enter your text here ^_^"
                className="NoteInput"
                suppressContentEditableWarning={true}
            />
        </div>
    );
  }