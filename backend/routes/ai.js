const express = require('express');
const router = express.Router();
const { aiExplain } = require('../controllers/aiController');

// const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.post('/ask', aiExplain);

module.exports = router;