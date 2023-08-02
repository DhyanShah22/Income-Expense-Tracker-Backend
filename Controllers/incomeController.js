const { default : mongoose} = require('mongoose')

const Income = require('../Models/incomeSchema')

const getIncome = async (req,res) => {
    const income = await Income.find({}).sort({ createdAt: -1})

    res.status(200).json(income)
}

const getSingleIncome = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const income = await Income.findById(id)

    if(!income) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(income)
}

const addIncome = async (req,res) => {
    const {title, amount, type, date, category,description} = req.body 

    try {
        const income = await Income.create({title, type, amount,date, description, category })
        res.status(200).json(income)
    }
    catch(error) {
        return res.status(200).json({error: 'Unable to add the expense'})
    }
}

const updateIncome= async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const income = await Income.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true
    })

    if(!income) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(income)
}

const deleteIncome = async (req,res) => {
    const { id } = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Not a valid DB id.'})
    }

    const income = await Income.findOneAndDelete({_id: id})

    if(!income) {
        return res.status(400).json({error: 'Unable to find the expense.'})
    }

    res.status(200).json(income)
}

module.exports ={
    getIncome,
    getSingleIncome,
    addIncome,
    updateIncome,
    deleteIncome
}