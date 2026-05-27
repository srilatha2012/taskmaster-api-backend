const taskRoutes = require("express").Router();
const { Task, Project, User } = require("../../model");

const { authMiddleware } = require("../../utils/auth");

taskRoutes.use(authMiddleware)
//Create task for a Project- POST
taskRoutes.post("/api/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id
    });
    if (!project) {
      return res.status(403).json({ message: "Not authorized for this project" });
    }
    const task = await Task.create({
      ...req.body,
      project: req.params.projectId,
    })
    res.status(201).json(task);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

//Get all tasks for a project
taskRoutes.get("/api/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id
    });
    if (!project) {
      return res.status(403).json({ message: "Not authorized for this project" });
    }
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update task
taskRoutes.put("/tasks/:taskId", async (req, res) => {
  try {
    const { _id, project, ...updateData } = req.body;
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    const proj = await Project.findOne({
      _id: task.project,
      user: req.user._id
    });

    if (!proj) {
      return res.status(403).json({ message: "Not authorized for this project" });
    }
    console.log("authorized user",  req.params.taskId);
    console.log("authorized user",  req.body);
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      updateData,
      { new: true, runValidators: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = taskRoutes;