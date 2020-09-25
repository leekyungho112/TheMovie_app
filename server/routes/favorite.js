const express = require("express");
const router = express.Router();
const { Favorite } = require("../models/Favorite");
const { TvFavorite } = require("../models/TvFavorite");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
  //mongoDB에서 favorite숫자 가져오기
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 다음에 프론트에 다시 숫자정보를 보내주기
    res.status(200).json({ success: true, favoriteNumer: info.length });
  });
});

router.post("/favorited", (req, res) => {
  //내가 이영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

  //mongoDB에서 favorite숫자 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    // 다음에 프론트에 다시 숫자정보를 보내주기
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  //DB에 있는 정보를 지운다

  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);
  console.log(favorite);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

//=================================
//            tv Favorite
//=================================

router.post("/tvfavoriteNumber", (req, res) => {
  //mongoDB에서 favorite숫자 가져오기
  TvFavorite.find({ tvId: req.body.tvId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    // 다음에 프론트에 다시 숫자정보를 보내주기
    res.status(200).json({ success: true, favoriteNumer: info.length });
  });
});

router.post("/tvfavorited", (req, res) => {
  //내가 이영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

  //mongoDB에서 favorite숫자 가져오기
  TvFavorite.find({
    tvId: req.body.tvId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    // 다음에 프론트에 다시 숫자정보를 보내주기
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/tvremoveFromFavorite", (req, res) => {
  //DB에 있는 정보를 지운다

  TvFavorite.findOneAndDelete({
    tvId: req.body.tvId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

router.post("/tvaddToFavorite", (req, res) => {
  const tvfavorite = new TvFavorite(req.body);
  console.log(tvfavorite);
  tvfavorite.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, doc });
  });
});

// DB에 있는 영화 정보 가져오기
router.post("/getFavoredMovie", (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, favorites });
  });
});

router.post("/getFavoredTv", (req, res) => {
  TvFavorite.find({ userFrom: req.body.userFrom }).exec((err, favorite) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, favorite });
  });
});

router.post("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});

router.post("/removeFromFavorited", (req, res) => {
  TvFavorite.findOneAndDelete({
    tvId: req.body.tvId,
    userFrom: req.body.userFrom,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, result });
  });
});
module.exports = router;
