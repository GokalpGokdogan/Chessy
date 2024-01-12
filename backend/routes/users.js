const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({message: 'Hello from users route!'});
});

router.get('/:id', (req, res) => {
    res.json({message: `Hello from user ${req.params.id}`});
});

router.post('/', (req, res) => {
  res.json({message: 'Added users!'});
});

router.delete('/:id', (req, res) => {
    res.json({message: `Deleted user ${req.params.id}!`});
});

router.patch('/:id', (req, res) => {
    res.json({message: 'Updated users!'});
});

module.exports = router;