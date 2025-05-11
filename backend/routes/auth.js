const express = require("express");
const router = express.Router();
const getDb = require("../db/db");

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const db = await getDb();
        const existingUser = await db.collection("epicUsers").findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const result = await db.collection("epicUsers").insertOne({ name, email, password, admin: false });

        res.status(201).json({
            user: {
                id: result.insertedId,
                name,
                email,
                admin: false,
            },
        });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });

    try {
        const db = await getDb();
        const user = await db.collection("epicUsers").findOne({ email, password });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                admin: user.admin,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
