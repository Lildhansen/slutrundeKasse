import pyperclip
from main.classes.Match import loadMatchesFromCsv
        
def saveToClipboard():
    allMatches = loadMatchesFromCsv()
    newData = "const matches =  ["
    for match in allMatches:
        newData += "new Match('" + match.homeTeam + "','" + match.awayTeam + "','" + match.group + "'),"
    newData += "];\n"
    pyperclip.copy(newData) 
    print(newData)     


saveToClipboard()