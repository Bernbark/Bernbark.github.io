var prestige = {
    currencyToBeEarned: 0,
    currencyTotal: 0,
    count: 1,
    startGold: 100,
    startGoldCost: 100,
    startGoldCount: 0,
    startCrystalCost: 1000,
    crystalCount: 0,
}
function buyStartGold(){
    if(prestige.currencyTotal >= prestige.startGoldCost){
        prestige.currencyTotal -= prestige.startGoldCost
        prestige.startGoldCost*=2
        prestige.startGoldCount++
        gameData.goldPerClick+=prestige.startGold
        
    }
}

function buyCrystalFind(){
    if(prestige.currencyTotal >= prestige.startCrystalCost){
        prestige.currencyTotal -= prestige.startCrystalCost
        prestige.startCrystalCost*=2
        gameData.crystalFindNumerator++
        prestige.crystalCount++
    }
}

function prestigeNow(){
    if (goldPerSecond >= 5000000){
        prestige.count++
        prestige.currencyToBeEarned = (goldPerSecond - 5000000)/(1000+10*prestige.count)
        prestige.currencyTotal+=prestige.currencyToBeEarned
        savePrestige = localStorage.setItem("_prestige", JSON.stringify(prestige))
        localStorage.removeItem("save")
        localStorage.removeItem("_gym")
        localStorage.removeItem("_hirelings")
        location.reload();
    }
}

function toBeEarned(){
    prestige.currencyToBeEarned = (goldPerSecond - 5000000)/(1000+10*prestige.count)
    if (prestige.currencyToBeEarned < 0){
        prestige.currencyToBeEarned = 0
    }
}

function pRefresh(){
    document.getElementById("buyStartGold").textContent = "Buy Starting Gold || "+beautify(prestige.startGoldCost)+" Dollhairs"
    document.getElementById("buyCrystalFind").textContent = "Buy Better Crystal Find || "+beautify(prestige.startCrystalCost)+" Dollhairs"
    document.getElementById("currentCurrency").textContent = "Current prestige currency: "+beautify(prestige.currencyTotal)+" || Total to be earned from hitting the prestige button now: "+beautify(prestige.currencyToBeEarned)
}
window.setInterval(()=>{
    toBeEarned()
    pRefresh()
},1000);


var prestigeSave = JSON.parse(localStorage.getItem("_prestige"))


var savePrestige = window.setInterval(function(){
    localStorage.setItem("_prestige", JSON.stringify(prestige))
}, 1000)

if (prestigeSave !== null){
    prestige = prestigeSave
}