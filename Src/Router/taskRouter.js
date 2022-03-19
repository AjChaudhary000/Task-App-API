const express = require('express');
const auth = require('../MiddleWare/auth');
const Task = require('../Model/TaskModel');
const router = new express.Router();
router.post('/task', auth, async (req, res) => {
    try {
        const TaskData = new Task({ ...req.body, owner: req.user._id });
        const task = await TaskData.save()
        if (!task) return res.status(404).send("Not Add a Task ");
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})
router.get('/task', auth, async (req, res) => {
    const match = {};
    if (req.query.desc) match.desc = { $regex: req.query.desc }

    try {
        await req.user.populate({
            path: 'tasks', match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: -1
                }
            }
        });
        console.log(req.user)
        res.send(req.user.tasks)
    } catch (e) {
        res.status(400).send(e);
    }
})
router.get('/task/:id', auth, (req, res) => {
    const _id = req.params.id
    Task.findOne({ _id, owner: req.user._id }).then((task) => {
        if (!task) return res.status(404).send("Task Data Not Found ..");
        res.json(task)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
router.patch('/task/:id', auth, async (req, res) => {
    const update = Object.keys(req.body);
    const validdata = ['desc', 'completed'];
    const validAction = update.every(updates => validdata.includes(updates));
    if (!validAction) return res.status(400).send("Task Invalid Fil not Allow ")
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, req.body, { new: true, runValidators: true })
        if (!task) return res.status(404).send("data not found ")
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) return res.status(404).send("data not found ")
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router;