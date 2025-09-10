import pyperclip
from main.classes.Match import loadMatchesFromCsv
        
def saveToClipboard():
    allMatches = loadMatchesFromCsv()
    newData = "const matches =  ["
    for match in allMatches:
        print(match.homeTeam, "vs", match.awayTeam, "in group", match.group)
        newData += "new Match('" + match.homeTeam + "','" + match.awayTeam + "','" + match.group + "'),"
    newData += "];\n"
    pyperclip.copy(newData) 
    print(newData)     


saveToClipboard()