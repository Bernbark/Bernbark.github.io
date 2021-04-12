var prestige = {
    currencyToBeEarned: 0,
    currencyTotal: 0,
    count: 0,
    startGold: 100,
    startGoldCost: 100,
    startGoldCount: 0,
    startCrystalCost: 1000,
}
function buyStartGold(){
    if(prestige.currencyTotal >= prestige.startGoldCost){
        prestige.currencyTotal -= prestige.startGoldCost
        prestige.startGoldCost*=2
        prestige.startGoldCount++
        gameData.goldPerClick+=prestige.startGold
        document.getElementById("buyStartGold").textContent = "Buy Starting Gold || "+prestige.startGoldCost+" Dollhairs"
    }
}

function buyCrystalFind(){
    if(prestige.currencyTotal >= prestige.startCrystalCost){
        prestige.currencyTotal -= prestige.startCrystalCost
        
        prestige.startCrystalCost*=2
        gameData.crystalFindNumerator++
        document.getElementById("buyCrystalFind").textContent = "Buy Better Crystal Find || "+prestige.startCrystalCost+" Dollhairs"
    }
}

function prestigeNow(){
    if (goldPerSecond >= 5000000){
        prestige.count++
        prestige.currencyToBeEarned = (goldPerSecond - 5000000)/(1000+10*prestige.count)
        prestige.currencyTotal+=prestige.currencyToBeEarned
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

window.setInterval(toBeEarned,1000)

var prestigeSave = JSON.parse(localStorage.getItem("_prestige"))


var savePrestige = window.setInterval(function(){
    localStorage.setItem("_prestige", JSON.stringify(prestige))
}, 1000)

if (prestigeSave !== null){
    prestige = prestigeSave
}