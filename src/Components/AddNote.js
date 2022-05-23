import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault(); // taaki page reload na ho
        addNote(note.title, note.description, note.tag);
       
        setNote({title: "", description: "", tag: ""});  //  Ek baar note add krlo to usee khali  ho jaana chahiye wo fill hi na rhe to uske liye 
        props.showAlert("Added Successfully", "success");

   
    }


    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value}) // jo last me values liki hai bas ounhi ko update ya change kro  
    }
    return (
        <div className="container my-3 xyz">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                 
                <button type="submit" className="btn btn-warning" onClick={handleClick}>Add</button>
            </form>
        </div>
    )
}

export default AddNote;



















