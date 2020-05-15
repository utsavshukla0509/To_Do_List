const router = require('express').Router();
let List = require('../models/list.model');

router.route('/').get((req, res) => {
  List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const topic = req.body.topic;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newList = new List({
    topic,
    description,
    date,
  });

  newList.save()
  .then(() => res.json('List added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  List.findById(req.params.id)
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  List.findByIdAndDelete(req.params.id)
    .then(() => res.json('List deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  List.findById(req.params.id)
    .then(list => {
      list.topic = req.body.topic;
      list.description = req.body.description;
      // exercise.duration = Number(req.body.duration);
      list.date = Date.parse(req.body.date);

      list.save()
        .then(() => res.json('List updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;