
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000


let cars = [
  { id: 1, title: "subaru", isDone: false },
  { id: 2, title: "toyota", isDone: true },
  { id: 3, title: "chevrolet", isDone: false },
  { id: 4, title: "lexus", isDone: false }
]



app.get('/cars', (req, res) => {
  res.send(`
  <h1>Cars</h1>
  <ul>
  ${cars.map(car => `<li>${car.title}</li>`).join('')}
  </ul>
  `)
});
app.get('/api/cars', (req, res) => {
  res.json(cars)
});



app.delete('/api/cars/:id', (req, res) => {
  cars = cars.filter(car => car.id !== parseInt(req.params.id))
  res.json(cars)
});

app.post('/api/cars', (req, res) => {
  const newCar = {
    id: Date.now(),
    title: req.body.title,
    isDone: false
  }
  cars.push(newCar)
  res.json(newCar)

});

app.put('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const car = cars.find(car => car.id === id)
  if (car) {
    car.isDone = req.body.isDone;
    res.json(car)
  } else {
    res.status(404).end();
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

