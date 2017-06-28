const mongoose = require('mongoose');
const Game = mongoose.model('game');
const User = mongoose.model('user');
const jimp = require('jimp');
const uuid = require('uuid');


exports.homePage = (req, res) => {
  res.render('index');
};

exports.addGame = (req, res) => {
  res.render('createGame', { title: 'Add Game' });
};


exports.createGame = async (req, res) => {
  req.body.author = req.user._id;
  const game = await (new Game(req.body)).save();
  req.flash('success', `Successfully Created ${game._id}.`);
  res.redirect(`/game/${game._id}`);
};

exports.getGame = async (req, res, next) => {
  const game = await Game.findOne({ _id: req.params.id });
  if (!game) return next();
  res.render('Game', { game, title: game._id });
};


exports.getGames = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 20;
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all games
  const gamePromise = Game
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Game.count();

  const [games, count] = await Promise.all([gamePromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!games.length && skip) {
    req.flash('info', `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    res.redirect(`/games/${pages}`);
    return;
  }

  res.render('games', { title: 'Games', games, page, pages, count });
};





exports.editGame = async (req, res) => {
  // 1. Find the game given the ID
  const game = await Game.findOne({ _id: req.params.id });
  // 2. confirm they have permission to edit
  // 3. Render out the edit form for the game
  res.render('editGame', { title: `Edit ${game._id}`, game });
};

exports.deleteGame = async (req, res) => {
  // 1. Find the game given the ID
  const game = await Game.findOne({ _id: req.params.id });
  // 2. confirm they have permission to edit
  //confirmOwner(store, req.user);
  // 3. Render out the edit form for the game
  res.render('editGame', { title: `Edit ${game._id}`, game });
};


exports.updateGame = async (req, res) => {
  // find and update the game
  const game = await Game.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new game data instead of the old
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${game.name}</strong>.`);
  //res.redirect(`/stores/${store._id}/edit`);
  // Redriect them the game page and tell them it worked
};






