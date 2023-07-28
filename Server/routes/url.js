const express = require('express');
const router = express.Router();

const { handleGenerateNewShortURL, fetchRedirectURL, getTotalVisit } = require("../controllers/url");

router.post('/', handleGenerateNewShortURL);
router.get('/:shortId', fetchRedirectURL);
router.get('/analytic/:shortId', getTotalVisit);

module.exports = router;