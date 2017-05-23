const express = require('express');
const api = require('../controllers/bookController')
const router = express.Router()

router.get('/', api.getAllBooks)
router.post('/', api.insertBook)
router.put('/:id', api.updateBook)
router.delete('/:id', api.deleteBook)

module.exports = router
