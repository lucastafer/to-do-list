const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklists/index', {checklists: checklists})
    }catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas.'})
    }
})

router.post('/', async (req,res) => {
    let name = req.body
    try{
        let checklists = await Checklist.create({name})
        res.status(200).json(checklists)
    }catch (error) {
        res.status(422).json(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/show', {checklist: checklist})
    }catch (error) {
        res.status(422).render('pages/error', {error: 'Erro ao exibir as listas de tarefas.'})
    }
})

router.put('/:id', async (req, res) => {
    let {name} = req.body

    try {
        let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true})
        res.status(200).json(checklist)
    }catch (error) {
        res.status(422).json(error)
    }
})

router.delete('/:id', async (req, res) => {
    let {name} = req.body
    
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).json(checklist)
    }catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router

/*const log = (req, res, next) => {
    console.log(req.body)
    console.log(`Data: ${Date.now()}`)
    next()
}

app.use(log)

app.get('/', (req, res) => {
    res.send('<h1>Minha lista de tarefas.</h1>')
})

app.get('/json', (req, res) => {
    res.json({title:'Tarefa X', done: true})
})*/