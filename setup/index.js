//! bugs:

//TODO extra stuff - nice-to-haves
    //add groups such that you can close all gruppekampe (as well as for the knockout stuff)


    
class Match{
    constructor(homeTeam,awayTeam,group){
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.group = group;
    }
    display() {
        return this.group + ": " + this.homeTeam + " - " + this.awayTeam;        
    }
}

const matches =  [new Match('Qatar','Ecuador','Group A'),new Match('England','Iran','Group B'),new Match('Senegal','Netherlands','Group A'),new Match('United States','Wales','Group B'),new Match('Argentina','Saudi Arabia','Group C'),new Match('Denmark','Tunisia','Group D'),new Match('Mexico','Poland','Group C'),new Match('France','Australia','Group D'),new Match('Morocco','Croatia','Group F'),new Match('Germany','Japan','Group E'),new Match('Spain','Costa Rica','Group E'),new Match('Belgium','Canada','Group F'),new Match('Switzerland','Cameroon','Group G'),new Match('Uruguay','South Korea','Group H'),new Match('Portugal','Ghana','Group H'),new Match('Brazil','Serbia','Group G'),new Match('Wales','Iran','Group B'),new Match('Qatar','Senegal','Group A'),new Match('Netherlands','Ecuador','Group A'),new Match('England','United States','Group B'),new Match('Tunisia','Australia','Group D'),new Match('Poland','Saudi Arabia','Group C'),new Match('France','Denmark','Group D'),new Match('Argentina','Mexico','Group C'),new Match('Japan','Costa Rica','Group E'),new Match('Belgium','Morocco','Group F'),new Match('Croatia','Canada','Group F'),new Match('Spain','Germany','Group E'),new Match('Cameroon','Serbia','Group G'),new Match('South Korea','Ghana','Group H'),new Match('Brazil','Switzerland','Group G'),new Match('Portugal','Uruguay','Group H'),new Match('Ecuador','Senegal','Group A'),new Match('Netherlands','Qatar','Group A'),new Match('Iran','United States','Group B'),new Match('Wales','England','Group B'),new Match('Australia','Denmark','Group D'),new Match('Tunisia','France','Group D'),new Match('Poland','Argentina','Group C'),new Match('Saudi Arabia','Mexico','Group C'),new Match('Canada','Morocco','Group F'),new Match('Croatia','Belgium','Group F'),new Match('Costa Rica','Germany','Group E'),new Match('Japan','Spain','Group E'),new Match('Ghana','Uruguay','Group H'),new Match('South Korea','Portugal','Group H'),new Match('Cameroon','Brazil','Group G'),new Match('Serbia','Switzerland','Group G'),];
const scoreOptions = ["1","x","2","1x","x2","12","1x2"]
const teams = getUniqueTeams()
const randomMessages = ["","(Modigt!)", "(Er du nu HELT sikker på det?)", "(Ej kom nu, vi er da meget bedre end det!)", "(Interessant!)"];

function getTeamsInGroup(group) {
    let teams = []
    for (let match of matches) {
        if (match.group === group) {
            if (!teams.includes(match.homeTeam)) {
                teams.push(match.homeTeam)
            }
            if (!teams.includes(match.awayTeam)) {
                teams.push(match.awayTeam)
            }
        }
    }
    return teams;   
}

let sikreTips, halvGarderinger, helGarderinger;

// For 32 matches
// Scale tips so their sum equals matches.length
// Default ratios: sikreTips = 5/8, halvGarderinger = 2/8, helGarderinger = 1/8
let totalMatches = matches.length;
if (totalMatches > 0) {
    sikreTips = Math.floor(totalMatches * 5 / 8);
    halvGarderinger = Math.floor(totalMatches * 2 / 8);
    helGarderinger = totalMatches - sikreTips - halvGarderinger;
}

let numberOfTeamsInRo16 = 16;
let numberOfTeamsInRo8 = 8;
let numOfTeamsInSemiFinals = 4;
let numOfTeamsInFinals = 2;
let currentSlutRundeYear = 2024;

let howFarDenmarkReachesResult = "";

//util stuff:
function getUniqueTeams() {
    uniqueMatches = []
    for (let match of matches) {
        if (!uniqueMatches.includes(match.homeTeam)) {
            uniqueMatches.push(match.homeTeam)
        }
        if (!uniqueMatches.includes(match.awayTeam)) {
            uniqueMatches.push(match.awayTeam)
        }
    }
    return uniqueMatches
}


//they dont really stack well - if more should be added at the same time maybe look into this
function showToast(message) {
    // Create a div for the toast
    let toast = document.createElement("div");
    toast.textContent = message;

    // Add styles
    toast.style.position = "fixed";
    toast.style.top = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.padding = "10px";
    toast.style.backgroundColor = "#444";
    toast.style.color = "white";
    toast.style.opacity = "0.9";
    toast.style.borderRadius = "5px";
    toast.style.textAlign = "center";
    toast.style.transition = "opacity 0.5s";

    // Append the toast to the body
    document.body.appendChild(toast);

    // Fade out the toast after 3 seconds
    setTimeout(function() {
        toast.style.opacity = "0";
    }, 2000);

    // Remove the toast after it has faded out
    setTimeout(function() {
        document.body.removeChild(toast);
    }, 3500);
}

function updateHowFarDenmarkReaches() {
    let howFarDenmarkReachesResultBackup = howFarDenmarkReachesResult;
    let ro16Div = document.getElementById("ro16Div");
    let ro8Div = document.getElementById("ro8Div");
    let semiDiv = document.getElementById("semiDiv");
    let finalsDiv = document.getElementById("finalsDiv");

    let denmarkIsInRo8 = Array.from(ro8Div.querySelectorAll('select')).some(select => select.value === "Denmark");
    let denmarkIsInSemi = Array.from(semiDiv.querySelectorAll('select')).some(select => select.value === "Denmark");
    let denmarkIsInFinals = Array.from(finalsDiv.querySelectorAll('select')).some(select => select.value === "Denmark");
    let denmarkIsInRo16 = Array.from(ro16Div.querySelectorAll('select')).some(select => select.value === "Denmark");
    if (denmarkIsInRo8 || denmarkIsInSemi || denmarkIsInFinals) {
        howFarDenmarkReachesResult = "Mindst en kvartfinale";
    }
    else if (denmarkIsInRo16) {
        howFarDenmarkReachesResult = "ud i ottendedelsfinalerne";
    }
    else {
        howFarDenmarkReachesResult = "Ud i gruppespillet";
    } 
    
    if (Array.from(ro16Div.querySelectorAll('select')).every(select => select.value !== "") 
        && !Array.from(ro16Div.querySelectorAll('select')).some(select => select.value === "Denmark")) {
        howFarDenmarkReachesResult = "Ud i grupperspillet";
    }
        
    elem = document.getElementById("howFarDenmarkReachesResultElement");
    //if the results has not changed then dont update the text (also avoid the random messages)
    if (howFarDenmarkReachesResultBackup === howFarDenmarkReachesResult)
        return;
    elem.textContent = howFarDenmarkReachesResult;
      
    let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    elem.textContent += randomMessage;
}




