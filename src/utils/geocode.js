const request = require('postman-request')

function geocode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hpci1ob2NobWFuIiwiYSI6ImNrYnJsaG44bjJ4cTcydHBqOGVxZjZhcG0ifQ.Qr4M0XSxhxUloXdQ0FZN1g&limit=1`
    request({url, json:true}, (error, {body:{features}}={}) => {
        if(error){
            callback('Cant connect to geo services', undefined)
        } else if(features.length === 0){
            callback('No matching locations', undefined)
        } else {
            const data = {
                // lat: response.body.features[0].center[1],
                // long: response.body.features[0].center[0],
                // location: response.body.features[0].place_name
                lat: features[0].center[1],
                long: features[0].center[0],
                location: features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode