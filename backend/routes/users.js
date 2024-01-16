const express = require('express');
const router = express.Router();
const { createUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        deleteUsers,
        signup,
        login } = require('../controllers/userController');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser );

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.delete('/', deleteUsers);

router.post('/signup', signup);

router.post('/login', login);

module.exports = router;