//adding stuff

function addNameField() {
    let nameField = document.createElement("input");
    nameField.type = "text";
    nameField.id = "nameField";
    nameField.placeholder = "Indtast navn her";
    nameField.style.position = "absolute";
    nameField.style.top = "10px";
    nameField.style.left = "220px"; // Adjust this value
    document.body.appendChild(nameField);
}

function addSaveButton(buttonContainer) {
    let saveButton = document.createElement("button");
    saveButton.textContent = "Gem";
    saveButton.onclick = save;
    buttonContainer.appendChild(saveButton); // Append the button to the body
}

function addExportButton(buttonContainer) {
    let exportButton = document.createElement("button");
    exportButton.textContent = "Exporter";

    exportButton.onclick = exportTipskupon;
    buttonContainer.appendChild(exportButton); // Append the button to the body
}

function addResetButton(buttonContainer) {
    let resetButton = document.createElement("button");
    resetButton.textContent = "Nulstil";
    resetButton.onclick = reset;
    buttonContainer.appendChild(resetButton); // Append the button to the body
}

function addButtons() {
    let buttonContainer = document.createElement("div");
    buttonContainer.style.margin = "10px";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "10px";
    addSaveButton(buttonContainer)
    addExportButton(buttonContainer)
    addResetButton(buttonContainer)
    document.body.appendChild(buttonContainer);
}

//save it in local storage
function save() {
    //get all values
    let nameValue = document.getElementById("nameField").value;
    let matchValues = Array(matches.length).fill("");
    for(let i = 0; i < matches.length; i++) {
        let resultSelecter = document.getElementById("match"+i).querySelector('select');
        let matchValue = resultSelecter.value;
        if (matchValue !== "") {
            matchValues[i] = matchValue;
        }
    /// save the matchValues
    }
    //1/8
    let ro16Values = Array(numberOfTeamsInRo16).fill("");
    for(let i = 0; i < numberOfTeamsInRo16; i++) {
        let resultSelecter = document.getElementById("ro16Div").querySelectorAll('select')[i];
        let ro16Value = resultSelecter.value;
        if (ro16Value !== "") {
            ro16Values[i] = ro16Value;
        }
    }
    //kvart
    let ro8Values = Array(numberOfTeamsInRo8).fill("");
    for(let i = 0; i < numberOfTeamsInRo8; i++) {
        let resultSelecter = document.getElementById("ro8Div").querySelectorAll('select')[i];
        let ro8Value = resultSelecter.value;
        if (ro8Value !== "") {
            ro8Values[i] = ro8Value;
        }
    }
    //semi
    let semiValues = Array(numOfTeamsInSemiFinals).fill("");
    for(let i = 0; i < numOfTeamsInSemiFinals; i++) {
        let resultSelecter = document.getElementById("semiDiv").querySelectorAll('select')[i];
        let semiValue = resultSelecter.value;
        if (semiValue !== "") {
            semiValues[i] = semiValue;
        }
    }
    //finale
    let finaleValues = Array(numOfTeamsInFinals).fill("");
    for(let i = 0; i < numOfTeamsInFinals; i++) {
        let resultSelecter = document.getElementById("finalsDiv").querySelectorAll('select')[i];
        let finaleValue = resultSelecter.value;
        if (finaleValue !== "") {
            finaleValues[i] = finaleValue;
        }
    }

    //Hvor langt når Danmark
    let howFarDenmarkReaches = howFarDenmarkReachesResult;

    //vinder
    let winnerValue = document.getElementById("winnerDiv").querySelector('select').value
    
        
    //top goal scorer
    let topGoalScorerValue = document.getElementById("topGoalScorerDiv").querySelector('input').value;
    
    let daneToScoreValue = document.getElementById("daneScoringDiv").querySelector('input').value;
    let howManyGoalsDaneScoresValue = null;
    if (daneToScoreValue !== "") {
        howManyGoalsDaneScoresValue = document.getElementById("howManyGoalsDaneScoresInput").value;
    }
    
    let playerToGetRedCardedValue = document.getElementById("playerToGetRedCardedDiv").querySelector('input').value;
    console.log("Name Value: ", nameValue);
    console.log("Match Values: ", matchValues);
    console.log("Ro16 Values: ", ro16Values);
    console.log("Ro8 Values: ", ro8Values);
    console.log("Semi Values: ", semiValues);
    console.log("Finale Values: ", finaleValues);
    console.log("Winner Value: ", winnerValue);
    console.log("How Far Denmark Reaches: ", howFarDenmarkReaches);
    console.log("Top Goal Scorer Value: ", topGoalScorerValue);
    console.log("Dane To Score Value: ", daneToScoreValue);
    console.log("How Many Goals Dane Scores Value: ", howManyGoalsDaneScoresValue);
    console.log("Red Carded Value: ", playerToGetRedCardedValue);
    
    
    
    //update existing local storage values (or create new ones)
    localStorage.setItem('slutrundeYear', currentSlutRundeYear);
    localStorage.setItem('nameValue', nameValue);
    localStorage.setItem('matchValues', JSON.stringify(matchValues));
    localStorage.setItem('ro16Values', JSON.stringify(ro16Values));
    localStorage.setItem('ro8Values', JSON.stringify(ro8Values));
    localStorage.setItem('semiValues', JSON.stringify(semiValues));
    localStorage.setItem('finaleValues', JSON.stringify(finaleValues));
    localStorage.setItem('winnerValue', winnerValue);
    localStorage.setItem('howFarDenmarkReaches', howFarDenmarkReaches);
    localStorage.setItem('topGoalScorerValue', topGoalScorerValue);
    localStorage.setItem('daneToScoreValue', daneToScoreValue);
    localStorage.setItem('howManyGoalsDaneScoresValue', howManyGoalsDaneScoresValue);
    localStorage.setItem('playerToGetRedCardedValue', playerToGetRedCardedValue);
    
    //add toast message
    showToast("Din tipskupon er gemt succesfuldt!");   
}

