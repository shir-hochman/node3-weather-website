const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//  Setup static directory
app.use(express.static(public))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shir',
        message: 'Blah blah'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello express</h>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Shir',
//         age: 37
//     }, {
//         name: 'Guy'
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('<h2>About page</h2>')
// })

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error,{lat,long, location}={}) => {
        if (error){
            console.log(error)
            return res.send({
                error: error
            })
        }
    
        forecast(lat, long, (error, forecastData) => {
            if (error){
                console.log(error)
                return res.send({
                    error: error
                })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                address: address,
                location: location,
                forecast: forecastData
            })
        })
    })
    
    // res.send({
    //     address: address,
    //     location: 'Loc',
    //     forecast: 'cold'
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    
    res.send({
        products: []
    })
})
// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name:'Shir',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title: 'Error',
        name:'Shir',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port 3000')
})