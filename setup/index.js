
//note:
//fix save button
//fix export button
//also update the requirements for exporting (all must be filled out)

//howManyGoalsDaneScoresHeader should be in a line below

//maybe add that when you select a team in the knockout stage, the teams in the group reference are colored green
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
const matches =  [new Match('Germany','Scotland','Group A'),new Match('Hungary','Switzerland','Group A'),new Match('Spain','Croatia','Group B'),new Match('Italy','Albania','Group B'),new Match('Poland','Netherlands','Group D'),new Match('Slovenia','Denmark','Group C'),new Match('Serbia','England','Group C'),new Match('Romania','Ukraine','Group E'),new Match('Belgium','Slovakia','Group E'),new Match('Austria','France','Group D'),new Match('Türkiye','Georgia','Group F'),new Match('Portugal','Czechia','Group F'),new Match('Croatia','Albania','Group B'),new Match('Germany','Hungary','Group A'),new Match('Scotland','Switzerland','Group A'),new Match('Slovenia','Serbia','Group C'),new Match('Denmark','England','Group C'),new Match('Spain','Italy','Group B'),new Match('Slovakia','Ukraine','Group E'),new Match('Poland','Austria','Group D'),new Match('Netherlands','France','Group D'),new Match('Georgia','Czechia','Group F'),new Match('Türkiye','Portugal','Group F'),new Match('Belgium','Romania','Group E'),new Match('Switzerland','Germany','Group A'),new Match('Scotland','Hungary','Group A'),new Match('Albania','Spain','Group B'),new Match('Croatia','Italy','Group B'),new Match('Netherlands','Austria','Group D'),new Match('France','Poland','Group D'),new Match('England','Slovenia','Group C'),new Match('Denmark','Serbia','Group C'),new Match('Slovakia','Romania','Group E'),new Match('Ukraine','Belgium','Group E'),new Match('Georgia','Portugal','Group F'),new Match('Czechia','Türkiye','Group F'),];
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

let sikreTips = 20
let halvGarderinger = 10
let helGarderinger = 6
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
      
    randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    elem.textContent += randomMessage;
}


//adding stuff

function addNameField() {
    let nameField = document.createElement("input");
    nameField.type = "text";
    nameField.id = "nameField";
    nameField.placeholder = "Indtast navn her";
    nameField.style.position = "absolute";
    nameField.style.top = "0";
    nameField.style.left = "150px"; // Adjust this value
    document.body.appendChild(nameField);
}

function addSaveButton() {
    let saveButton = document.createElement("button");
    saveButton.textContent = "Gem";
    saveButton.style.position = "absolute";
    saveButton.style.top = "0";
    saveButton.style.left = "0";
    saveButton.onclick = save;
    document.body.appendChild(saveButton); // Append the button to the body
}

function addExportButton() {
    let exportButton = document.createElement("button");
    exportButton.textContent = "Exporter";
    exportButton.style.position = "absolute";
    exportButton.style.top = "0";
    exportButton.style.left = "50px";
    exportButton.onclick = exportTipskupon;
    document.body.appendChild(exportButton); // Append the button to the body
}

function addButtons() {
    addSaveButton()
    addExportButton()
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
    localStorage.setItem('topGoalScorerValue', topGoalScorerValue);
    localStorage.setItem('daneToScoreValue', daneToScoreValue);
    localStorage.setItem('howManyGoalsDaneScoresValue', howManyGoalsDaneScoresValue);
    localStorage.setItem('playerToGetRedCardedValue', playerToGetRedCardedValue);
    
    //add toast message
    showToast("Din tipskupon er gemt succesfuldt!");
    
    
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
        
        

    //mangler at opdatere de eksluderede hold i knockout fasen (pt kan man vælge tyskland og så gemme og så når man loader kan man vælge tyskland igen)
    //mangler at opdatere de resterende tips
    //måske bare lav en funktion der opdaterer disse ting og så kald dem i de her cases, og de eksisterende cases
}


function exportTipskupon() {
    let nameField = document.getElementById("nameField");
    if (nameField.value === "") {
        showToast("Du skal udfylde navn før du kan eksportere!");
        return;
    }
    if (sikreTips > 0 || halvGarderinger > 0 || helGarderinger > 0) {
        showToast("Du har ikke brugt alle dine tips!");
        return;
    }
    if (sikreTips < 0 || halvGarderinger < 0 || helGarderinger < 0) {
        showToast("Du overskrider grænsen for en slags tips!");
        return;
    }
    //also more checks should be added
    //check if all matches are filled out (and the numbers are 0 - this should be enough)
    
}

function updateRemainingTips(prevValue, currentValue) {
    if (prevValue !== "")
    switch (prevValue) {
        case "1":
        case "x":
        case "2":
            sikreTips += 1;
            break;
        case "1x":
        case "x2":
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
            halvGarderinger -= 1;
            break;
        case "1x2":
            helGarderinger -= 1;
            break;
    }
    
    let sikreTipsNumber = document.getElementById("sikreTipsNumber");
    let halvGarderingerNumber = document.getElementById("halvGarderingerNumber");
    let helGarderingerNumber = document.getElementById("helGarderingerNumber");
    
    //handle number coloring
    let tipDictionary = {[sikreTips]: sikreTipsNumber, [halvGarderinger]: halvGarderingerNumber, [helGarderinger]: helGarderingerNumber};
    
    for (let [tipType, tipTypeObject] of Object.entries(tipDictionary)) {
        if (tipType == 0) {
            tipTypeObject.style.color = "green";
        } 
        else if (tipType < 0) {
            tipTypeObject.style.color = "red";
        }
        else {
            tipTypeObject.style.color = "black";
        }
    }
    
    
    //update the numbers
    sikreTipsNumber.textContent = sikreTips;
    halvGarderingerNumber.textContent = halvGarderinger;
    helGarderingerNumber.textContent = helGarderinger;   
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
        for (let team of getTeamsInGroup(group)) {
            groupText.textContent += team + ", ";
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
    const allMatchesDiv = document.getElementById("matchesContainer")
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
        //pass in the previous value and the current value when the value changes
        resultSelecter.onchange = function() {
            let prevValue = this.getAttribute('data-prev-value'); // Get the previous value
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
}

function addTeamTips() {
    let outerDiv = document.createElement("div");
    outerDiv.style.display = "flex";
    outerDiv.style.flexDirection = "column";
    outerDiv.style.width = "50%";
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
    daneScoringDiv.style.display = "flex";
    daneScoringDiv.style.alignItems = 'center';
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
    
    daneScoringDiv.appendChild(daneToScoreHeader);
    daneScoringDiv.appendChild(daneToScoreInput);
    
    //add how many goals that dane scores
    let daneScoringValue = daneToScoreInput.value;
    let howManyGoalsDaneScoresHeader = document.createElement("h2");
    howManyGoalsDaneScoresHeader.textContent = `... og hvor mange mål scorer ${daneScoringValue}:`;
    howManyGoalsDaneScoresHeader.style.display = 'inline-block';
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
    daneScoringDiv.appendChild(howManyGoalsDaneScoresHeader);
    daneScoringDiv.appendChild(howManyGoalsDaneScoresInput);
   
    
    
    
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
    addNameField()
    addButtons()
    addReferenceContainer()
    addMatches()
    addTeamTips()
    addExtraTips()
    addPointsInfoOnHeaders()
    //if there is a saved state, load it
    
    load()
}