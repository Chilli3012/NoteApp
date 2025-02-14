const express = require("express");
const router = express.Router();
const { addNote, getAllNotes, updateNote, deleteNote, searchNotes, updateNotePinned, filterNotes } = require("../controllers/note.controller");
const { authenticateToken } = require("../middleware/auth.middleware");
// const { searchNotes, updateNotePinned } = require("../controllers/note.controller");

router.post("/add-note", authenticateToken, addNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.put("/edit-note/:noteId", authenticateToken, updateNote);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.get("/search-notes", authenticateToken, searchNotes);
router.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned);
router.get("/filter-notes", authenticateToken, filterNotes);

module.exports = router;
