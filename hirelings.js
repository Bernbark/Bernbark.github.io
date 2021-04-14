var hirelings = {
    lastTick: Date.now(),
    charisma: 0,
    cred: 0,
    minerUpgradeCost: 1000,
    minersAvailable: 0,
    minerPower: 300,
    goldMiners: 0,
    crystalMiners: 0,
    numMinersHired: 0,
    minerHireCost: 200,
}

// this makes sure the elements on this page are invisible until the player has earned enough gold per second
function checkGPS(){
    hireMessage = document.getElementById("hireMessage");
    hireExplain = document.getElementById("hireExplain")
    buyHire = document.getElementById("buyMiner")
    setCrystal = document.getElementById("autoCrystal")
    remove = document.getElementById("removeAll")
    setGold = document.getElementById("autoGold")
    if (gameData.maxGPS < 200){
        hireMessage.textContent = 'Earn more gold per second first to see what happens here.'
        hireExplain.style.visibility = 'hidden'
        buyHire.style.visibility = 'hidden'
        remove.style.visibility = 'hidden'
        setCrystal.style.visibility = 'hidden'
    }
    else{
        setGold.textContent = "Miners Mining Gold: "+beautify(hirelings.goldMiners)+" || +"+beautify(hirelings.goldMiners*hirelings.minerPower)+" Gold Per Second"
        hireMessage.textContent = "Hire some help around here"
        hireExplain.textContent = "Buy miners starting at 200 gold per second to help mine gold and crystals."
        buyHire.textContent = "Buy Miner || Costs "+beautify(hirelings.minerHireCost)+" Gold Per Second"
        remove.textContent = "Remove all workers to reset their placements"
        setCrystal.textContent = "Miners Mining Crystal: "+beautify(hirelings.crystalMiners)+" || +"+beautify((hirelings.crystalMiners*hirelings.minerPower)/100)+" Crystal Per Second"
        
    }
}

function checkMiner(){
    if (hirelings.numMinersHired > 0){
        document.getElementById("charisma").style.visibility = "visible";
        document.getElementById("charisma").textContent = "You have earned "+beautify(hirelings.charisma)+" charisma by being around other people more frequently, you were lonely in the mines :*("
        document.getElementById("minerUpgrade").style.visibility ="visible";
        document.getElementById("minerUpgrade").textContent = "Upgrade Miner Power || "+beautify(hirelings.minerPower)+"% || "+beautify(hirelings.minerUpgradeCost)+" Charisma"
    }
    else{
        document.getElementById("charisma").style.visibility = "hidden";
        document.getElementById("minerUpgrade").style.visibility = "hidden";
    }
}

function upgradeMiner(){
    if(hirelings.charisma > hirelings.minerUpgradeCost){
        hirelings.charisma -= hirelings.minerUpgradeCost
        hirelings.minerUpgradeCost*=2
        hirelings.minerPower+=100
    }
}

function buyMiner(){
    if(gameData.goldPerClick >= hirelings.minerHireCost){
        gameData.goldPerClick -= hirelings.minerHireCost
        hirelings.numMinersHired++
        hirelings.minersAvailable++
        hirelings.minerHireCost=100+200*hirelings.numMinersHired
    }
}

function gainCharisma(){
    hirelings.charisma+=hirelings.numMinersHired
}

function gainCred(){
    //make an event that is random and allows the user to interact with his crew to gain cred with them 
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

window.setInterval(()=>{
    checkGPS()
    autoMine()
    gainCharisma()
    checkMiner()
},1000);

var saveHire = window.setInterval(function(){
    hirelings.lastTick = Date.now()
    localStorage.setItem("_hirelings", JSON.stringify(hirelings))
}, 1001)

var hireSave = JSON.parse(localStorage.getItem("_hirelings"))

if (hireSave !== null){
    hirelings = hireSave
    diff = Date.now() - hirelings.lastTick
    hirelings.charisma+=hirelings.numMinersHired*(diff/1000)
}