function exportTipskupon() {
    let nameField = document.getElementById("nameField");
    if (nameField.value === "") {
        showToast("Du skal udfylde navn før du kan eksportere!");
        return;
    }
    if (sikreTips < 0 || halvGarderinger < 0 || helGarderinger < 0) {
        showToast("Du overskrider grænsen for én slags tips!");
        return;
    }
    if (sikreTips > 0 || halvGarderinger > 0 || helGarderinger > 0) {
        showToast("Du har ikke brugt alle dine tips!");
        return;
    }
    let teamTipsContainer = document.getElementById("teamTipsContainer");
    for (let select of teamTipsContainer.querySelectorAll('select')) {
        if (select.value === "") {
            showToast("Du har ikke udfyldt alle holdene!");
            return;
        }
    }
    let topScorerValue = document.getElementById("topGoalScorerDiv").querySelector('input').value;
    if (topScorerValue === "") {
        showToast("Du har ikke udfyldt topscorer!");
        return;
    }
    let daneToScoreValue = document.getElementById("daneScoringDiv").querySelector('input').value;
    if (daneToScoreValue === "") {
        showToast("Du har ikke udfyldt dansker der scorer");
        return;
    }
    else {
        let howManyGoalsDaneScoresValue = document.getElementById("howManyGoalsDaneScoresInput").value;
        if (howManyGoalsDaneScoresValue === "") {
            showToast("Du har ikke udfyldt hvor mange mål den dansker scorer");
            return
        }
    }
    playerToGetRedCardedValue = document.getElementById("playerToGetRedCardedDiv").querySelector('input').value;
    if (playerToGetRedCardedValue === "") {
        showToast("Du har ikke udfyldt spiller der får rødt kort");
        return;
    }
    exportToJson();  
}

function exportToJson() {        
    if (!confirm("Exporter filen? Dette vil downloade en fil, som du skal sende til mig."))
        return;
    save();

    // Retrieve all data from local storage
    let localStorageData = {
        slutrundeYear: localStorage.getItem('slutrundeYear'),
        nameValue: localStorage.getItem('nameValue'),
        matchValues: JSON.parse(localStorage.getItem('matchValues')),
        ro16Values: JSON.parse(localStorage.getItem('ro16Values')),
        ro8Values: JSON.parse(localStorage.getItem('ro8Values')),
        semiValues: JSON.parse(localStorage.getItem('semiValues')),
        finaleValues: JSON.parse(localStorage.getItem('finaleValues')),
        winnerValue: localStorage.getItem('winnerValue'),
        howFarDenmarkReachesValue: localStorage.getItem('howFarDenmarkReaches'),
        topGoalScorerValue: localStorage.getItem('topGoalScorerValue'),
        daneToScoreValue: localStorage.getItem('daneToScoreValue'),
        howManyGoalsDaneScoresValue: localStorage.getItem('howManyGoalsDaneScoresValue'),
        playerToGetRedCardedValue: localStorage.getItem('playerToGetRedCardedValue')
    };
    
    // Convert the data to a JSON string
    let jsonString = JSON.stringify(localStorageData, null, 2);

    // Create a Blob from the JSON string
    let blob = new Blob([jsonString], { type: "application/json" });

    // Create a link element
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = localStorageData.nameValue.trim()+".json";

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();
    // Remove the link from the document
    document.body.removeChild(link);
}

function reset() {
    if (confirm("Er du sikker på at du vil nulstille? (Dette vil fjerne alt du har udfyldt og det du har gemt)")) {
        localStorage.clear();
        location.reload();
    }
}

function updateAvailableTeamsOnLoad() {
    let teamTipsContainer = document.getElementById("teamTipsContainer");
    let selectedTeams = [];
    for (let select of teamTipsContainer.querySelectorAll('select')) {
        if (select.value !== "" && !selectedTeams.includes(select.value)) {
            selectedTeams.push(select.value);
        }
    }
    for (let select of teamTipsContainer.querySelectorAll('select')) {
        for (let option of select.options) {
            if (selectedTeams.includes(option.value)) {
                option.disabled = true;
            }
        }
    }
    
}

function updateRemainingTipsOnLoad() {
    let matchesContainer = document.getElementById("matchesContainer");
    let sikreTipsValue = parseInt(document.getElementById("sikreTipsNumber").innerHTML);
    let halvGarderingerValue = parseInt(document.getElementById("halvGarderingerNumber").innerHTML);
    let helGarderingerValue = parseInt(document.getElementById("helGarderingerNumber").innerHTML);
    
    for (let match of matchesContainer.querySelectorAll('select')) {
        if (match.value !== "") {
            if (match.value === "1" || match.value === "x" || match.value === "2") {
                sikreTipsValue -= 1;
            }
            else if (match.value === "1x" || match.value === "x2" || match.value === "12") {
                halvGarderingerValue -= 1;
            }
            else if (match.value === "1x2") {
                helGarderingerValue -= 1;
            }
        }
    }
    
    
    document.getElementById("sikreTipsNumber").textContent = sikreTipsValue;
    document.getElementById("halvGarderingerNumber").textContent = halvGarderingerValue;
    document.getElementById("helGarderingerNumber").textContent = helGarderingerValue;
    
    handleNumberColoring();
}


