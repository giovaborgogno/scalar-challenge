const express = require("express");
const fs = require('fs').promises;

const router = express.Router();

router.get("/", async (req, res) => {
    const version = await fs.readFile('VERSION', 'utf8');
    res.json({ version });
});

module.exports = router;
