const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const getDb = require("../db/db");

router.get("/", async (req, res) => {
    try {
        const db = await getDb();
        const posts = await db.collection("epicPosts").find().sort({ date: -1 }).toArray();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", async (req, res) => {
    const { title, author, content, date } = req.body;
    if (!title || !author || !content || !date) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const db = await getDb();
        const result = await db.collection("epicPosts").insertOne({ title, author, content, date });
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection("epicPosts").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ deleted: result.deletedCount });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
