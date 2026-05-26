const projectRoutes = require("express").Router();
const Project = require("../../model/Project");

const { authMiddleware } = require("../../utils/auth");


projectRoutes.use(authMiddleware);
//POST 
projectRoutes.post("/projects", async (req, res) => {
    try {
        console.log("Project routes has been called", req.body);
        const project = await Project.create(
            {
                ...req.body,
                user: req.user._id

            });
        res.status(201).json({
            message: "Project added Successfully",
            project: project,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Failed to Add project",
            error: error.message
        })
    }

});
// Get all projectes owned by the user which currently logged-in
projectRoutes.get("/projects", async (req, res) => {
    try {
        console.log("get request")
        const projects = await Project.find({ user: req.user._id });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//Get a single project by ID, owned by the user which currently logged-in
projectRoutes.get("/projects/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        res.json(project);
    } catch (error) {
        res.status(500).json({ error });
    }

});
//update single project by Id, owned by the user
projectRoutes.put("/projects/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: `No Project found with this project id: ${projectId}` });
        }
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "User is not authorized to update this project." });
        }
        const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true, });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//delete a single project by ID ,owned by the user
projectRoutes.delete("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: `No project found with this project id ${req.params.id}` });
        }
        if(project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "User is not authorized to delete this project"});
        }
        await Project.findByIdAndDelete(req.params.id);
        res.json({message: "Project deleted Successfully"});
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = projectRoutes;