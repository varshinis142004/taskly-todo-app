// Using Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create an instance of express
const app = express();
app.use(express.json());
app.use(cors());

// connecting mongodb
mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => {
        console.log('DB Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

// creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
});

// creating model
const todoModel = mongoose.model('Todo', todoSchema);

// Create new todo
app.post('/todos', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const newTodo = new todoModel({
            title,
            description,
            completed: completed || false
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Get all items
app.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Update a todo item
app.put("/todos/:id", async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const id = req.params.id;

        // Build update object dynamically so we can update only provided fields
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;

        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(updatedTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a todo item
app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const port = 8000;
app.listen(port, () => {
    console.log("Server is listening to port " + port);
});
