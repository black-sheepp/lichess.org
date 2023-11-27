const router = require('express').Router();

const userController = require("../controller/user");
const lichessController = require("../controller/lichess");

const validToken = require('../config/jwtVerifyMiddleware')

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/logout', userController.logout);
router.get('/test', validToken.authenticateToken ,userController.test);
router.get('/fetch-leaderboard', validToken.authenticateToken , lichessController.saveTopPlayers);
router.get('/fetch-leaderboard-top-50', validToken.authenticateToken , lichessController.getTopFiftyPlayers);
router.get('/player/:username/rating-history', validToken.authenticateToken ,lichessController.getPlayerHistory)
router.get('/players/rating-history-csv', validToken.authenticateToken, lichessController.downloadCsvFile)

module.exports = router;
