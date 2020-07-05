const request = require('postman-request')

// const url = 'http://api.weatherstack.com/current?access_key=3edc013571443a1737e972b0cd27d683&query=37.8267,-122.4233&units=f'

// request({url:url, json:true}, (error, response) => {
//     //const data = JSON.parse(response.body)
//     if (error){
//         console.log('Cant connect to weather service')
//     } else {
//         //console.log(response.body.current)
//         if (response.body.error){
//             console.log(`${response.body.error.info}`)
//         } else {
//             console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} deg out, and it feels like ${response.body.current.feelslike} deg out.`)
//         }
//     }
// })

function forecast(lat, long, callback){
    const url = `http://api.weatherstack.com/current?access_key=3edc013571443a1737e972b0cd27d683&query=${lat},${long}&units=m`
    request({url, json:true}, (error, {body:{error:errorMsg, current:{weather_descriptions, temperature, feelslike, humidity} = {}} = {}} = {}) => {
        if (error){
            callback('Cant connect to weather service')
        } else if (errorMsg) {
            callback(`Error: ${errorMsg.info}`)
        } else {
            console.log(url)
            callback(undefined, `${(weather_descriptions.length === 0) ? "No weather description" : weather_descriptions[0]}. It is currently ${temperature} deg out, and it feels like ${feelslike} deg out. The humidity is ${humidity}%`)
        }
    })
}

module.exports = forecast
