const taskRoutes = require("express").Router();
const { Task, Project, User } = require("../../model");

const { authMiddleware } = require("../../utils/auth");

taskRoutes.use(authMiddleware)
//Create task - POST
taskRoutes.post("/api/projects/:projectId/tasks", async (req, res) => {
  try {
    console.log("parama", req.params.projectId);
    console.log("userid", req.user._id);
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


taskRoutes.put("/:taskId", async (req, res) => {

})


module.exports = taskRoutes;