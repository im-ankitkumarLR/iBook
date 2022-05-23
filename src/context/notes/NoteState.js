// Aisi States banayege isme jo sbke liye accesible hon

import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

     const host = "http://localhost:5000"
     const notesInitial = []

     const [notes, setNotes] = useState(notesInitial)



     // Get all Notes
     const getNotes = async () => {
          // API Call 
          const response = await fetch(`${host}/api/notes/fetchallnotes`, {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')     // token ko hard code na krke ham localstorage se leke aayege and line no
                    // 22 me login component me check krke dekho ki kya hum token ko save kr rhe hai ya nhi 
               }
          });
          const json = await response.json()
          setNotes(json)
     }







     // Add a Note 

     // let { note } = props;
     const addNote = async (title, description, tag) => {


          // API Call 
          const response = await fetch(`${host}/api/notes/addnote`, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
               body: JSON.stringify({ title, description, tag })
          });

          const note = await response.json();
          setNotes(notes.concat(note))   // notes aarary me  concat krdo  krodo or note ko or setNotes ko update krdo  












     }

     //  Delete a Note 
     const deleteNote = async (id) => {

          // TODO: API Call ---> mtlb ye ki hame backend me bhi jaake deleye krne hai notes frontend pr hi nhi backend ka kaam wwaki hai abhi
          // API Call
          const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
               method: 'DELETE',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               }
          });
          const json = response.json();
          console.log(json);

          const newNotes = notes.filter((note) => { return note._id !== id })
          setNotes(newNotes)


     }

     // Edit a Note
     const editNote = async (id, title, description, tag) => {
          // API Call   Fetch with header wesite se syntax dekh lena iska   
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
               },
               body: JSON.stringify({ title, description, tag })
          });
          const json = await response.json();
          console.log(json);
          
          // Logic to edit in client
          let newNotes = JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < newNotes.length; index++) {
               const element = newNotes[index];
               if (element._id === id) {
                    newNotes[index].title = title;
                    newNotes[index].description = description;
                    newNotes[index].tag = tag;
                    break;
               }
          }
          setNotes(newNotes);
     }



     return (
          <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>

               {props.children}
          </NoteContext.Provider>
     )

}
export default NoteState;