//load from local storage
function load() {
    // Get items from local storage
    let slutrundeYear = localStorage.getItem('slutrundeYear');
    let nameValue = localStorage.getItem('nameValue');
    let matchValues = JSON.parse(localStorage.getItem('matchValues'));
    let ro16Values = JSON.parse(localStorage.getItem('ro16Values'));
    let ro8Values = JSON.parse(localStorage.getItem('ro8Values'));
    let semiValues = JSON.parse(localStorage.getItem('semiValues'));
    let finaleValues = JSON.parse(localStorage.getItem('finaleValues'));
    let winnerValue = localStorage.getItem('winnerValue');
    let topGoalScorerValue = localStorage.getItem('topGoalScorerValue');
    let daneToScoreValue = localStorage.getItem('daneToScoreValue');
    let howManyGoalsDaneScoresValue = localStorage.getItem('howManyGoalsDaneScoresValue');
    let playerToGetRedCardedValue = localStorage.getItem('playerToGetRedCardedValue');
    
    //if we are loading from a previous year, dont load anything
    //note the != since either may be string or int
    if (slutrundeYear != currentSlutRundeYear)
        return
    //name
    if (nameValue !== "")
        document.getElementById("nameField").value = nameValue;
    //matches
    for (let i = 0; i < matchValues.length; i++) {
        if (matchValues[i] !== "") {
            document.getElementById("match"+i).querySelector('select').value = matchValues[i];
        }
    }
    //ro16
    for (let i = 0; i < ro16Values.length; i++) {
        if (ro16Values[i] !== "") {
            document.getElementById("ro16Div").querySelectorAll('select')[i].value = ro16Values[i];
        }
    }
    //ro8
    for (let i = 0; i < ro8Values.length; i++) {
        if (ro8Values[i] !== "") {
            document.getElementById("ro8Div").querySelectorAll('select')[i].value = ro8Values[i];
        }
    }
    //semi
    for (let i = 0; i < semiValues.length; i++) {
        if (semiValues[i] !== "") {
            document.getElementById("semiDiv").querySelectorAll('select')[i].value = semiValues[i];
        }
    }
    //finale
    for (let i = 0; i < finaleValues.length; i++) {
        if (finaleValues[i] !== "") {
            document.getElementById("finalsDiv").querySelectorAll('select')[i].value = finaleValues[i];
        }
    }
    //winner
    if (winnerValue !== "")
        document.getElementById("winnerDiv").querySelector('select').value = winnerValue;
        
    //top scorer
    if (topGoalScorerValue !== "")
        document.getElementById("topGoalScorerDiv").querySelector('input').value = topGoalScorerValue;
        
    //how far denmark reaches ???
    if (ro8Values.some(value => value === "Denmark") || semiValues.some(value => value === "Denmark") || finaleValues.some(value => value === "Denmark"))
        updateHowFarDenmarkReaches();
    
    //dane to score + how many goals dane scores
    if (daneToScoreValue !== "") {
        document.getElementById("daneScoringDiv").querySelector('input').value = daneToScoreValue;
        addHowManyGoalsByPickedDane()
        if (howManyGoalsDaneScoresValue !== "")
            document.getElementById("howManyGoalsDaneScoresInput").value = howManyGoalsDaneScoresValue;
    }
    //player to get red carded
    if (playerToGetRedCardedValue !== "")
        document.getElementById("playerToGetRedCardedDiv").querySelector('input').value = playerToGetRedCardedValue;
        
        
    updateRemainingTipsOnLoad();
    updateAvailableTeamsOnLoad(); 
    handleTeamColoring();
}




function updateRemainingTips(prevValue, currentValue) {
    sikreTips = parseInt(document.getElementById("sikreTipsNumber").textContent);
    halvGarderinger = parseInt(document.getElementById("halvGarderingerNumber").textContent);
    helGarderinger = parseInt(document.getElementById("helGarderingerNumber").textContent);
    let sikreTipsNumber = document.getElementById("sikreTipsNumber");
    let halvGarderingerNumber = document.getElementById("halvGarderingerNumber");
    let helGarderingerNumber = document.getElementById("helGarderingerNumber");
    // if (prevValue !== "")
    switch (prevValue) {
        case "1":
        case "x":
        case "2":
            sikreTips += 1;
            break;
        case "1x":
        case "x2":
        case "12":
            halvGarderinger += 1;
            break;
        case "1x2":
            helGarderinger += 1;
            break;
    }
    
    switch (currentValue) {
        case "1":
        case "x":
        case "2":
            sikreTips -= 1;
            break;
        case "1x":
        case "x2":
        case "12":
            halvGarderinger -= 1;
            break;
        case "1x2":
            helGarderinger -= 1;
            break;
    }
    
    
    //handle number coloring
    let tipDictionary = {[sikreTips]: sikreTipsNumber, [halvGarderinger]: halvGarderingerNumber, [helGarderinger]: helGarderingerNumber};
    
    
    
    
    //update the numbers
    sikreTipsNumber.textContent = sikreTips;
    halvGarderingerNumber.textContent = halvGarderinger;
    helGarderingerNumber.textContent = helGarderinger;   
    handleNumberColoring();
}

function handleNumberColoring() {
    sikreTips = parseInt(document.getElementById("sikreTipsNumber").textContent);
    halvGarderinger = parseInt(document.getElementById("halvGarderingerNumber").textContent);
    helGarderinger = parseInt(document.getElementById("helGarderingerNumber").textContent);
    let sikreTipsElement = document.getElementById("sikreTipsNumber");
    let halvGarderingerElement = document.getElementById("halvGarderingerNumber");
    let helGarderingerElement = document.getElementById("helGarderingerNumber");
    
    let tipMap = new Map();
    tipMap.set(sikreTipsElement, sikreTips);
    tipMap.set(halvGarderingerElement, halvGarderinger);
    tipMap.set(helGarderingerElement, helGarderinger);

    for (let [tipTypeObject, numOfTips] of tipMap) {
        console.log("tipType: ", numOfTips);
        if (numOfTips == 0) {
            tipTypeObject.style.color = "green";
        } 
        else if (numOfTips < 0) {
            tipTypeObject.style.color = "red";
        }
        else {
            tipTypeObject.style.color = "black";
        }
    }
}

function handleTeamColoring() {
    let teamsPicked = [];
    let teamsDiv = document.getElementById("teamTipsContainer");
    for (let select of teamsDiv.querySelectorAll('select')) {
        if (select.value !== "" && !teamsPicked.includes(select.value)) {
            teamsPicked.push(select.value);
        }
    }
    
    for (let groupDiv of groupOverviewContainer.querySelectorAll('div')) {
        for (let groupSpan of groupDiv.querySelectorAll('span')) {
            if (teamsPicked.includes(groupSpan.textContent)) {
                groupSpan.style.color = "green";
            }
            else {
                groupSpan.style.color = "black";
            }
        }
    }
    
    
    
    
    
}



