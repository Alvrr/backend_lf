const express = require("express");
const Marker = require("../models/Marker");
const router = express.Router();

// CREATE (POST)
router.post("/", async (req, res) => {
  try {
    const marker = await Marker.create(req.body);
    res.json(marker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL (GET)
router.get("/", async (req, res) => {
  try {
    const markers = await Marker.find().sort({ createdAt: -1 });
    res.json(markers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE (PATCH)
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Marker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // hasil update dikembalikan
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    await Marker.findByIdAndDelete(req.params.id);
    res.json({ message: "Marker deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
