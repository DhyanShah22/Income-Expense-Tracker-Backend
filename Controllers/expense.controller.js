const { default : mongoose} = require('mongoose')

const Expense = require('../Models/expenseSch')

const getExpense = async (req,res) => {
    const expense = await Expense.find({}).sort({ createdAt: -1})

    res.status(200).json(expense)
}

const singleExpense = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const expense = await Expense.findById(id)

    if(!expense) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(expense)
}

const addExpense = async (req,res) => {
    const {title, amount, type, date, category,description} = req.body 

    try {
        const expense = await Expense.create({title, type, amount,date, description, category })
        res.status(200).json(expense)
    }
    catch(error) {
        return res.status(200).json({error: 'Unable to add the expense'})
    }
}

const updateExpense = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const expense = await Expense.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!expense) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(expense)
}

const deleteExpense = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const expense = await Expense.findOneAndDelete({_id: id})

    if(!expense) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(expense)
}

module.exports ={
    getExpense,
    singleExpense,
    addExpense,
    updateExpense,
    deleteExpense
}