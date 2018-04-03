const {Hotel} = require('../../../DBmodels/Hotels');
//let {Hotel} = require('../Models/hotel.model.ts');



exports.GetHotels = function(req, res, next)
{
  Hotel.find()
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
}


exports.GetRecommendedHotels = function(req, res, next) {
  //query with mongoose
  //console.log(req.params.loc);

  Hotel.find({"Location": req.params.loc,"Rating": req.params.rating}).limit(3)
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
};

exports.PostHotels = function(req, res, next){
  let hotel = new Hotel({
    Name: req.body.Name,
    Price: req.body.Price,
    Rating: req.body.Rating,
    Location: req.body.Location,
    TotalRooms: req.body.TotalRooms,
    FreeRooms: req.body.FreeRooms,
    Image: req.body.Image
  });

  hotel.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
};

exports.GetPopularHotels = function(req, res, next) {
  //query with mongoose
  console.log(req.params.loc);

  Hotel.find({"Location": { $ne: req.params.loc },"Rating": req.params.rating}).limit(3)
    .exec(function(err, msg) {
      if (err) {
        return res.status(404).json({
          message: 'Resource not found',
          error: err
        });
      }
      return res.status(200).json({
        message: 'Success',
        obj: msg
      });
    });
};