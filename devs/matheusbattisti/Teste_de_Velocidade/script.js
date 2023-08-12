const changeThemeButton = document.querySelector('#alternarTema')
const texto = document.querySelector('#texto')
const entrada = document.querySelector('#entrada')
const reset = document.querySelector('#reset')
const resultado = document.querySelector('#resultado')
const historico = document.querySelector('#historico')

// Change and Load Theme
changeThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    // Save or remove dark mode
    localStorage.removeItem('dark')

    if(document.body.classList.contains('dark')) localStorage.setItem('dark', 1)
})

const loadTheme = () => {
    const isDark = localStorage.getItem('dark')

    if(isDark) document.body.classList.add('dark')
}

loadTheme()

const textos = [
    'Exemplo de texto para digitar.',
    'Outro exemplo de texto para digitar.',
    'Mais um exemplo de texto para digitar.',
    'Digite isso.',
    'Você pode digitar isso aqui.'
]

const trava_linguas = [
    'Num ninho de mafagafos há sete mafagafinhos. Quando a mafagafa gafa, gafam os sete mafagafinhos.',
    'Trazei três pratos de trigo para três tigres tristes comerem.',
    'A aranha arranha a rã. A rã arranha a aranha. Nem a aranha arranha a rã. Nem a rã arranha a aranha.',
    'O tempo perguntou ao tempo quanto tempo o tempo tem, o tempo respondeu ao tempo que o tempo tem o tempo que o tempo tem.',
    'Se percebeste, percebeste. Se não percebeste, faz que percebeste para que eu perceba que tu percebeste. Percebeste?',
    'Em rápido rapto, um rápido rato raptou três ratos sem deixar rastros.',
    'Bagre branco, branco bagre.',
    'Teto sujo, chão sujo.',
    'Caixa de graxa grossa de graça.',
    'A vaca malhada foi molhada por outra vaca molhada e malhada.',
    'Fia, fio a fio, fino fio, frio a frio.',
    'O desinquivincavacador das caravelarias desinquivincavacaria as cavidades que deveriam ser desinquivincavacadas.',
    'Fala, arara loura. A arara loura falará.'
]

const novoTexto = () => {
    const fusao = textos.concat(trava_linguas)
    const index = Math.floor(Math.random() * fusao.length)
   
    texto.textContent = fusao[index]
}
novoTexto()

const atualizarTeste = () => {
    iniciar()

    if(entrada.value === texto.textContent) verificar()
}

const iniciar = () => {
    const statusDoTeste = JSON.parse(localStorage.getItem('testeEmAndamento'))  // Retorna true ou false em string, e ñ boolean. O JSON.parse resolve isso

    // Iniciar o tempo e contagem
    if(!statusDoTeste) {
        localStorage.setItem('tempoInicial', new Date().getTime())
        localStorage.setItem('testeEmAndamento', true)
    }
}

// Ao apertar ENTER, finalizando contagem e tempo
const verificar = () => {
    const tempoFinal = new Date().getTime()
    const tempoGasto = (tempoFinal - parseInt( localStorage.getItem('tempoInicial'))) / 1000

    resultado.textContent = `Parabéns! Você levou ${tempoGasto} segundos!`

    adicionarAoHistorico(texto.textContent, tempoGasto)

    localStorage.setItem('testeEmAndamento', false) // Parar a contagem
    entrada.value = ''
    novoTexto()
}

const adicionarAoHistorico = (textoDigitado, tempoGasto) => {
    const itemHistorico = document.createElement('p')

    itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`
    historico.appendChild(itemHistorico)
}

const resetTeste = () => {
    entrada.value = ''
    resultado.textContent = ''
    novoTexto()
    localStorage.setItem('testeEmAndamento', false)
    historico.innerHTML = ''
}


entrada.addEventListener('keyup', atualizarTeste)
reset.addEventListener('click', resetTeste)