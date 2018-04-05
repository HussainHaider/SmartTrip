let express = require('express');
let router = express.Router();
let {mongoose} = require('../DBmodels/mongoose');
let {Todo} = require('../DBmodels/todo');

const hotel = require('../src/app/controllers/hotel');
const restaurant = require('../src/app/controllers/restaurant');
const User = require('../src/app/controllers/User');

/* GET home page. */
router.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});



router.get('/hotels/all', hotel.GetALLHotels);
router.post('/hotels', hotel.GetHotels);
router.get('/hotels/:loc/:rating', hotel.GetRecommendedHotels);
router.get('/hotels/:loc/:rating/:type', hotel.GetPopularHotels);
router.post('/hotels', hotel.PostHotels);

router.post('/signUp', User.CreateUser);
router.post('/signIn', User.AccessToUser);

router.get('/restaurants', restaurant.GetRestaurants);
router.get('/restaurants/:loc/:rating', restaurant.GetRecommendedRestaurants);
router.get('/restaurants/:loc/:rating/:type', restaurant.GetPopularRestaurants);
router.post('/restaurants', restaurant.PostRestaurants);

module.exports = router;