//den skal også håndtere at frigive hvis man vælger et andet holdt (altså bruge prev value)
function handleKnockoutSelectInput(currentSelect, teamsDiv) {
    let selectedOptionValue = currentSelect.options[currentSelect.selectedIndex].value;
    for (let select of teamsDiv.querySelectorAll('select')) {
        if (select !== currentSelect) { // Skip the current select
            for (let option of select.options) {
                if (option.value === selectedOptionValue) {
                    option.disabled = true;
                }
            }
        }
    }
    let previousValue = currentSelect.getAttribute('data-prev-value');
    if (previousValue !== "") {
        for (let select of teamsDiv.querySelectorAll('select')) {
            if (select !== currentSelect) { // Skip the current select
                for (let option of select.options) {
                    if (option.value === previousValue) {
                        option.disabled = false;
                    }
                }
            }
        }
    }
    //check if denmark was added/removed:
    let prevValue = currentSelect.getAttribute('data-prev-value');
    if (currentSelect.value === "Denmark" || prevValue === "Denmark") {
        updateHowFarDenmarkReaches();
    }
}




function addRemainingTips() {
    // Create the overall container
    let remainingTipsContainer = document.createElement("div");
    remainingTipsContainer.style.position = "fixed";
    remainingTipsContainer.style.top = "0";
    remainingTipsContainer.style.right = "0";
    remainingTipsContainer.style.width = "20%";
    remainingTipsContainer.style.border = "2px solid black";
    remainingTipsContainer.id = "remainingTipsContainer";
    
    //add text elements
    
    //sikre tips text
    let sikreTipsText = document.createElement("p");
    sikreTipsText.id = "sikreTips";
    sikreTipsText.textContent = "Sikre tips(1, x, 2): ";
    let sikreTipsNumber = document.createElement("p");
    sikreTipsNumber.id = "sikreTipsNumber";
    sikreTipsNumber.style.fontWeight = "bold";
    sikreTipsNumber.textContent = sikreTips;
    
    //halvgarderinger text
    let halvGarderingerText = document.createElement("p");
    halvGarderingerText.id = "halvGarderinger";
    halvGarderingerText.textContent = "Halvgarderinger(1x, x2, 12): ";
    let halvGarderingerNumber = document.createElement("p");
    halvGarderingerNumber.id = "halvGarderingerNumber";
    halvGarderingerNumber.style.fontWeight = "bold";
    halvGarderingerNumber.textContent = halvGarderinger;
    
    //helgarderinger text
    let helGarderingerText = document.createElement("p");
    helGarderingerText.id = "helGarderinger";
    helGarderingerText.textContent = "Helgarderinger(1x2): ";
    let helGarderingerNumber = document.createElement("p");
    helGarderingerNumber.id = "helGarderingerNumber";
    helGarderingerNumber.style.fontWeight = "bold";
    helGarderingerNumber.textContent = helGarderinger;
    
    // Create a div for sikre tips
    let sikreTipsDiv = document.createElement("div");
    sikreTipsDiv.style.display = "flex";
    sikreTipsDiv.appendChild(sikreTipsText);
    sikreTipsDiv.appendChild(sikreTipsNumber);
    remainingTipsContainer.appendChild(sikreTipsDiv);
    
    // Create a div for halv garderinger
    let halvGarderingerDiv = document.createElement("div");
    halvGarderingerDiv.style.display = "flex";
    halvGarderingerDiv.appendChild(halvGarderingerText);
    halvGarderingerDiv.appendChild(halvGarderingerNumber);
    remainingTipsContainer.appendChild(halvGarderingerDiv);
    
    // Create a div for hel garderinger
    let helGarderingerDiv = document.createElement("div");
    helGarderingerDiv.style.display = "flex";
    helGarderingerDiv.appendChild(helGarderingerText);
    helGarderingerDiv.appendChild(helGarderingerNumber);
    remainingTipsContainer.appendChild(helGarderingerDiv);
    

    document.body.appendChild(remainingTipsContainer);
}

function addPointsInfo() {
    let remainingTipsContainer = document.getElementById("remainingTipsContainer");
    let pointsInfo = document.createElement("p");
    pointsInfo.textContent = "Tip: Hold musen over overskrifterne for at se hvor mange point de giver";
    pointsInfo.style.fontWeight = 'bold';
    remainingTipsContainer.appendChild(pointsInfo);
}

function addGroupOverview() {
    // Create the overall container
    let groupOverviewContainer = document.createElement("div");
    groupOverviewContainer.id = "groupOverviewContainer";
    groupOverviewContainer.style.position = "fixed";
    groupOverviewContainer.style.top = "0";
    groupOverviewContainer.style.right = "0";
    groupOverviewContainer.style.width = "40%";
    groupOverviewContainer.style.border = "2px solid black";
    groupOverviewContainer.style.marginTop = "300px"; // Adjust this value as needed

    // Add some text for demonstration
    let groupOverviewText = document.createElement("p");
    groupOverviewText.textContent = "Grupper:";
    groupOverviewContainer.appendChild(groupOverviewText);
    const groups = ["Group A", "Group B", "Group C", "Group D", "Group E", "Group F"];
    for (let group of groups) {
        let groupDiv = document.createElement("div");
        groupDiv.style.display = "flex";
        let groupText = document.createElement("p");
        groupText.textContent = group + ": ";
        let teams = getTeamsInGroup(group);
        for (let i = 0; i < teams.length; i++) {
            let teamSpan = document.createElement("span");
            teamSpan.textContent = teams[i];
            groupText.appendChild(teamSpan);
            if (i < teams.length - 1) {
                groupText.appendChild(document.createTextNode(", "));
            }
        }
        groupDiv.appendChild(groupText);
        groupOverviewContainer.appendChild(groupDiv);
    }
        

    // Append the container to the body
    document.body.appendChild(groupOverviewContainer);
}

function addReferenceContainer() {
    addRemainingTips()
    addPointsInfo()
    addGroupOverview()
}


