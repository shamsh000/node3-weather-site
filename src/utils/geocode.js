const request = require('request')


const geoCode = (address, callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2hhbXNoMTAxIiwiYSI6ImNraTQ0djJ0bzF4NXoycnFxYXJqaXptZHoifQ.PK58TTtyJPTe0qX8o0mHRw&limit=1'

    request({url, json: true}, (error, { body }) =>{
        if(error){
            callback('Unable to connect ..',undefined)
        }else if(body.features.length ==0) {
            callback('Unable to find location , search another location .',undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode


