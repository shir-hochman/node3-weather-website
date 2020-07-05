console.log('client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

function getWeather (address) {
    msg1.textContent = "Loading..."
    msg2.textContent = ""

    fetch(`./weather?address=${address}`).then((res)=>{
        res.json().then((data) => {
            if (data.error){
                msg1.textContent = data.error
                msg2.textContent = ""
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data.forecast)
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    getWeather(address)
    console.log(address)
})