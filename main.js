/**
 * TODO:
 *  Create a system where, once player reaches max gold, they loop back around and gain a new form of currency.
 *  Make a prestige system for when players get prices that are too high.
 */




var gameData = {
    lastTick: Date.now(),
    incomeCost: 100,
    clock: 0,
    frameTime: 100,
    gold: 0,
    crystal: 0,
    crystalFind: 100,
    crystalFindNumerator: (1+prestige.crystalCount),
    crystalMulti: 1,
    totalGold: 0,
    goldPerClick: (1+(prestige.startGold*prestige.startGoldCount)),
    goldPerClickCost: 5,
    gpcCount: 0,
    glovesCost: 10000,
    glovesMulti: 1,
    priceDropCost: 10000,
    dcpCount: 1, // counts priceDropCost bought
    handleCost: 5000,
    handleMulti: 1,
    handleBought: 0,
    pickCost: 5000,
    pickMulti: 1,
    pickBought: 0,
    lightCost: 5000,
    lightCount: 0,
    cartCost: 50,
    cartCount: 0,
}

window.onload = init;
function init(){
    window.requestAnimationFrame(gameLoop)
}

//checks if the window is inactive, in which case it saves the time then calculates resources earned by certain equations below
var lastTime = 0;
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        lastTime = Date.now();
    }
    else{
        diff = Date.now() - lastTime;      
        gameData.gold += goldPerSecond*diff/1000
        gameData.totalGold += goldPerSecond*diff/1000
        if(gameData.goldPerClickCost - gameData.dcpCount*diff >= 10000){
            gameData.goldPerClickCost -= gameData.dcpCount*diff/50
        }
        else if(gameData.over10000 === true){
            gameData.goldPerClickCost=10000
        }
        gameData.crystal += diff/500
    }
})
//TODO Create a system where you can use gold mined/interval to perform other actions like paying for a gym membership, getting stronger,
var clickStrength = 1;
function getStrength(){
    clickStrength = gym.strength*gameData.goldPerClick
}
window.setInterval(getStrength,1000)

//Click to mine gold, textContent brings the action to the button ID goldMined
function mineGold(){
    gameData.gold += clickStrength
    gameData.totalGold += clickStrength
    chance = Math.floor(Math.random() * gameData.crystalFind)+1
    if (chance === gameData.crystalFind || chance <= gameData.crystalFindNumerator){
        gameData.crystal+=gameData.glovesMulti*(1+gym.gripCount/4)
    }  
}

var over10000 = false
function check10000(){
    if (gameData.gold > 10000){
        over10000 = true
    }
}
var over5000 = false
function check5000(){
    if (gameData.gold > 5000){
        over5000 = true
    }
}
function checkGold(){
    check10000()
    check5000()
    if (over5000 === true){
        document.getElementById("handle").style.visibility = 'visible'
        document.getElementById("buyLight").style.visibility = 'visible'
        document.getElementById("handleUpgrade").style.visibility = 'visible'
        document.getElementById("lights").style.visibility = 'visible'
        document.getElementById("handleUpgrade").textContent = "New Handle"
        document.getElementById("lights").textContent = "Find more crystals with better lighting, more power, and the power of science!"
        document.getElementById("buyLight").textContent = "Buy Light || "+beautify(gameData.lightCost)+" Gold"
        document.getElementById("handle").textContent = "Buy a new handle to increase your current mining power by 20% || Price: "+beautify(gameData.handleCost)
    }
    else{
        document.getElementById("handleUpgrade").style.visibility = 'hidden'
        document.getElementById("lights").style.visibility = 'hidden'
        document.getElementById("handle").style.visibility = 'hidden'
        document.getElementById("buyLight").style.visibility = 'hidden'
    }
    if (over10000 === true){
        document.getElementById("decreaseCost").style.visibility = 'visible';
        document.getElementById("perClickPriceDrop").style.visibility = 'visible';
        document.getElementById("buyGloves").style.visibility = 'visible';
        document.getElementById("equipment").style.visibility = 'visible';
        document.getElementById("perClickPriceDrop").textContent = beautify(gameData.priceDropCost) + " Gold"
        document.getElementById("equipment").textContent = "Better equipment to find more crystals at once"
        document.getElementById("buyGloves").textContent = "Buy Gloves || "+ beautify(gameData.glovesCost)+" Gold"
        document.getElementById("decreaseCost").textContent = "Upgrading this allows your Upgrade Pickaxe Cost to go down in price over time (pickaxe cost can't go below 10k, you can't buy this until it hits 10k)"
        if(gameData.goldPerClickCost < 10000 && gameData.dcpCount > 1){
            gameData.goldPerClickCost = 10000
        }
        
    }
    else{
        document.getElementById("equipment").style.visibility = 'hidden';
        document.getElementById("buyGloves").style.visibility = 'hidden';
        document.getElementById("decreaseCost").style.visibility = 'hidden';
        document.getElementById("perClickPriceDrop").style.visibility = 'hidden';
    }
}

