const Note = require("../models/note.model");

const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({ error: true, message: "Title and content are required" });
  }

  const note = new Note({ title, content, tags: tags || [], userId: user._id });
  await note.save();

  res.json({ error: false, note, message: "Note added successfully" });
};

const getAllNotes = async (req, res) => {
  const { user } = req.user;

  const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
  res.json({ error: false, notes, message: "Notes retrieved successfully" });
};

const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) {
    return res.status(404).json({ error: true, message: "Note not found" });
  }

  if (title) note.title = title;
  if (content) note.content = content;
  if (tags) note.tags = tags;
  if (isPinned !== undefined) note.isPinned = isPinned;

  await note.save();
  res.json({ error: false, note, message: "Note updated successfully" });
};

const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;

  const note = await Note.findOne({ _id: noteId, userId: user._id });
  if (!note) {
    return res.status(404).json({ error: true, message: "Note not found" });
  }

  await Note.deleteOne({ _id: noteId, userId: user._id });
  res.json({ error: false, message: "Note deleted successfully" });
};


const searchNotes = async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res
            .status(400)
            .json({ error: true, message: "Search query is required!" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the query found!",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};


// Update Note Pinned Status
const updateNotePinned = async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    if (typeof isPinned !== "boolean") {
        return res
            .status(400)
            .json({ error: true, message: "isPinned value must be a boolean!" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note pinned status updated successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
};

const filterNotes = async (req, res) => {
  const { user } = req.user; // Get the authenticated user
  const { tags } = req.query; // Retrieve tags from query parameters

  if (!tags || tags.length === 0) {
    return res.status(400).json({ error: true, message: "Tags are required for filtering!" });
  }

  try {
    // Parse the tags into an array if they are passed as a single string
    const tagsArray = Array.isArray(tags) ? tags : tags.split(",");

    // Find notes where tags match any of the provided tags
    const filteredNotes = await Note.find({
      userId: user._id,
      tags: { $in: tagsArray }, // MongoDB query to match any tags
    });

    return res.json({
      error: false,
      notes: filteredNotes,
      message: "Filtered notes retrieved successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};



module.exports = { addNote, getAllNotes, updateNote, deleteNote, searchNotes, updateNotePinned, filterNotes };