function addMatches() {
    let allMatchesDiv = document.createElement("div")
    allMatchesDiv.id = "matchesContainer";
    allMatchesDiv.style.flexDirection = "column";
    allMatchesDiv.style.alignItems = "center"; // This will horizontally center the matchDiv
    let allMatchesHeader = document.createElement("h2");
    allMatchesHeader.style.marginBottom = "5px";
    allMatchesHeader.style.marginTop = "40px";
    allMatchesHeader.textContent = "Gruppespilskampe:";
    allMatchesHeader.id = "gruppespilsHeader";
    allMatchesDiv.appendChild(allMatchesHeader);
    let h4 = null;
    let matchDiv = null;
    let resultSelecter = null;
    for (let i = 0; i < matches.length; i++) {
        //div for match
        matchDiv = document.createElement("div");
        matchDiv.style.display = "flex";
        matchDiv.style.alignItems = "center"; // This will vertically center the child elements
        matchDiv.style.justifyContent = "space-between"; // This will align the h4 and select elements
        matchDiv.style.maxWidth = "400px"; // Limit the maximum width here
        matchDiv.id = "match"+i;
        allMatchesDiv.appendChild(matchDiv);
        
        //match text
        h4 = document.createElement("h4")
        h4.innerHTML = matches[i].display()
        h4.setAttribute("flex","1")
        matchDiv.appendChild(h4) 
        
        //result selector
        resultSelecter = document.createElement("select");
        //add placeholder text and no selected option by default
        let defaultOption = new Option("Tip mig!", "", true, true);
        defaultOption.disabled = true;
        resultSelecter.className = "resultSelecter";
        resultSelecter.add(defaultOption);
        //keep track of previous value
        resultSelecter.setAttribute('data-prev-value', resultSelecter.value);
        //if their was a previous save, the prevvalue must be updated
        resultSelecter.onclick = function() {
            if (this.value !== "" && this.getAttribute('data-prev-value') === "") {
                this.setAttribute('data-prev-value', this.value);
            }
        };
        //pass in the previous value and the current value when the value changes
        resultSelecter.onchange = function() {
            console.log("this: ", this.value);
            let prevValue = this.getAttribute('data-prev-value'); // Get the previous value
            console.log("prevValue: ", prevValue);
            let currentValue = this.value; // Get the current value
            
            // Update the previous value attribute
            this.setAttribute('data-prev-value', currentValue);
            
            updateRemainingTips(prevValue, currentValue);
        };
        resultSelecter.style.height = "30px"; // Set the height here
        for (const scoreOption of scoreOptions)
            resultSelecter.add(new Option(scoreOption));
        matchDiv.appendChild(resultSelecter);   
    }
    document.body.appendChild(allMatchesDiv);
}

function addTeamTips() {
    let outerDiv = document.createElement("div");
    outerDiv.style.display = "flex";
    outerDiv.style.flexDirection = "column";
    outerDiv.style.width = "50%";
    outerDiv.id = "teamTipsContainer";
    // outerDiv.style.alignItems = "center";
    // outerDiv.style.justifyContent = "center";
    document.body.appendChild(outerDiv);
    
    //add ro16
    let ro16Div = document.createElement("div");
    ro16Div.id = "ro16Div";
    let ro16Header = document.createElement("h2");
    ro16Header.textContent = "Hold i ottendedelsfinalerne";
    ro16Header.id = "ro16Header";
    ro16Div.appendChild(ro16Header);
    for (let i = 0; i < numberOfTeamsInRo16; i++) {
        let ro16MatchSelect = document.createElement("select");
        ro16MatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionRo16 = new Option("Hold "+(i+1), "", true, true);
        defaultOptionRo16.disabled = true;
        ro16MatchSelect.add(defaultOptionRo16);
        ro16MatchSelect.style.margin = "5px";
        ro16MatchSelect.setAttribute('data-prev-value', ro16MatchSelect.value);
        for (const team of teams) {
            ro16MatchSelect.add(new Option(team));
            ro16MatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, ro16Div);
                this.setAttribute('data-prev-value', this.value);
                handleTeamColoring();
            };
        }
        ro16Div.appendChild(ro16MatchSelect);
    }
    outerDiv.appendChild(ro16Div);
    //add ro8
    let ro8Div = document.createElement("div");
    ro8Div.id = "ro8Div";
    let ro8Header = document.createElement("h2");
    ro8Header.id = "ro8Header";
    ro8Header.textContent = "Hold i kvartfinalerne";
    ro8Div.appendChild(ro8Header);
    for (let i = 0; i < numberOfTeamsInRo8; i++) {
        let ro8MatchSelect = document.createElement("select");
        ro8MatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionRo8 = new Option("Hold "+(i+1), "", true, true);
        defaultOptionRo8.disabled = true;
        ro8MatchSelect.add(defaultOptionRo8);
        ro8MatchSelect.style.margin = "5px";
        ro8MatchSelect.setAttribute('data-prev-value', ro8MatchSelect.value);
        for (const team of teams) {
            ro8MatchSelect.add(new Option(team));
            ro8MatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, ro8Div);
                this.setAttribute('data-prev-value', this.value);
                handleTeamColoring();
            }
            ro8Div.appendChild(ro8MatchSelect);
        }
        outerDiv.appendChild(ro8Div);
    }
    
    //add semi-finals
    let semiDiv = document.createElement("div");
    semiDiv.id = "semiDiv";
    let semiHeader = document.createElement("h2");
    semiHeader.textContent = "Hold i semifinalerne";
    semiHeader.id = "semiHeader";
    semiDiv.appendChild(semiHeader);
    for (let i = 0; i < numOfTeamsInSemiFinals; i++) {
        let semiMatchSelect = document.createElement("select");
        semiMatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionSemis = new Option("Hold "+(i+1), "", true, true);
        defaultOptionSemis.disabled = true;
        semiMatchSelect.add(defaultOptionSemis);
        semiMatchSelect.style.margin = "5px";
        semiMatchSelect.setAttribute('data-prev-value', semiMatchSelect.value);
        for (const team of teams) {
            semiMatchSelect.add(new Option(team));
            semiMatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, semiDiv);
                this.setAttribute('data-prev-value', this.value);
                handleTeamColoring();
            };
        }
        semiDiv.appendChild(semiMatchSelect);
    }
    outerDiv.appendChild(semiDiv);

    //add finals
    let finalsDiv = document.createElement("div");
    finalsDiv.id = "finalsDiv";
    let finalsHeader = document.createElement("h2");
    finalsHeader.textContent = "Hold i finalen";
    finalsHeader.id = "finalsHeader";
    finalsDiv.appendChild(finalsHeader);
    for (let i = 0; i < numOfTeamsInFinals; i++) {
        let finalsMatchSelect = document.createElement("select");
        finalsMatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionFinals = new Option("Hold "+(i+1), "", true, true);
        defaultOptionFinals.disabled = true;
        finalsMatchSelect.add(defaultOptionFinals);
        finalsMatchSelect.style.margin = "5px";
        finalsMatchSelect.setAttribute('data-prev-value', finalsMatchSelect.value);
        for (const team of teams) {
            finalsMatchSelect.add(new Option(team));
            finalsMatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, finalsDiv);
                this.setAttribute('data-prev-value', this.value);
                handleTeamColoring();
            }
        }
        finalsDiv.appendChild(finalsMatchSelect);
    }
    outerDiv.appendChild(finalsDiv);

    //add winner
    let winnerDiv = document.createElement("div");
    winnerDiv.id = "winnerDiv";
    let winnerHeader = document.createElement("h2");
    winnerHeader.textContent = "Vinder";
    winnerHeader.id = "winnerHeader";
    winnerDiv.appendChild(winnerHeader);
    let winnerMatchSelect = document.createElement("select");
    winnerMatchSelect.type = "text";
    //add placeholder text and no selected option by default
    let defaultOptionWinner = new Option("Vinder", "", true, true);
    defaultOptionWinner.disabled = true;
    winnerMatchSelect.add(defaultOptionWinner);
    winnerMatchSelect.style.margin = "5px";
    for (const team of teams)
        winnerMatchSelect.add(new Option(team));
    winnerDiv.appendChild(winnerMatchSelect);
    outerDiv.appendChild(winnerDiv);   
}

