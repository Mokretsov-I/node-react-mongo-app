const {Router} = require('express')
const ProjectModel = require('../models/Project')
const TaskModel = require('../models/Task')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try  {

        const {title, description, finelDate, repository} = req.body

        if(!title) {
            return res.status(500).json({message: 'Неверное название проекта'})
        }

        const project = new ProjectModel({
            title, description, finelDate, repository, owner: req.user.userId
        })

        await project.save()

        res.status(201).json({project})

    } catch(e) {
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try  {
        const projects = await ProjectModel.find({owner: req.user.userId})
        res.json({projects})
    } catch(e) {
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try  {
        const project = await ProjectModel.findById(req.params.id)
        const tasks = await TaskModel.find({task: req.params.id})
        res.json({project, tasks})
    } catch(e) {
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/:id/createTask', auth, async (req, res) => {
    try  {
        const {name, finelDate} = req.body

        if(!name) {
            return res.status(500).json({message: 'Неверное название задачи'})
        }

        const task = new TaskModel({
            name, finelDate, task: req.params.id
        })

        await task.save()

        res.status(201).json({task})
    } catch(e) {
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router