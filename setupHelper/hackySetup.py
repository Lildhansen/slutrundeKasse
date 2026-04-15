import pyperclip
#set path to be one above from where this python file is located
import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
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