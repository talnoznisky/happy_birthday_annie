const textElement = document.getElementById('text')
const optionButtonElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode(0)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text

    while (optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonElement.appendChild(button)
        }
    });
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNode = option.nextText

    if (option.nextText <= 0){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    showTextNode(nextTextNode)
}

const textNodes = [
    {
        id: 0, 
        text: 'welcome to your birthday!\n whatcha wanna do?',
        options: [
            {
                text: 'go to Tim Horton\'s',
                setState: {timhortons: true},
                nextText: 1
            },
            {
                text: 'go pick flowers',
                nextText: 2
            },
            {
                text: 'take pictures of curious cats in windows',
                nextText: 2
            }
        ]
    },
    {
        id: 1,
        text: 'excellent choice.',
        options: [
            {
                text: 'get a donut!',
                requiredState: (currentState) => currentState.timhortons,
                nextText: 3,
                setState: {snack: 'donut'}
            },
            {
                text: 'get a munchkin!',
                requiredState: (currentState) => currentState.timhortons,
                nextText: 3,
                setState: {snack: 'munchkin'}
            }
        ]
    },
    {
        id: 2,
        text: 'hmmm... honestly I think we should...',
        options: [
            {
                text: 'go to Tim Horton\'s',
                requiredState: (currentState) => !currentState.timhortons,
                nextText: 1,
                setState: {timhortons: true},
            }
        ]
    },
    {
        id: 3,
        text: 'wow - excellent choice',
        options: [
            {
                text: 'wow that snack you got is delicious isn\'t it',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: '',
        options: [
            {
                text: 'yeah :)',
                nextText: -1
            }
        ]
    }    
]

startGame()