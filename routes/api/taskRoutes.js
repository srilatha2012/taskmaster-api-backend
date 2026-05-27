const taskRoutes = require("express").Router();
const { Task, Project, User } = require("../../model");

const { authMiddleware } = require("../../utils/auth");

taskRoutes.use(authMiddleware)
//Create task - POST
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

//Get all tasks based on project id
taskRoutes.get("/api/projects/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user._id
    });
    if(!project) {
      return res.status(403).json({message: "Not authorized for this project"});
    }
    const tasks = await Task.find({project: req.params.projectId});
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = taskRoutes;