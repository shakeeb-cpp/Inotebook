
import React, { useContext } from 'react'
import NoteContext from "../context/notes/NoteContext";
import { useParams } from 'react-router-dom';

const Tag = () => {

    const context = useContext(NoteContext);
    const { notes } = context;

    const { id } = useParams();

    const capitalize = (word) => {
        const lower = word;
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }


    return (
        <div className='mt-5'>
            <div className='pt-5'>
                <h1 className='text-primary'>Tag : #{capitalize(id)}</h1>
            </div>
            <div className=' row row-cols-1 row-cols-md-3 mt-2 g-3 pb-5'>

                {notes.map((note, idx) => {
                    return (id !== note.tag ? null : (
                        <div key={idx} className="col" >
                            <div className="card border-0 text-bg-dark">
                                <div className="card-body p-2" id='card'>
                                    <h5 className="card-title mt-2">{capitalize(note.title)}</h5>
                                    <div className='overflow-y-auto my-2 rounded' id='des' style={{ height: '200px' }}>
                                        <p className="card-text text-white text-opacity-75">{capitalize(note.description)}</p>
                                    </div>
                                    <p className="card-text text-info text-opacity-75" id='tag_id'>#{capitalize(note.tag)}</p>
                                    <div className="card-footer bg-transparent mt-1 ps-2">
                                        <small className="text-white-50">{note.date.toString()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ));
                })}
            </div >
        </div >
    )
}





export default Tag
