import React, { useState } from 'react'

const AddNote = ({ addNote, showAlert }) => {

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        showAlert('Your Note has been Added Successfully', 'success', 'check-circle-fill');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }



    return (
        <div>
            <div className="container mt-5 mb-4">
                <div className='container pt-5 text-center'>
                    <h1 className='pb-1 px-5 pt-0 bg-black bg-opacity-25 rounded' id='heading'>Add Your Note</h1>
                </div>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control text-bg-dark" id="title" name="title" aria-describedby="titleHelp" value={note.title} onChange={onChange} minLength={3} required />
                        <div id="titleHelp" className="form-text text-white text-opacity-75">Add a good title to your Note.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea rows={5} className="form-control text-bg-dark" id="description" name="description" aria-describedby="desHelp" value={note.description} onChange={onChange} minLength={5} required />
                        <div id="desHelp" className="form-text text-white text-opacity-75">Add a good description to your Note.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control text-bg-dark" id="tag" name="tag" aria-describedby="tagHELP" value={note.tag} onChange={onChange} />
                        <div id="tagHELP" className="form-text text-white text-opacity-75">Add a tag to your Note.</div>
                    </div>
                    <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary px-4 py-1" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