//direct conversion of crystal to goldperclick
function increaseIncome(){
    if (gameData.crystal >= gameData.incomeCost)
    {
        gameData.crystal -= gameData.incomeCost
        gameData.incomeCost *=2
        gameData.goldPerClick*=1.2
    }
}

function mineGoldPerSecond(){
    gameData.gold += gameData.goldPerClick/25
    gameData.totalGold += gameData.goldPerClick/25
    chance = Math.floor(Math.random() * gameData.crystalFind)+1
    if (chance === gameData.crystalFind || chance <= gameData.crystalFindNumerator){
        gameData.crystal+=gameData.glovesMulti*(1+gym.gripCount/4)
    }  
}
// find more gold at a time
function cartBuy(){
    if (gameData.crystal >= gameData.cartCost){
        gameData.crystal-=gameData.cartCost
        gameData.cartCount++
        gameData.cartCost+=50*(gameData.cartCount)/2
        gameData.goldPerClick+=gameData.goldPerClick*0.5
    }
}
// find more crystals at a time
function buyGloves(){
    if (gameData.gold >= gameData.glovesCost){
        gameData.gold-=gameData.glovesCost
        gameData.glovesMulti++
        gameData.glovesCost*=1.7
    }
}

function buyLight(){
    if (gameData.gold >= gameData.lightCost && gameData.lightCount < 51){
        gameData.gold -= gameData.lightCost
        gameData.lightCost*=2
        gameData.lightCount++
        gameData.crystalFind--
    }
}

function pickHead(){
    if (gameData.crystal >= gameData.pickCost){
        gameData.crystal -= gameData.pickCost
        gameData.pickCost*=1.8
        gameData.pickBought++
        gameData.pickMulti+=1;
        gameData.goldPerClick*=gameData.pickMulti
    }
}
function buyHandle(){
    if (gameData.gold > gameData.handleCost){
        gameData.gold -= gameData.handleCost
        gameData.handleBought+=1       
        gameData.handleCost*=1.5
        gameData.handleMulti+=.2
        gameData.goldPerClick*=1.2
    }
}
//Decreases the cost of the Pickaxe upgrade, will be upgradable as a time element
function decreaseCostPerSecond(){
    if(gameData.priceDropCost >= 10000 && gameData.goldPerClickCost > 10000 && gameData.dcpCount > 1){
        if(gameData.goldPerClickCost<10000){
            gameData.goldPerClickCost=10000
        }
        else{
            gameData.goldPerClickCost-=gameData.dcpCount
        }    
    } 
}

//per click version of the above func
function decreaseCostPerClick(){
    if(gameData.dcpCount > 1 && gameData.goldPerClickCost<10000){
        gameData.goldPerClickCost = 10000
    }
    if (gameData.gold > gameData.priceDropCost && gameData.goldPerClickCost > 10000){
        gameData.gold -= gameData.priceDropCost
        gameData.dcpCount*=1.9
        gameData.goldPerClickCost-=gameData.dcpCount
        gameData.priceDropCost*=3.3
        
    }
}

//Pickaxe upgrade, increases gold per click and gold per click cost
function buyGoldPerClick(){
    if (gameData.gold >= gameData.goldPerClickCost){
        gameData.gold-=gameData.goldPerClickCost
        
        if(gameData.gpcCount < 1){
            gameData.goldPerClickCost +=5
        }
        else{
            gameData.goldPerClickCost *= 1.5+(gameData.gpcCount/2)
        }
        
        gameData.gpcCount += 1
        gameData.goldPerClick += 1*gameData.gpcCount
        
    }
}

