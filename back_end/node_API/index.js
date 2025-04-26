const http = require('node:http')
const fs = require('node:fs')
const { findAvailablePort } = require('./findPort')

const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
    res.setHeader('Contect-Type', 'text/html')
    if (req.url === '/') {
        fs.readFile('./index.html', 'utf-8', (err, file) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Internal Server Error</h1>')
            } else {
                res.statusCode = 200
                res.end(file)
            }
            
        })
    } else if (req.url === '/contact-me') {
        fs.readFile('./contact-me.html', 'utf-8', (err, file) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Internal Server Error</h1>')
            } else {
                res.statusCode = 200
                res.end(file)
            }
        })
    } else if (req.url === '/about') {
        fs.readFile('./about.html', 'utf-8', (err, file) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Internal Server Error</h1>')
            } else {
                res.statusCode = 200
                res.end(file)
            }
        })
    } else {
        fs.readFile('./404.html', 'utf-8', (err, file) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>Internal Server Error</h1>') 
            } else {
                res.statusCode = 200
                res.end(file)
            }
        })
    }
})

findAvailablePort(desiredPort).then(port => {
    server.listen(port, () => {
        console.log(`Server listening on ${port}`)
    })
})

