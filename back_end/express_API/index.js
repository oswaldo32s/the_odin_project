const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')
const movies = require('./movies.json')

const PORT = process.env.PORT ?? 1234

const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1> Hola Amigos </h1>')
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )

    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.patch('/movies/:id', (req, res) => {
  // get the body
  const result = validatePartialMovie(req.body)

  // if the body does not pass the validation do the following
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // get the id param and the movie index
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  // if the movie does not exist show error
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  // get a new movie object with updated fields
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  res.json(updateMovie)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
