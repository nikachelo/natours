const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // Convert string to number
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fatal',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.addTour = (req, res) => {
  // Figuring ID of new entry
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.editTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  tour.name = req.body.name || tour.name;
  tour.duration = req.body.duration || tour.duration;
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({ status: 'success', data: tour });
    }
  );
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const newTours = tours.filter((el) => el.id !== id);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({ status: 'success', data: 'null' });
    }
  );
};