function getHowFarDenmarkReaches() {
    tempTeamsList = []
    //atleast ro8
    ro8Div = document.getElementById("ro8Div");
    semiDiv = document.getElementById("semiDiv");
    finalsDiv = document.getElementById("finalsDiv");
    [ro8Div, semiDiv, finalsDiv].forEach(div => {
        div.querySelectorAll('select').forEach(select => {
            tempTeamsList.push(select.value);
        });
    });
    if (tempTeamsList.includes("Denmark")) {
        return "Mindst en kvartfinale";
    }
    
    //out in ro16
    ro16Div = document.getElementById("ro16Div");
    for (let select of ro16Div.querySelectorAll('select')) {
        if (select.value === "Denmark") {
            return "Ud i ottendedelsfinalerne";
        }
    }
    return "Ud i gruppespillet";
    //out in groups
    
}

function addHowFarDenmarkReaches() {
    let howFarDenmarkReachesDiv = document.createElement("div");
    let howFarDenmarkReachesHeader = document.createElement("h2");
    howFarDenmarkReachesHeader.textContent = "Hvor langt når Danmark (udfyldes automatisk)?";
    howFarDenmarkReachesHeader.style.display = 'inline-block';
    howFarDenmarkReachesHeader.style.marginRight = '10px';
    howFarDenmarkReachesHeader.id = "howFarDenmarkReachesHeader";
    let howFarDenmarkReachesResultElement = document.createElement("p");
    howFarDenmarkReachesResultElement.style.display = 'inline-block';
    howFarDenmarkReachesResultElement.id = "howFarDenmarkReachesResultElement";
    howFarDenmarkReachesResultElement.textContent = howFarDenmarkReachesResult;
    
    howFarDenmarkReachesDiv.appendChild(howFarDenmarkReachesHeader);
    howFarDenmarkReachesDiv.appendChild(howFarDenmarkReachesResultElement);
    
    document.body.appendChild(howFarDenmarkReachesDiv); 
}

function addTopGoalScorer() {
    let topGoalScorerDiv = document.createElement("div");
    topGoalScorerDiv.style.display = "flex";
    topGoalScorerDiv.style.alignItems = 'center';
    topGoalScorerDiv.id = "topGoalScorerDiv";
    let topGoalScorerHeader = document.createElement("h2");
    topGoalScorerHeader.textContent = "Topscorer: ";
    topGoalScorerHeader.style.display = 'inline-block';
    topGoalScorerHeader.style.marginRight = '10px';
    topGoalScorerHeader.id = "topGoalScorerHeader";
    let topGoalScorerInput = document.createElement("input");
    topGoalScorerInput.type = "text";
    topGoalScorerInput.placeholder = "Navn";
    topGoalScorerInput.style.height = "30px";
    topGoalScorerInput.style
    
    topGoalScorerDiv.appendChild(topGoalScorerHeader);
    topGoalScorerDiv.appendChild(topGoalScorerInput);
    document.body.appendChild(topGoalScorerDiv);
}

function addHowManyGoalsByPickedDane() {
    let daneScoringDiv = document.getElementById("daneScoringDiv");
    let daneToScoreInput = daneScoringDiv.querySelector('input');
    
    let daneScoringValue = daneToScoreInput.value;
    let howManyGoalsDaneScoresHeader = document.getElementById("howManyGoalsDaneScoresHeader");
    let howManyGoalsDaneScoresInput = document.getElementById("howManyGoalsDaneScoresInput");
    
    if (daneScoringValue === "") {
        howManyGoalsDaneScoresHeader.style.display = 'none';
        howManyGoalsDaneScoresInput.style.display = 'none';
    }
    
    else {
        howManyGoalsDaneScoresHeader.textContent = `... og hvor mange mål scorer ${daneScoringValue}:`;
        howManyGoalsDaneScoresHeader.style.display = 'inline-block';
        howManyGoalsDaneScoresInput.style.display = 'inline-block';
        showPointsInfo(howManyGoalsDaneScoresHeader,`1 point for at gætte antal mål ${daneScoringValue} scorer`);
    }
    
}

