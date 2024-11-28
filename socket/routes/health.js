const express = require("express");
const fs = require('fs').promises;

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const version = await fs.readFile('VERSION', 'utf8');
        res.json({ version });
    }
    catch (error) {
        res.status(500).json({ error: "something went wrong" });
    }
});

module.exports = router;
