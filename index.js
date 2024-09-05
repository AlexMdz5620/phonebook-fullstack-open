const express = require("express");
const morgan = require('morgan');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  const requestBody = JSON.stringify(req.body)

  morgan('tiny')(req, res, () => {
    console.log(requestBody)
    next()
  })
})

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const ahora = new Date();
app.get("/api/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${phonebook.length} people</p> <br/> ${ahora}`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (!person) {
    res.status(404).send({ error: "Not found" });
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateID = (max) => {
  return Math.floor(Math.random() * max);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  
  if (!body.name || !body.phone) {
    return res.status(400).json({ 
      error: "Missing required fields"
    });
  } else if (phonebook.find(person => person.name === body.name)){
    return res.status(400).json({
      error: "Name must be unique"
      });
  }

  const person = {
    id: generateID(1000),
    name: body.name,
    phone: body.phone
  };

  phonebook = phonebook.concat(person);

  res.json(person)
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
