const express = require('express')
const {
    createUser,
    getUser,
    getBusinesses
} = require('../controllers/userController')

const router = express.Router()

router.post('/signup', createUser)

router.post('/login', getUser)

router.get('/get-all-businesses', getBusinesses)




module.exports = router
