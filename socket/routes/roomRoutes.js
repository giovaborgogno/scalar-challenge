const express = require("express");

const router = express.Router();

const ROOMS = [
  {
    title: "Last Premiere's Chat",
    id: "1",
  },
];

router.get("/", (req, res) => {
  res.json(ROOMS);
});

module.exports = router;
