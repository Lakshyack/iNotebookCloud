const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Fetch all the notes Get "/api/auth/getuser". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Route 2: Add a new notes using post "/api/auth/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title!").isLength({ min: 3 }),
    body(
      "description",
      "description must contain at least 5 characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are errors , return and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const sevedNode = await notes.save();
      res.json(sevedNode);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// Route 3: Update a new notes using put "/api/auth/updatenote". Login required
router.put(
    "/updatenote/:id",
    fetchUser,
    async (req, res) => {
      try {
        const { title, description, tag } = req.body;
        //Create a newNote , return and the errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
        // }
        const newNote = {};
        if(title){newNote.title = title}
        if(title){newNote.description = description}
        if(title){newNote.tag = tag}

        // const sevedNode = await notes.save();
        //Find the note to update and update it
              
        let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not found")}
if(note.user.toString() !== req.user.id){
    return res.status(401).send("not allowed");
}
   note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})

        res.json(note);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
      }
    }
  );

  // Route 4: Delete a notes using put "/api/auth/deletenote". Login required
router.delete(
  "/deletenote/:id",
  fetchUser,
  async (req, res) => {
    try {

      // const { title, description, tag } = req.body;
      //Create a newNote , return and the errors
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }
     
      // const sevedNode = await notes.save();

      //Find the note to delete and delete it
            
      let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not found")}

// allow deletion only if user owns this note
if(note.user.toString() !== req.user.id){
  return res.status(401).send("not allowed");
}
 note = await Notes.findByIdAndDelete(req.params.id)

      res.json({"Success" : "Note has been deleted"});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
