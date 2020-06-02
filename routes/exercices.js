const router = require('express').Router()
let Exercice = require('../models/exercice.model')

// Get exercices
router.route('/').get((req, res) => {
    Exercice.find()
        .then(exercices => res.json(exercices))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Adding new exercice
router.route('/add').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = req.body.duration
    const date = Date.parse(req.body.date)

    const newExercice = new Exercice({
        username, description, duration, date
    })

    newExercice.save()
        .then(() => res.json('Exercice added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Udpating an exercice
router.route('/update/:id').put((req, res) => {
    Exercice.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
        .then(() => res.json('Exercice updated'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// Deleting an exercice
router.route('/delete/:id').delete((req, res) => {
    Exercice.findOneAndRemove({ _id: req.params.id })
        .then(() => res.json('Exercice deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;