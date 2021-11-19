const textElement = document.getElementById('text')
const optionButtonElement = document.getElementById('option-buttons')

let state = {}

function startGame(){
    state = {}
    showTextNode('start')
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

    if (option.nextText == 'end'){
        return startGame()
    }

    state = Object.assign(state, option.setState)
    console.log(state)
    showTextNode(nextTextNode)
}

const textNodes = [
    {
        id: 'start', 
        text: 'welcome to your birthday!\n whatcha wanna do?',
        options: [
            {
                text: 'go get bagels and coffee/Tim Horton\'s',
                nextText: 'snacks',
                setState: {activity: 'breakfast_snacks'}
            },
            {
                text: 'go pick flowers',
                nextText: 'flowers',
                setState: {activity: 'pick_flowers'}
            },
            {
                text: 'play with cats',
                nextText: 'cats',
                setState: {activity: 'play_with_cats'}
            }
        ]
    },
    {
        id: 'snacks',
        text: 'excellent choice\n lol you love Tim Horton\'s',
        options: [
            {
                text: 'get a donut!',
                nextText: 'full_or_exhausted',
                setState: {snack: 'donut'}
            },
            {
                text: 'get a munchkin!',
                nextText: 'not_full',
                setState: {snack: 'munchkin'}
            }
        ]
    },
    {
        id: 'not_full',
        text: 'I\'m still hungry tho we gotta order some more',
        options: [
            {
                text: 'get a donut!',
                nextText: 'full_or_exhausted'
            },
            {
                text: 'get a munchkin!',
                nextText: 'full_or_exhausted'
            }
        ]
    },
    {
        id: 'full_or_exhausted',
        text: 'damn I\'m full and/or exhausted now \nlet\'s do something low key',
        options: [
            {
                text: 'yeah',
                nextText: 'low_key'
            }
        ]
    },
    {
        id: 'flowers',
        text: 'that\'s so cute - you\'re so cute',
        options: [
            {
                text: 'pick a nice flower',
                nextText: 'picked_a_flower'
            }
        ]
    },    
    {
        id: 'picked_a_flower',
        text: 'you picked a sick flower bro. i\'m proud of you\nlet\'s keep this outdoorsy vibe alive',
        options: [
            {
                text: 'yeah',
                nextText: 'outdoor_vibe'
            }
        ]
    }, 
    {
        id: 'cats',
        text: 'meow meow meow ฅ^•ﻌ•^ฅ\nmeow meow meow ฅ^•ﻌ•^ฅ',
        options: [
            {
                text: 'go the cat cafe',
                nextText: 'cat_cafe'
            },
            {
                text: 'walk around and look for cats in windows',
                nextText: 'walk_around'
            }
        ]
    },
    {
        id: 'walk_around',
        text: 'this is such a nice way to see the city!\nso happy we can share this. but i\'m kinda tired - let\'s do something low key.',
        options: [
            {
                text: 'yeah',
                nextText: 'low_key'
            }
        ]
    },
    {
        id: 'cat_cafe',
        text: 'lol the cat cafe is wonderful. i love how much you love cats!\nso happy we can share this. let\'s keep this indoor vibe alive.',
        options: [
            {
                text: 'go to the art museum',
                nextText: 'art_museum'
            },
            {
                text: 'people watch at a large bank',
                nextText: 'large_bank'
            }
        ]
    }, 
    {
        id:'large_bank',
        text: '**at the bank**\nhm yeah bank people are boring... maybe we should just...?',
        options: [
            {
                text: 'go to the art museum',
                nextText: 'art_museum'
            },
            {
                text: 'read at the crib',
                nextText: 'crib_read'
            }            
        ]
    },
    {
        id: 'low_key',
        text: 'hell yeah - low key chillin with you is the best.',
        options: [
            {
                text: 'read on the beach',
                nextText: 'beach_read'
            },
            {
                text: 'read at the crib',
                nextText: 'crib_read'
            },
            {
                text: 'read at a cafe',
                nextText: 'cafe_read'
            }
        ]
    },
    {
        id: 'cafe_read',
        text: 'this spot is really nice, but a little loud and this chair kinda hurts my ass...',
        options: [
            {
                text: 'read at the crib instead',
                nextText: 'crib_read'
            }
        ]
    },
    {
        id: 'outdoor_vibe',
        text: 'hell yeah - love chillin outdoors with you.',
        options: [
            {
                text: 'read on the beach',
                nextText: 'beach_read'
            },
            {
                text: 'go kayaking',
                nextText: 'kayaking'
            },
            {
                text: 'ride bikes across spain',
                nextText: 'spain'
            }
        ]
    },
    {
        id: 'art_museum',
        text: 'you have good taste. which exhibit do you wanna see?',
        options: [
            {
                text: 'pre-columbian exchange still lifes',
                nextText: 'still_lifes'
            },
            {
                text: 'landscape painting scrolls with lots of mist',
                nextText: 'misty_landscapes'
            }
        ]
    },  
    {
        id: 'still_lifes',
        text: 'i guess i still prefer the post-columbian tableau, but idk\nwhat should we do for dinner?',
        options: [
            {
                text: "didnt you say you had a plan?",
                nextText: 'tals_plan'
            },
            {
                text: 'peruvian chicken poutine',
                nextText: 'tals_plan'
            }
        ]
    },
    {
        id: 'misty_landscapes',
        text: 'oh wow that was gorgeous.\nwe should totally go to a japanese forest soon.\nwhat should we do for dinner?',
        options: [
            {
                text: "didnt you say you had a plan?",
                nextText: 'tals_plan'
            },
            {
                text: 'peruvian chicken poutine',
                nextText: 'tals_plan'
            }
        ]        
    },
    {
        id: 'beach_read',
        text: 'love a good beach. i\'ll throw some rocks. what\'re you gonna read?',
        options: [
            {
                text: 'something for work',
                nextText: 'you_do_you'
            },
            {
                text: 'exhbition catalog for the pre-columbian still lifes exhibit at the art museum',
                nextText: 'you_do_you'
            }
        ]
    },
    {
        id: 'crib_read',
        text: 'alright yeah let\'s go back to the crib to read.',
        options: [
            {
                text: 'do other non-reading stuff at the crib',
                nextText: 'have_sex'
            }
        ]
    },
    {
        id: 'have_sex',
        text: 'damn that was some good reading. i\'m gonna take a post-read shower.\nthink about what you want for dinner?',
        options: [
            {
                text: "didnt you say you had a plan?",
                nextText: 'tals_plan'
            },
            {
                text: 'peruvian chicken poutine',
                nextText: 'tals_plan'
            }
        ]
    },
    {
        id: 'you_do_you',
        text: 'lol alright - you do you.\n this is nice... throwing rocks at the evening water.\nwhat should we do for dinner?',
        options: [
            {
                text: "didnt you say you had a plan?",
                nextText: 'tals_plan'
            },
            {
                text: 'peruvian chicken poutine',
                nextText: 'tals_plan'
            }
        ]
    },
    {
        id: 'kayaking',
        text: 'wow it\'s beautiful out here. I feel like we could go all the way to spain.',
        options: [
            {
                text: 'let\'s do it.',
                nextText: 'spain'
            },
            {
                text: 'keep kayaking around here.',
                nextText: 'keep_kayaking'
            }

        ]
    },
    {
        id: 'keep_kayaking',
        text: 'wow yeah, glad we stuck it out around here. the sunset was beautiful.\ngood call - but what should we do for dinner?',
        options: [
            {
                text: "didnt you say you had a plan?",
                nextText: 'tals_plan'
            },
            {
                text: 'peruvian chicken poutine',
                nextText: 'tals_plan'
            }
        ]        
    },
    {
        id: 'spain',
        text: 'this is amazing. there\'s so much dope spanish stuff and fish. the sunsets are ridiculous.\nshould we stay here forever?',
        options: [
            {
                text: 'yes - in barcelona',
                nextText: 'barcelona'
            },
            {
                text: 'yes - in seville',
                nextText: 'seville'
            },
            {
                text: 'let\'s keep going',
                nextText: 'keep_going'
            }            
        ]
    },
    {
        id: 'tals_plan',
        text: '~ and so they got peruvian chicken poutine, which was tal\'s plan all along. annie loved the rich twist on a comfort food classic, and felt uplifted with satiety, carried to new heights. this crown of peruvian chicken on a long day, a long year, a great year, a great day fit so deliciously. ~',
        options: [
            {
                text: 'the end',
                nextText: 'end'
            }
        ]
    },
    {
        id: 'barcelona',
        text: '~ and so they lived out their days eating sardines and oranges and good bread in rowdy, tangled calles de barcelona ~',
        options: [
            {
                text: 'the end',
                nextText: 'end'
            }
        ]
    },
    {
        id: 'seville',
        text: '~ and so they lived out their days eating sardines and oranges and good bread in a dusty, lovey calles in a neighborhood in sevilla called macarena lol that\'s really a neighborhood there. ~',
        options: [
            {
                text: 'the end',
                nextText: 'end'
            }
        ]
    },
    {
        id: 'keep_going',
        text: '~ and so they kept going, bicycling until they go to Cologne and stopped for a while to admire a public sculpture park and then they got some schnitzel and very fine ice cream and spent most of the night at a spa with a great view of the glimmering metropolis ~',
        options: [
            {
                text: 'the end',
                nextText: 'end'
            }
        ]
    }            
]
startGame()