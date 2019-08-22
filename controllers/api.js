const router = require('express').Router();
const db = require('../models');

router.get('/favorites', (req, res) => {
  db.place.findAll()
    .then(results => {
      res.json(results);
    })
});

router.get('/favorites/:id', (req, res) => {
  db.place.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(results => {
      res.json(results);
    })
});

router.put('/favorites/:id', (req, res) => {
  db.place.update(
    { 
      city: req.body.city,
      state: req.body.state,
      lat: req.body.state,
      long: req.body.long
    },
    {
      where: { id: req.params.id }
    })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
    });
});


router.post('/favorites', (req, res) => {
  // res.send(req.body);
  db.place.create(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
    });
});

router.delete('/favorites/:id', (req, res) => {
  db.place.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((result) => {

      let resJson = {
        result: 'DELETED'
      }
      res.json(resJson);
    })
    .catch(err => {
      console.log(err)
    })
});

module.exports = router;