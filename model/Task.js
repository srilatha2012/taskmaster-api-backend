const mongoose = require("mongoose");

// Define task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "In Progress",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
});

// Create Task model with taskSchema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;