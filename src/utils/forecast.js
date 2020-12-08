const request = require('request')

const foreCast = (lat, long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c1e74bec7987a5d7d19aa7105cc3b1f3&query='+lat+','+long+ '&units=f'

    debugger
    
    request({url, json: true},(error, { body })=>{
        if(error){
            callback('Unable to connect weather service !',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ' with humidity of ' + body.current.humidity +'.It is currently ' + body.current.temperature + ' degree out, and feels like '+ body.current.feelslike + ' degree. There is a ' + body.current.precip + '% chance of rain.')
        }

    })

}

module.exports = foreCast