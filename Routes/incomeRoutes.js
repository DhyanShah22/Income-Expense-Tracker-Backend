const express = require('express')

const{
    getIncome,
    getSingleIncome,
    addIncome,
    updateIncome,
    deleteIncome
}= require('../Controllers/incomeController')

const router = express.Router()

router.get('/', getIncome)

router.get('/:id', getSingleIncome)

router.post('/', addIncome)

router.patch('/:id', updateIncome)

router.delete('/:id', deleteIncome)

module.exports = router