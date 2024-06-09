import { Note } from "../model/index.js";

export const createNote = async (req, res) => {
    const { title, content, tag, user_id } = req.body;
    console.log("title: ", title, content, tag, user_id);
    try {
        const note = await Note.create({ title: title, content: content, tag: tag, user_id: user_id });
        return res.status(201).json({ message: "success", result: note });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getNotes = async (req, res) => {
    const userId = req.params.userId;
    try {
        const notes = await Note.findAll({ where: { user_id: userId } });
        return res.status(200).json({ notes });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findOne({ where: { id } });
        if (note) {
            return res.status(200).json({ note });
        }
        return res.status(404).send("Note not found");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { title, content, tag } = req.body;
    const { id } = req.params;
    try {
        const [updated] = await Note.update({ title, content, tag }, { where: { id } });
        if (updated) {
            const updatedNote = await Note.findOne({ where: { id } });
            return res.status(200).json({ note: updatedNote });
        }
        throw new Error("Note not found");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Note.destroy({ where: { id } });
        if (deleted) {
            return res.status(204).send("Note deleted");
        }
        throw new Error("Note not found");
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}