// OpenWeather API
// CountryFlag API
// Unplash API

// Variáveis e Seleção de Elementos
const apiKey = process.env.OPENWEATHER_KEY
const apiCountryURL = 'https://countryflagsapi.com/png/'
const apiUnplash = 'https://source.unsplash.com/1600x900/?'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span') // Acessar o span dentro do temperature
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('.weather-data')
const errorMessageContainer = document.querySelector('.error-message')

// Funções
const hideInfo = () => {
    errorMessageContainer.classList.add('hide')
    weatherContainer.classList.add('hide')
}

// 3 -
const getWeatherData = async(city) => {
    // Consultar api
    const apiWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch(apiWeatherApi) // Esperar resposta
    const data = await res.json() // Tranformar em JSOn

    // tratamento de erro
    if(data.cod === '404') {
        errorMessageContainer.classList.remove('hide')
        return
    }

    console.log(data)
    return data
}
// 2 -
const showWeatherData = async(city) => {
    hideInfo()
    const data = await getWeatherData(city)

    cityElement.innerHTML = data.name
    tempElement.innerHTML = parseInt(data.main.temp)
    descElement.innerHTML = data.weather[0].description
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute('src', apiCountryURL + data.sys.country)
    humidityElement.innerHTML = data.main.humidity
    windElement.innerHTML = data.wind.speed

    // change Background - Unplash
    document.body.style.background = `url("${apiUnplash + city}")`

    weatherContainer.classList.remove('hide')
}


// Eventos
// 1 -
searchBtn.addEventListener('click', e => {
    // não enviar form
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

// Ja esta funcionando sem função de mapear o ENTER
/*

cityInput.addEventListener('keyup', e => {
    if(e.code === 'Enter') {
        const city = e.target.value

        showWeatherData(city)
    }
})

*/