const mongoose = require("mongoose");

const topPlayerSchema = new mongoose.Schema({
  id: String,
  username: String,
  perfs: {
    classical: {
      rating: Number,
      progress: Number,
    },
  },
  classicalChess: [
    {
      year: Number,
      month: Number,
      day: Number,
      rating: Number,
    },
  ],
});

const TopPlayer = mongoose.model("TopPlayer", topPlayerSchema);

module.exports = TopPlayer;
