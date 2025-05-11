const express = require("express");
const router = express.Router();
const getDb = require("../db/db");

const { ObjectId } = require("mongodb");

// USER CONTROL PANEL

router.get("/users", async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.collection("epicUsers").find().toArray();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection("epicUsers").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ success: result.deletedCount === 1 });
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

router.put("/users/:id", async (req, res) => {
    const { admin } = req.body;
    try {
        const db = await getDb();
        const result = await db.collection("epicUsers").updateOne({ _id: new ObjectId(req.params.id) }, { $set: { admin } });
        res.json({ success: result.modifiedCount === 1 });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Failed to update user" });
    }
});

// POST CONTROL PANEL

router.get("/posts", async (req, res) => {
    try {
        const db = await getDb();
        const posts = await db.collection("epicPosts").find().sort({ date: -1 }).toArray();
        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection("epicPosts").deleteOne({ _id: new ObjectId(req.params.id) });
        res.json({ success: result.deletedCount === 1 });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ error: "Failed to delete post" });
    }
});

module.exports = router;
