import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext";
import AddNote from './AddNote';
import NoteItems from './NoteItems';
import { useNavigate } from 'react-router-dom'

const Notes = ({ showAlert }) => {

    let navigate = useNavigate();

    const context = useContext(NoteContext);
    const { notes, getNotes, addNote, deleteNote, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });


    const refClose = useRef(null)


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)

        refClose.current.click()
        // addNote(note.title, note.description, note.tag)
        showAlert('Updated Successfully', 'success', 'check-circle-fill');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const ref = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    if (notes.length === 0) {
        return (
            <div className='container my-3'>
                <AddNote addNote={addNote} />
                <div className='container text-center mb-5'>
                    <h5 className='fw-normal text-info'>Sorry You Have No Notes To Display</h5>
                    <h6 className='mb-3 fw-normal text-danger'>Plz Add Your Notes !</h6>
                    <img src="https://cdn-icons-png.flaticon.com/128/5644/5644525.png" alt="..." style={{ width: '80px' }} />
                </div>
            </div>
        )
    }


    return (
        <>
            <AddNote addNote={addNote} showAlert={showAlert} />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-bg-dark">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control text-bg-dark" id="etitle" name="etitle" aria-describedby="titleHelp" onChange={onChange} value={note.etitle} minLength={5} required />
                                    <div id="titleHelp" className="form-text text-white text-opacity-75">Update your title.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea rows={3} className="form-control text-bg-dark" id="edescription" name="edescription" aria-describedby="desHelp" onChange={onChange} value={note.edescription} minLength={5} required />
                                    <div id="desHelp" className="form-text text-white text-opacity-75">Update your description.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control text-bg-dark" id="etag" name="etag" aria-describedby="tagHELP" onChange={onChange} value={note.etag} minLength={5} required />
                                    <div id="tagHELP" className="form-text text-white text-opacity-75">Update your tag.</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container mb-5 rounded-3 pt-4" style={{ backgroundColor: 'rgba(0, 0, 0, 12%)' }}>
                <div className='container text-center mb-5'>
                    <h1 className='pb-1 px-5 pt-0 bg-black bg-opacity-25 rounded' id='heading'>Your Notes</h1>
                </div>
                <div className="row row-cols-1 row-cols-md-3 mt-2 g-3 pb-5">
                    {notes.map((note, idx) => {
                        return (
                            <NoteItems key={idx} note={note} deleteNote={deleteNote} updateNote={updateNote} showAlert={showAlert} />
                        )
                    })}
                </div>

            </div>
        </>

    )
}

export default Notes
