//note:
    //make it possible to save the state of the tipskupon (just a save button)
    //add rest of the tipskupon

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
const scoreOptions = ["1","x","2","1x","x2","1x2"]

let sikreTips = 20
let halvGarderinger = 10
let helGarderinger = 6


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
    document.body.appendChild(exportButton); // Append the button to the body
}

function addButtons() {
    addSaveButton()
    addExportButton()
}

function blockTippingForSelectedOptions(options) {
    allSelects = document.getElementsByClassName("resultSelecter");
    for (const select of allSelects) {
        for (const option of options) {
            for (const selectOption of select.options) {
                if (selectOption.value === option) {
                    selectOption.disabled = true;
                }
            }
        }
    }
}

function unBlockTippingForSelectedOptions(options) {
    allSelects = document.getElementsByClassName("resultSelecter");
    for (const select of allSelects) {
        for (const option of options) {
            for (const selectOption of select.options) {
                if (selectOption.value === option) {
                    selectOption.disabled = false;
                }
            }
        }
    }
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
    
    //update the numbers
    sikreTipsNumber.textContent = sikreTips;
    halvGarderingerNumber.textContent = halvGarderinger;
    helGarderingerNumber.textContent = helGarderinger;
    
    //ensure that numbers does not get below zero
    if (sikreTips === 0) {
        sikreTipsNumber.style.color = "red";
        blockTippingForSelectedOptions(["1","x","2"]);
    } else {
        sikreTipsNumber.style.color = "black";
        unBlockTippingForSelectedOptions(["1","x","2"]);
    }

    if (halvGarderinger === 0) {
        halvGarderingerNumber.style.color = "red";
        blockTippingForSelectedOptions(["1x","x2"]);
    } else {
        halvGarderingerNumber.style.color = "black";
        unBlockTippingForSelectedOptions(["1x","x2"]);
    }

    if (helGarderinger === 0) {
        helGarderingerNumber.style.color = "red";
        blockTippingForSelectedOptions(["1x2"]);
    } else {
        helGarderingerNumber.style.color = "black";
        unBlockTippingForSelectedOptions(["1x2"]);
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
    
function setup() {
    addButtons()
    addRemainingTipsContainer()
    addMatches()
    
    //if there is a saved state, load it
}