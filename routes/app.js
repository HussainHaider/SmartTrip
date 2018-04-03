let express = require('express');
let router = express.Router();
let {mongoose} = require('../DBmodels/mongoose');
let {Todo} = require('../DBmodels/todo');

const home = require('../src/app/controllers/hotel');
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



router.get('/hotels', home.GetHotels);
router.get('/hotels/:loc/:rating', home.GetRecommendedHotels);
router.get('/hotels/:loc/:rating/:type', home.GetPopularHotels);
router.post('/hotels', home.PostHotels);
router.post('/signUp', User.CreateUser);
router.post('/signIn', User.AccessToUser);


module.exports = router;
