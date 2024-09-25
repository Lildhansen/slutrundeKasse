//note:
    //make it possible to save the state of the tipskupon (just a save button) (do this later)
    //add rest of the tipskupon
    //add groups such that you can close all gruppekampe (as well as for the knockout stuff)
    //add some way to see the scores of each tip (maybe just a legend in the right side)
    
    //maybe add some reference where you can see all the groups and the teams in them
    //maybe try to create a way for this js file to read from the csv (and replace the sketchy python script)
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

let sikreTips = 20
let halvGarderinger = 10
let helGarderinger = 6

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

function addNameField() {
    let nameField = document.createElement("input");
    nameField.type = "text";
    nameField.id = "nameField";
    nameField.placeholder = "Navn";
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

function save() {
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
        console.log(tipType)
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
    
    
    
    
}




function addRemainingTipsContainer() {
    // Create the overall container
    let remainingTipsContainer = document.createElement("div");
    remainingTipsContainer.style.position = "fixed";
    remainingTipsContainer.style.top = "0";
    remainingTipsContainer.style.right = "0";
    remainingTipsContainer.style.width = "20%";
    remainingTipsContainer.style.border = "2px solid black";
    document.body.appendChild(remainingTipsContainer);

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
}


function addMatches() {
    const allMatchesDiv = document.getElementById("matchesContainer")
    allMatchesDiv.style.flexDirection = "column";
    allMatchesDiv.style.alignItems = "center"; // This will horizontally center the matchDiv
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
    // outerDiv.style.alignItems = "center";
    // outerDiv.style.justifyContent = "center";
    document.body.appendChild(outerDiv);
    
    //add ro16
    let ro16Div = document.createElement("div");
    ro16Div.id = "ro16Div";
    let ro16Header = document.createElement("h2");
    ro16Header.textContent = "Hold i ottendedelsfinalerne";
    ro16Div.appendChild(ro16Header);
    for (let i = 0; i < 8; i++) {
        let ro16MatchSelect = document.createElement("select");
        ro16MatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionRo16 = new Option("Hold "+(i+1), "", true, true);
        defaultOptionRo16.disabled = true;
        ro16MatchSelect.add(defaultOptionRo16);
        ro16MatchSelect.style.margin = "5px";
        for (const team of teams) {
            ro16MatchSelect.add(new Option(team));
            ro16MatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, ro16Div);
            };
        }
        ro16Div.appendChild(ro16MatchSelect);
    }
    outerDiv.appendChild(ro16Div);
    //add ro8
    let ro8Div = document.createElement("div");
    ro8Div.id = "ro8Div";
    let ro8Header = document.createElement("h2");
    ro8Header.textContent = "Hold i kvartfinalerne";
    ro8Div.appendChild(ro8Header);
    for (let i = 0; i < 4; i++) {
        let ro8MatchSelect = document.createElement("select");
        ro8MatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionRo8 = new Option("Hold "+(i+1), "", true, true);
        defaultOptionRo8.disabled = true;
        ro8MatchSelect.add(defaultOptionRo8);
        ro8MatchSelect.style.margin = "5px";
        for (const team of teams) {
            ro8MatchSelect.add(new Option(team));
            ro8MatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, ro8Div);
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
    semiDiv.appendChild(semiHeader);
    for (let i = 0; i < 2; i++) {
        let semiMatchSelect = document.createElement("select");
        semiMatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionSemis = new Option("Hold "+(i+1), "", true, true);
        defaultOptionSemis.disabled = true;
        semiMatchSelect.add(defaultOptionSemis);
        semiMatchSelect.style.margin = "5px";
        for (const team of teams) {
            semiMatchSelect.add(new Option(team));
            semiMatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, semiDiv);
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
    finalsDiv.appendChild(finalsHeader);
    for (let i = 0; i < 2; i++) {
        let finalsMatchSelect = document.createElement("select");
        finalsMatchSelect.type = "text";
        //add placeholder text and no selected option by default
        let defaultOptionFinals = new Option("Hold "+(i+1), "", true, true);
        defaultOptionFinals.disabled = true;
        finalsMatchSelect.add(defaultOptionFinals);
        finalsMatchSelect.style.margin = "5px";
        for (const team of teams) {
            finalsMatchSelect.add(new Option(team));
            finalsMatchSelect.onchange = function() {
                handleKnockoutSelectInput(this, finalsDiv);
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

function addExtraTips() {
    //add how far dk reaches (this should be autofilled based on the teams selected)
    
    //add top goal scorer
    
    //maybe add danish guy to score
    
    //maybe add someone who gets red card
    
    
    
}
    
function setup() {
    console.log(teams)
    addNameField()
    addButtons()
    addRemainingTipsContainer()
    addMatches()
    addTeamTips()
    //if there is a saved state, load it
}