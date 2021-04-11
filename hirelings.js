var hirelings = {
    lastTick: Date.now(),
    minersAvailable: 0,
    minerPower: 100,
    goldMiners: 0,
    crystalMiners: 0,
    numMinersHired: 0,
    minerHireCost: 200,
    strongManHired: false,
    numStrongMenHired: 0,
    strongMenCost: 10000,
}

function buyMiner(){
    if(gameData.goldPerClick >= hirelings.minerHireCost){
        gameData.goldPerClick -= hirelings.minerHireCost
        hirelings.numMinersHired++
        hirelings.minersAvailable++
        hirelings.minerHireCost=200*numMinersHired
    }
}

function autoGold(){
    if(hirelings.minersAvailable > 0){
        hirelings.goldMiners++
        hirelings.minersAvailable--
    }
}

function autoCrystal(){
    if(hirelings.minersAvailable > 0){
        hirelings.crystalMiners++
        hirelings.minersAvailable--
    }
}

function removeAll(){
    temp = hirelings.goldMiners + hirelings.crystalMiners
    hirelings.goldMiners = 0
    hirelings.crystalMiners = 0
    hirelings.minersAvailable += temp
}

function autoMine(){
    gameData.gold += hirelings.minerPower*hirelings.goldMiners
    gameData.crystal += (hirelings.minerPower*hirelings.crystalMiners)/100
}

window.setInterval(autoMine,1000)

var gymSave = JSON.parse(localStorage.getItem("_hirelings"))


var saveGym = window.setInterval(function(){
    hirelings.lastTick = Date.now()
    localStorage.setItem("_hirelings", JSON.stringify(hirelings))
}, 1000)

if (hireSave !== null){
    hirelings = hireSave
    diff = Date.now() - hirelings.lastTick;
    gameData.gold += hirelings.minerPower*hirelings.goldMiners*diff/1000
    gameData.crystal += ((hirelings.minerPower*hirelings.crystalMiners)/100)*diff/1000
}
