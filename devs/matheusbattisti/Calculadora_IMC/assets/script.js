// IMC DATA
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0"
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0"
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I"
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II"
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III"
    }
  ]

// Seleção de Elementos
const imcTable = document.querySelector('#imc-table')

const heightInput = document.querySelector('#height'),
weightInput = document.querySelector('#weight'),
calcBtn = document.querySelector('#calc-btn'),
clearBtn = document.querySelector('#clear-btn')

const imcNumber = document.querySelector('#imc-number span'),
imcInfo = document.querySelector('#imc-info span'),
backBtn = document.querySelector('#back-btn')

const calcContainer = document.querySelector('.calc-container'),
resultContainer = document.querySelector('.resul-container')


// Funções
function createTable(data) {
    data.forEach(e => {
        const div = document.createElement('div')
        div.classList.add('table-data')

        const classification = document.createElement('p')
        classification.innerHTML = e.classification

        const info = document.createElement('p')
        info.innerHTML = e.info

        const obesity = document.createElement('p')
        obesity.innerHTML = e.obesity

        div.appendChild(classification)
        div.appendChild(info)
        div.appendChild(obesity)

        imcTable.appendChild(div)
    })
}

/*
function validDigits(text){
    // Digitos permitidos
    return text.replace(/[^0-9,]/g, '')
}
*/

const calcImc = (weight, height) => {
    const imc = (weight / (height * height)).toFixed(1)
    return imc
} 

const cleanInputs = () => {
    heightInput.value = 0
    weightInput.value = 0

    imcNumber.classList = ''
    imcInfo.classList = ''
}

const showOrHideResults = () => {
    calcContainer.classList.toggle('hide')
    resultContainer.classList.toggle('hide')
}

// Inicialização
createTable(data)

// Eventos

/*
[heightInput, weightInput].forEach(el => {
    el.addEventListener('input', e => {
        const updatedValue = validDigits(e.target.value)

        e.target.value = updatedValue
    })
})
*/

calcBtn.addEventListener('click', e => {
    // n enviar form
    e.preventDefault()

    // converter pra numero
    const weight = +weightInput.value.replace(',', '.')
    const height = +heightInput.value.replace(',', '.')

    if(!weight || !height) return

    const imc = calcImc(weight, height)

    let info

    data.forEach(item => {
        if(imc >= item.min && imc <= item.max){
            info = item.info
        }
    })

    if(!info) return

    imcNumber.innerText = imc
    imcInfo.innerText = info

    switch(info) {
        case 'Magreza':
            imcNumber.classList.add('low')
            imcInfo.classList.add('low')
            break
        case 'Normal':
            imcNumber.classList.add('good')
            imcInfo.classList.add('good')
            break
        case 'Sobrepeso':
            imcNumber.classList.add('low')
            imcInfo.classList.add('low')
            break
        case 'Obesidade':
            imcNumber.classList.add('medium')
            imcInfo.classList.add('medium')
            break
        case 'Obesidade grave':
            imcNumber.classList.add('high')
            imcInfo.classList.add('high')
            break
    }

    showOrHideResults()
})

clearBtn.addEventListener('click', e => {
    // n enviar form
    e.preventDefault()

    cleanInputs()
})

backBtn.addEventListener('click', () => {
    cleanInputs()
    showOrHideResults()
})