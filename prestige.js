var prestige = {
    gameData: gameData.init(),
    gym: gym.init(),
    hirelings: hirelings.init(),
    currencyToBeEarned: 0,
    currencyTotal: 0,
    count: 0,
}

function prestigeNow(){
    if (goldPerSecond >= 5000000){
        prestige.count++
        prestige.currencyToBeEarned = (goldPerSecond - 5000000)/(1000+10*prestige.count)
        prestige.currencyTotal+=prestige.currencyToBeEarned
        gameData.reset()
        gym.reset()
        hirelings.reset()
    }
}

function toBeEarned(){
    prestige.currencyToBeEarned = (goldPerSecond - 5000000)/(1000+10*prestige.count)
    if (prestige.currencyToBeEarned < 0){
        prestige.currencyToBeEarned = 0
    }
}

window.setInterval(toBeEarned,1000)

var prestigeSave = JSON.parse(localStorage.getItem("_prestige"))


var savePrestige = window.setInterval(function(){
    localStorage.setItem("_prestige", JSON.stringify(prestige))
}, 1000)

if (prestigeSave !== null){
    prestige = prestigeSave
}