function addDaneToScore() {
    let daneScoringDiv = document.createElement("div");
    daneScoringDiv.id = "daneScoringDiv";
    daneScoringDiv.style.display = "block";
    daneScoringDiv.style.alignItems = 'center';
    let daneToScoreHeaderDiv = document.createElement("div");
    daneToScoreHeaderDiv.style.width = "100%";
    let daneToScoreHeader = document.createElement("h2");
    daneToScoreHeader.textContent = "Dansker der scorer:";
    daneToScoreHeader.id = "daneToScoreHeader";
    daneToScoreHeader.style.display = 'inline-block';
    daneToScoreHeader.style.marginRight = '10px';
    let daneToScoreInput = document.createElement("input");
    daneToScoreInput.type = "text";
    daneToScoreInput.placeholder = "Navn";
    daneToScoreInput.style.height = "30px";
    daneToScoreInput.onblur = addHowManyGoalsByPickedDane;
    
    daneToScoreHeaderDiv.appendChild(daneToScoreHeader);
    daneToScoreHeaderDiv.appendChild(daneToScoreInput);
    daneScoringDiv.appendChild(daneToScoreHeaderDiv);
    
    //add how many goals that dane scores
    let daneScoringValue = daneToScoreInput.value;
    let howManyGoalsDaneScoresHeaderDiv = document.createElement("div");
    howManyGoalsDaneScoresHeaderDiv.style.width = "100%";
    let howManyGoalsDaneScoresHeader = document.createElement("h2");
    howManyGoalsDaneScoresHeader.textContent = `... og hvor mange mål scorer ${daneScoringValue}:`;
    howManyGoalsDaneScoresHeader.style.display = 'block';
    howManyGoalsDaneScoresHeader.style.marginRight = '10px';
    howManyGoalsDaneScoresHeader.style.marginLeft = '10px';
    howManyGoalsDaneScoresHeader.id = "howManyGoalsDaneScoresHeader";
    howManyGoalsDaneScoresHeader.style.display = 'none';
    let howManyGoalsDaneScoresInput = document.createElement("input");
    howManyGoalsDaneScoresInput.type = "number";
    howManyGoalsDaneScoresInput.min = "1";
    howManyGoalsDaneScoresInput.onchange = function() {
        if (this.value < 1) {
            this.value = 1;
        }
    };
    howManyGoalsDaneScoresInput.placeholder = "Mål";
    howManyGoalsDaneScoresInput.style.height = "30px";
    howManyGoalsDaneScoresInput.id = "howManyGoalsDaneScoresInput";
    howManyGoalsDaneScoresInput.style.display = 'none';
    
    howManyGoalsDaneScoresHeaderDiv.appendChild(howManyGoalsDaneScoresHeader);
    howManyGoalsDaneScoresHeaderDiv.appendChild(howManyGoalsDaneScoresInput);
    daneScoringDiv.appendChild(howManyGoalsDaneScoresHeaderDiv);
    
    
    
    document.body.appendChild(daneScoringDiv);
}

function addPlayerToGetARedCard() {
    let playerToGetRedCardedDiv = document.createElement("div");
    playerToGetRedCardedDiv.style.display = "flex";
    playerToGetRedCardedDiv.style.alignItems = 'center';
    playerToGetRedCardedDiv.id = "playerToGetRedCardedDiv";
    let playerToGetRedCardedHeader = document.createElement("h2");
    playerToGetRedCardedHeader.textContent = "Spiller der får rødt kort: ";
    playerToGetRedCardedHeader.style.display = 'inline-block';
    playerToGetRedCardedHeader.style.marginRight = '10px';
    playerToGetRedCardedHeader.id = "playerToGetRedCardedHeader";
    let playerToGetRedCardedInput = document.createElement("input");
    playerToGetRedCardedInput.type = "text";
    playerToGetRedCardedInput.placeholder = "Navn";
    playerToGetRedCardedInput.style.height = "30px";
    playerToGetRedCardedInput.style
    
    playerToGetRedCardedDiv.appendChild(playerToGetRedCardedHeader);
    playerToGetRedCardedDiv.appendChild(playerToGetRedCardedInput);
    document.body.appendChild(playerToGetRedCardedDiv);
    
    
}


function addExtraTips() {
    addHowFarDenmarkReaches()
           
    addTopGoalScorer()
    addDaneToScore()
    addPlayerToGetARedCard()
}

function showPointsInfo(headerElem,text) {
    let pointsInfo = document.createElement("span");
    headerElem.style.position = 'relative';
    pointsInfo.textContent = text;
    pointsInfo.style.display = 'none';
    pointsInfo.style.position = 'absolute';
    pointsInfo.style.backgroundColor = '#f9f9f9';
    pointsInfo.style.border = '1px solid #ccc';
    pointsInfo.style.borderRadius = '4px';
    pointsInfo.style.padding = '5px';
    pointsInfo.style.zIndex = '1';
    pointsInfo.style.bottom = '100%';
    pointsInfo.style.left = '0';
    pointsInfo.style.marginLeft = '0';
    pointsInfo.style.width = '1000px';
    pointsInfo.style.textAlign = 'center';
    pointsInfo.style.bottom = '110%';
    pointsInfo.style.fontSize = '0.5em';
    pointsInfo.style.color = 'green';

    headerElem.appendChild(pointsInfo);

    headerElem.onmouseover = function() {
        pointsInfo.style.display = 'inline';
    };

    headerElem.onmouseout = function() {
        pointsInfo.style.display = 'none';
    };

}
      
function addPointsInfoOnHeaders() {
    let gruppespilsHeader = document.getElementById("gruppespilsHeader"); // 1 each
    showPointsInfo(gruppespilsHeader,"1 point for hvert korrekt gæt");
    
    let ro16Header = document.getElementById("ro16Header"); //1 for each
    showPointsInfo(ro16Header,"1 point for hvert rigtig gættet hold");
    let ro8Header = document.getElementById("ro8Header"); //1 for each
    showPointsInfo(ro8Header,"1 point for hvert rigtig gættet hold");
    let semiHeader = document.getElementById("semiHeader"); //1 for each
    showPointsInfo(semiHeader,"1 point for hvert rigtig gættet hold");
    let finalsHeader = document.getElementById("finalsHeader"); //2 for each
    showPointsInfo(finalsHeader,"2 point for hvert rigtig gættet hold");
    let winnerHeader = document.getElementById("winnerHeader"); //1
    showPointsInfo(winnerHeader,"1 point for at gætte vinderen");
    
    
    let howFarDenmarkReachesHeader = document.getElementById("howFarDenmarkReachesHeader"); //2
    showPointsInfo(howFarDenmarkReachesHeader,"2 point for at gætte hvor langt Danmark når");
    let topGoalScorerHeader = document.getElementById("topGoalScorerHeader"); //2
    showPointsInfo(topGoalScorerHeader,"2 point for at gætte topscoreren");
    let daneToScoreHeader = document.getElementById("daneToScoreHeader"); //1
    showPointsInfo(daneToScoreHeader,"1 point for at gætte en dansker der scorer");
    //how many goals he scores is done in another function as this text is not always shown 
    let playerToGetRedCardedHeader = document.getElementById("playerToGetRedCardedHeader"); //2
    showPointsInfo(playerToGetRedCardedHeader,"2 point for at gætte en spiller der får rødt kort");
    
    

}  
    
    
function setup() {
    addButtons()
    addNameField()
    addReferenceContainer()
    addMatches()
    addTeamTips()
    addExtraTips()
    addPointsInfoOnHeaders()
    
    load()
}