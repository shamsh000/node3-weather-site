const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name : "shamsheer"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About me',
        name : 'Shamsheer'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'Message for Help',
        title:'Help',
        name:'Shamsheer'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Must provide address '
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location } = {})=>{
        if (error){
            return res.send({  error })
        }
         forecast(latitude, longitude, (error, forecastData)=>{
             if(error){
                 return res.send({ error })
             }
             res.send({
                forecast: forecastData,
                location,
                address : req.query.address
                
            })
        })
    })
   
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error : 'Must provide search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'shamsheer',
        'errorMessage': 'Help articles not found !'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'shamsheer',
        errorMessage: 'Page Not Found.'
    })
})

app.listen(port, ()=>{
    console.log('web server is up at ' + port)
})