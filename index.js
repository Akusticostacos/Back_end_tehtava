// Importit
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


let persons = [
    {
      id: 1,
      name: "Kyösti Kallio",
      number: "040-12399966"   
    },

    {
        id: 2,
        name: "Roope Robotti",
        number: "040-010110001"    
    },

    {
        id: 3,
        name: "Veikko Pilvi",
        number: "040-420420420"    
    },

    {
        id: 4,
        name: "Monsteri Monni",
        number: "040-124124124"
    }
  ]

  app.get("/api/persons", (request, response) => {
      response.json(persons)
  })

  app.get("/info", (request, response) => {

    const date = new Date()
    response.send(`Phonebook has info for ${persons.length} people <br/> ${date}`)
  })

  app.get("/api/persons/:id", (request, response) => {
      
    const id = Number(request.params.id)

    const contact = persons.find(person => person.id === id)

    if (contact) {
        response.json(contact)
    }
    else {
        response.status(404).end()
    }
  })

  app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

  const randomId = () => {
      return Math.floor( Math.random() * 1000 / 2 ) * 2
  }

  app.post("/api/persons", (request, response) => {
      
    const body = request.body

    if (!body.name || !body.number) {

        return response.status(404).json({
            error: "Name or number missing..."
        })
    }

    if (persons.find(person => person.name === body.name)){
        
        return response.status(409).json({
            error: "Name must be unique"
        })
    } 
    
    const person = {
        id: randomId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})