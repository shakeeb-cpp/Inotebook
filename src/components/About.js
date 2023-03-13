// import React, { useContext, useEffect } from 'react'
// import noteContext from '../context/notes/NoteContext'

const About = () => {


    return (
        <div className="mt-5">
            <div className='container pt-5 text-center'>
                <h1 className='pb-1 px-5 pt-0 bg-black bg-opacity-25 rounded' id='heading'>About us</h1>
            </div>
            <div className="container mt-4 text-center">
                <h3 className="fs-2 ">iNotebook</h3>
                <p className="px-sm-5 px-2 lead text-white text-opacity-75">iNotebook is a platform which allow you to add your Notes on cloud . Its store your notes secure on cloud , so lets try iNotebook to make your thoughts more secure.</p>
            </div>
            <div className="container mt-4  d-flex align-items-center">
                <img className='me-3 ' src="https://cdn-icons-png.flaticon.com/256/8289/8289825.png" height={80} alt="..." />
                <h5 className='my-auto'>&#10009; Write Your Notes</h5>
            </div>
            <div className="container mt-4  d-flex align-items-center">
                <img className='me-3 ' src="https://cdn-icons-png.flaticon.com/256/7457/7457418.png" height={85} alt="..." />
                <h5 className='my-auto'>&#10009; Store Your Notes</h5>
            </div>
            <div className="container mt-4  d-flex align-items-center">
                <img className='me-3 ' src="https://cdn-icons-png.flaticon.com/256/9627/9627252.png" height={74} alt="..." />
                <h5 className='my-auto'>&#10009; Secure Your Notes</h5>
            </div>
        </div>
    )
}

export default About
