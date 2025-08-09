// // Using Express
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // create an instance of express
// const app = express();
// app.use(express.json());
// app.use(cors());

// // connecting mongodb
// mongoose.connect('mongodb://localhost:27017/todo')
//     .then(() => {
//         console.log('DB Connected!');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// // creating schema
// const todoSchema = new mongoose.Schema({
//     title: {
//         required: true,
//         type: String
//     },
//     description: String,
//     completed: {
//         type: Boolean,
//         default: false
//     }
// });

// // creating model
// const todoModel = mongoose.model('Todo', todoSchema);

// // Create new todo
// app.post('/todos', async (req, res) => {
//     const { title, description, completed } = req.body;
//     try {
//         const newTodo = new todoModel({
//             title,
//             description,
//             completed: completed || false
//         });
//         await newTodo.save();
//         res.status(201).json(newTodo);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Get all items
// app.get('/todos', async (req, res) => {
//     try {
//         const todos = await todoModel.find();
//         res.json(todos);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Update a todo item
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { title, description, completed } = req.body;
//         const id = req.params.id;

//         // Build update object dynamically so we can update only provided fields
//         const updateFields = {};
//         if (title !== undefined) updateFields.title = title;
//         if (description !== undefined) updateFields.description = description;
//         if (completed !== undefined) updateFields.completed = completed;

//         const updatedTodo = await todoModel.findByIdAndUpdate(
//             id,
//             updateFields,
//             { new: true }
//         );

//         if (!updatedTodo) {
//             return res.status(404).json({ message: "Todo not found" });
//         }
//         res.json(updatedTodo);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete a todo item
// app.delete('/todos/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         await todoModel.findByIdAndDelete(id);
//         res.status(204).end();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// // Start the server
// const port = 8000;
// app.listen(port, () => {
//     console.log("Server is listening to port " + port);
// });

// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config(); // load .env in local dev

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Use MONGO_URI from env (Atlas) or fallback to local
// const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todo';

// mongoose.connect(mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('DB Connected!'))
// .catch((err) => console.log('DB connection error:', err));

// const todoSchema = new mongoose.Schema({
//     title: { required: true, type: String },
//     description: String,
//     completed: { type: Boolean, default: false }
// });

// const todoModel = mongoose.model('Todo', todoSchema);

// app.post('/todos', async (req, res) => {
//     const { title, description, completed } = req.body;
//     try {
//         const newTodo = new todoModel({ title, description, completed: completed || false });
//         await newTodo.save();
//         res.status(201).json(newTodo);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get('/todos', async (req, res) => {
//     try {
//         const todos = await todoModel.find();
//         res.json(todos);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// app.put('/todos/:id', async (req, res) => {
//     try {
//         const { title, description, completed } = req.body;
//         const id = req.params.id;
//         const updateFields = {};
//         if (title !== undefined) updateFields.title = title;
//         if (description !== undefined) updateFields.description = description;
//         if (completed !== undefined) updateFields.completed = completed;

//         const updatedTodo = await todoModel.findByIdAndUpdate(id, updateFields, { new: true });
//         if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
//         res.json(updatedTodo);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// app.delete('/todos/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         await todoModel.findByIdAndDelete(id);
//         res.status(204).end();
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));




// Using Express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

// create an instance of express
const app = express();
app.use(express.json());
app.use(cors());

// connecting to MongoDB Atlas using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
  })
  .catch((err) => {
    console.error(' MongoDB Connection Error:', err);
  });

// creating schema
const todoSchema = new mongoose.Schema({
  title: { required: true, type: String },
  description: String,
  completed: { type: Boolean, default: false }
});

// creating model
const todoModel = mongoose.model('Todo', todoSchema);

// POST - create todo
app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET - get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// PUT - update todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE - remove todo
app.delete('/todos/:id', async (req, res) => {
  try {
    await todoModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// start the server
const port = process.env.PORT || 8000;
app.listen(port, '0.0.0.0', () => {
    console.log("Server is listening on port " + port);
});
