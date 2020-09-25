const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tvfavoriteSchema = mongoose.Schema(
  {
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tvId: {
      type: String,
    },
    tvTitle: {
      type: String,
    },
    tvPost: {
      type: String,
    },
    tvRunTime: {
      type: [String],
    },
  },
  { timestamps: true }
);

const TvFavorite = mongoose.model("TvFavorite", tvfavoriteSchema);

module.exports = { TvFavorite };
