const express = require('express');
const router = express.Router();
const { createUser,
        getUsers,
        getUser,
        deleteUser,
        updateUser,
        deleteUsers,
        register,
        login } = require('../controllers/userController');

//const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser );

router.delete('/:id', deleteUser);

router.patch('/:id', updateUser);

router.delete('/', deleteUsers);

router.post('/register', register);

router.post('/login', login);

module.exports = router;