// Makes sure the text on page is being updated when the page is refreshed, used in the gameLoop
function refresh(){
    document.getElementById("perClickUpgrade").textContent = "Upgrade Pickaxe Cost: " + beautify(gameData.goldPerClickCost) + " Gold (Flat Upgrade)"
    document.getElementById("increaseIncome").textContent = beautify(gameData.incomeCost)+" Crystal"
    
    document.getElementById("autoGold").textContent = "Miners Mining Gold: "+beautify(hirelings.goldMiners)+" || +"+beautify(hirelings.goldMiners*hirelings.minerPower)+" Gold Per Second"
    document.getElementById("grip").textContent = "Train Grip || "+beautify(gym.gripCost)+" Strength"
    document.getElementById("mineGold").textContent = "Mine "+beautify(gameData.goldPerClick*gym.strength)+" Gold"
    document.getElementById("cartBuy").textContent = beautify(gameData.cartCost)+" Crystal"
    
    document.getElementById("totalGold").textContent = "Total earned:" + beautify(gameData.totalGold)
    document.getElementById("crystalsOwned").textContent = beautify(gameData.gold) + " Gold Mined || "+Math.floor(gameData.crystal)+" Crystals Owned || "+beautify(gameData.crystalFindNumerator)+"/"+beautify((gameData.crystalFind))+" Chance to find crystal per second/click"
    
    document.getElementById("goldMined").textContent = beautify(gameData.gold) + " Gold Mined || Gold Per Second: "+beautify(goldPerSecond)+" + "+beautify(hirelings.minerPower*hirelings.goldMiners)+"/sec from hired help || "+beautify(gameData.crystal)+" Crystals Owned"
    
    
    document.getElementById("strength").textContent = "Strength: "+ beautify(gym.strength)
    document.getElementById("pickHead").textContent = beautify(gameData.pickCost)+" crystal || Hardness: "+beautify(gameData.pickMulti)
    
}

//This section helps to display a gold per second value. Doesn't need to be saved since it is just created live.
const fps = 25;
var then = 0;
var goldPerSecond = 0;
var now = 0;
var gPS200 = false
var gPS4000 = false
var gps3Million = false
function gPS(){
    then = gameData.gold
    now = gameData.goldPerClick*(1000/(fps+25))+then
    goldPerSecond = (now-then)/20
    if(goldPerSecond >= 200){
        gPS200 = true;
    }
    if(goldPerSecond >= 4000){
        gPS4000 = true;
    }
    if(goldPerSecond >= 3000000){
        gps3Million = true;
    }
}

window.setInterval(gPS,1000)
//main game loop, runs constantly
function gameLoop(){
    
    setTimeout(()=>{
        checkGold()
        refresh()        
        mineGoldPerSecond()
        decreaseCostPerSecond()
        window.requestAnimationFrame(gameLoop)
    },1000/fps)
    
     
}

function reset(){
    localStorage.removeItem("save")
    localStorage.removeItem("_gym")
    localStorage.removeItem("_hirelings")
    localStorage.removeItem("_prestige")
    location.reload();
}

var savegame = JSON.parse(localStorage.getItem("save"))

if(savegame != null){
    gameData = savegame
}
diff = Date.now()- gameData.lastTick;
gPS()      
gameData.gold += goldPerSecond*diff/1000
gameData.totalGold += goldPerSecond*diff/1000
if(gameData.goldPerClickCost - gameData.dcpCount*diff >= 10000){
    gameData.goldPerClickCost -= gameData.dcpCount*diff/1000
}
else if(gameData.over10000 === true){
    gameData.goldPerClickCost=10000
}
gameData.gold += hirelings.minerPower*hirelings.goldMiners*diff/1000
gameData.crystal += ((hirelings.minerPower*hirelings.crystalMiners)/100)*diff/1000
gameData.crystal += diff/1000

var saveGameLoop = window.setInterval(function(){
    gameData.lastTick = Date.now()
    localStorage.setItem("save", JSON.stringify(gameData))
}, 1001)

//MENU TABS
function tab(tab) {
    // hide all your tabs, then show the one the user selected.
    document.getElementById("homeScreen").style.display = "none"
    document.getElementById("crystalMenu").style.display = "none"
    document.getElementById("hirelings").style.display = "none"
    document.getElementById("gym").style.display = "none"
    document.getElementById("prestige").style.display = "none"
    
    document.getElementById(tab).style.display = "inline-block"
  }
  // go to a tab for the first time, so not all show
tab("homeScreen")

