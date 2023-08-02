const express = require('express')

const {
    getExpense,
    singleExpense,
    addExpense,
    updateExpense,
    deleteExpense
} = require('../Controllers/expense.controller')
const router = express.Router()

router.get('/', getExpense)

router.get('/:id', singleExpense)

router.post('/', addExpense)

router.patch('/:id', updateExpense)

router.delete('/:id', deleteExpense)

module.exports = router