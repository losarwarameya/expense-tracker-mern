const express = require('express');
const Entries = require('../db/db.js').Entries;

const entriesRouter = express.Router();

entriesRouter.get('/entries', async (req,res) => {
    try {
        const {userId} = req.query;
        // const userId = localStorage.getItem("userId");
        const entriesData = await Entries.find({userId});
        console.log(req.body);
        // const entriesData = await Entries.find();
        res.json(entriesData);
    } catch (error) {
        console.error(error);
    }
})

const validateEntry = (req,res,next) => {
    const {heading,type,amount,userId} = req.body;
    if(heading == null || type == null || amount == null || userId == null){
        return res.status(400).send('Required field missing');
    }
    next();
}

entriesRouter.post('/add-entry', validateEntry,async (req,res) => {
    try {
        const newEntry = new Entries(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

entriesRouter.put('/update-entry/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const { heading, type, amount, description } = req.body; // replace these with the actual fields you want to update
        const updatedEntry = await Entries.findByIdAndUpdate(id, { heading, type, amount, description }, { new: true });
        if (!updatedEntry) {
            return res.status(404).send('Entry not found');
        }
        res.json(updatedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

entriesRouter.delete('/delete-entry/:id',async (req,res) => {
    try {
        const {id} = req.params;
        const deletedEntry = await Entries.findByIdAndDelete(id);
        res.status(201).json(deletedEntry);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

module.exports = entriesRouter;