import React from 'react'
// import Notes from './Notes'
import { Link } from 'react-router-dom';

const NoteItems = ({ note, deleteNote, updateNote, showAlert }) => {

    const capitalize = (word) => {
        const lower = word;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    // const id = note.tag;

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (searchTerm) {
    //         navigate(`search/${searchTerm}`);

    //         setSearchTerm('');
    //     }
    // }


    return (
        <div className="col">
            <div className="card border-0 text-bg-dark">
                <div className="card-header bg-transparent pb-0 border-0 d-flex justify-content-end">
                    <i className="fa-solid fa-pen-to-square mx-3 ms-4" onClick={() => { updateNote(note) }}></i>
                    <i className="fa-solid fa-trash-can" onClick={() => { deleteNote(note._id); showAlert('Deleted Successfully', 'success', 'check-circle-fill'); }}></i>
                    <i className="fa-light fa-face-pensive"></i>
                </div>
                <div className="card-body pt-0 p-2" id='card'>
                    <h5 className="card-title">{capitalize(note.title)}</h5>
                    <div className='overflow-y-auto my-2 rounded' id='des' style={{ height: '200px' }}>
                        <p className="card-text text-white text-opacity-75">{capitalize(note.description)}</p>
                    </div>
                    <Link to={`/tag/${note.tag}`} className='text-decoration-none'><p className="card-text text-info text-opacity-75" id='tag_id'>#{capitalize(note.tag)}</p></Link>

                </div>
                <div className="card-footer bg-transparent ps-2">
                    <small className="text-white-50">{note.date.toString()}</small>
                </div>
            </div>
        </div>





    )
}

export default NoteItems
