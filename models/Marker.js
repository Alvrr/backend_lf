const mongoose = require("mongoose");

const MarkerSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    category: {
      type: String,
      enum: ["makanan", "minuman", "kecelakaan", "favorit", "lainnya"],
      default: "lainnya",
    },
    note: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Marker", MarkerSchema);