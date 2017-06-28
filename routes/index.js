const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const gameController = require('../controllers/gameController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.get('/', catchErrors(gameController.getGames));
router.get('/games', catchErrors(gameController.getGames));
router.get('/games/page/:page', catchErrors(gameController.getGames));
router.get('/add', authController.isLoggedIn, gameController.addGame);

router.post('/add',
  catchErrors(gameController.createGame)
);

router.post('/add/:id',
  catchErrors(gameController.updateGame)
);

router.get('/game/:id/edit', catchErrors(gameController.editGame));
router.get('/game/:id', catchErrors(gameController.getGame));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. register the user
// 3. we need to log them in
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);


module.exports = router;