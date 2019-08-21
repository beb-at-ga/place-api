
const router = require('express').Router();
const app = express();
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({
  accessToken: process.env.ACCESS_TOKEN
});
const methodOverride = require('method-override');
const layouts = require('express-ejs-layouts');
const db = require('./models');


// display the city search view
router.get('/', (req, res) => {
  res.render('citySearch');
});

// search for a city
router.post('/search', (req, res) => {
  // res.send(req.body);
  geocodingClient.forwardGeocode({
    query: req.body.city + ', ' + req.body.state
  })
  .send()
  .then(response => {
    const match = response.body;
    console.log(match);
    // res.send(match.features[0].center);
    // res.send(match);
    res.render('searchResults', {
      lat: match.features[0].center[1],
      long: match.features[0].center[0],
      city: match.features[0].place_name.split(',')[0],
      state: match.features[0].place_name.split(',')[1]
    });
  });
});

// search for a city
router.get('/search', (req, res) => {
  res.sender('searchResults');
});



// get list of favorites
router.get('/favorites', (req, res) => {

  db.place.findAll()
  .then(results => {
    res.render('favorites', {
      results
    });

  })

});

// add selected city to fav
router.post('/favorites', (req, res) => {
  // res.send(req.body);
  db.place.create(req.body)
  .then( result => {
    res.redirect('/favorites')
  })
  .catch(err => {

  });
});

// delete the city from the table
router.delete('/favorites/:id', (req, res) => {
  db.place.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/favorites');
  })
  .catch(err => {
    console.log(err)
  })
});

