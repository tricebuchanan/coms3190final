const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/auth");
const travelRouter = require("./routes/travel");
const adminRouter = require("./routes/admin");
const postsRouter = require("./routes/posts");

app.use("/api/auth", authRouter);
app.use("/api/travel", travelRouter);
app.use("/api/admin", adminRouter);
app.use("/api/posts", postsRouter);



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    });
