


    const express = require('express');
    const router = express.Router();
    const fetchuser = require('../middleware/fetchuser');
    const Note = require('../models/Note');
    const { body, validationResult } = require('express-validator');
    
    // ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
    router.get('/fetchallnotes', fetchuser, async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
    // ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
    router.post('/addnote', fetchuser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
            try {
                const { title, description, tag } = req.body;
    
                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const note = new Note({
                    title, description, tag, user: req.user.id
                })
                const savedNote = await note.save()
    
                res.json(savedNote)
    
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
        })
    
    // ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
    router.put('/updatenote/:id', fetchuser, async (req, res) => {
        const { title, description, tag } = req.body;
        try {
            // Create a newNote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };
    
            // Find the note to be updated and update it
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
    
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
    // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
    router.delete('/deletenote/:id', fetchuser, async (req, res) => {
        try {
            // Find the note to be delete and delete it
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") }
    
            // Allow deletion only if user owns this Note
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }
    
            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: note });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    module.exports = router



// // Isme jitne bhi Notes related  END POINTS likhne hai wo sb yaha likege is folder me
// // phle express ko import krlo 

// const express = require('express');
// const router = express.Router(); // ab router ko use kr skte ho 
// var fetchuser = require('../Middleware/fetchuser'); // fetchuser middleware ka use krege hum notes ke liye
// const Note = require('../models/Note');
// const { body, validationResult } = require('express-validator');



// // ab hum yaha par API ka response dege ki user ko response me kya de 

// //   ROUTE-1   Get all the notes  using: GET request "/api/notes/getuser" .... logedin required 

// router.get('/fetchallnotes', fetchuser, async (req, res) => {

//     try {


//         const notes = await Note.find({ user: req.user.id }); // saare ke saare notes find kr lege or middleware ki bajah se hum use: req.user.id use kia hai

//         res.json(notes); // response dene ke liye json formate me hum use krte hai res.json()

//     } catch (error) {

//         console.error(error.message);
//         res.status(400).json({ error: 'Internal Server Error Occured' });

//     }
// })


// // *************************************************************************************************************

// //   ROUTE-2    Add Notes  using: POST request "/api/notes/addnotes" .... logedin required 

// router.post('/addnote', fetchuser, [

//     body('title', 'Enter the valid title').isLength({ min: 3 }),
//     body('description', 'Description is too short').isLength({ min: 5 }),
// ], async (req, res) => {

//     try {


//         const errors = validationResult(req);
//         if (!errors.isEmpty) {
//             return res.status(500).json({ errors: errors.array() });

//         }

//         // agar upper waali errors nhi aaati hai to notes add krna ab
//         const { title, description, tag } = req.body; // ye sb destructuring krna hai req.body se
//         const note = new Note({
//             title, description, tag, user: req.user.id
//         })
//         const saveNote = await note.save()

//         res.json(saveNote); // response dene ke liye json formate me hum use krte hai res.json()
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ error: 'Internal Server Error Occured' })

//     }
// })


// // ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
// router.put('/updatenote/:id', fetchuser, async (req, res) => {
//     const {title, description, tag} = req.body;
//     // Create a newNote object
//     const newNote  = {};
//     if(title){newNote.title = title};
//     if(description){newNote.description = description};
//     if(tag){newNote.tag = tag};
    
//         // Find the note to be updated and update it
//         let note = await Note.findById(req.params.id);
//         if(!note){return res.status(404).send("Not Found")}
        
//         if(note.user.toString() !== req.user.id){
//             return res.status(401).send("Not Allowed");
//         }
        
//         note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
//         res.json({note});
        
//     })
    
 
//     module.exports = router;

    // *************************************************************************************************************
    
    //   ROUTE-3     Update(Delete,add,) an existing   Notes  using: POST request "/api/notes/updatenotes" .... logedin required 
    
    // router.put('./updatenote/:id', fetchuser, async (req, res)=>{    // update ke sath me note ki ID id bhi lege ,  jo logged in hai wahi log 
    //     // bas upadate kr paye notes ko or sirf apne hi notes update ke paaye bas 
    
    // const {title, description,tag}= req.body;
    
    // // create a new empty  object in which you store the updated  newnote
    // const newNote= {};
    // if (title) {
    //     newNote.title =title;
    // }
    // if (description) {
    //     newNote.description =description;
    // } 
    // if (tag) {
    //     newNote.tag =tag;
    // }
    
    // //  Us note ko find karo jisko aap update krna chahte ho or usko phir update krdo 
    
    // let note = await Note.findById(req.params.id); // ye line no 72 me jo id hai wo lega means jo id aap update krna chahate hai 
    // if (!note) { // maanlo agar ye note exist hi nahi krta hai to if not of note
    
    //      return res.status(404).send("Not found ")
    // }
    // if (note.user.toString()!==req.user.id) { // note.user.toString() ye dega is note ki ID  or agar ye Note ki ID  us user ki ID match nhi 
    //     // krta hai to koi unknown user use use krne ki koshis kr rha hai 
    //      return res.status(401).send("You can not change the another user's notes ")
    // }
    
    // // agar  user sahi hai or upper waali error nhia aai to  to phir aap update krne ke liye allow krdo use 
    
    // note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})  // {new: true} it means agar koi naya koi contact ata hai to wo creaate ho jayega  {} it means ye objects hai 
    // // line 103 se note apka update ho jayega 
    
    // res.json({note});
    
    
    // })