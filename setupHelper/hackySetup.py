import pandas as pd
import pyperclip

class Match:
    def __init__(self,homeTeam,awayTeam,group):
        self.homeTeam = homeTeam
        self.awayTeam = awayTeam
        self.group = group
    def __str__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group
    def __repr__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group

def updateJSFile():
    with open('../setup/index.js', 'r') as originalJsFile:
        jsFileData = originalJsFile.read()
    with open('../setup/index.js', 'w',encoding='utf-8') as modifiedJsFile:
        
        matchesRaw = pd.read_csv("matches.csv")
        allMatches = []
        for index, row in matchesRaw.iterrows():
            match = Match(row['home team'],row['away team'],row['group'])
            allMatches.append(match)
        print(allMatches)
        newData = "const matches =  ["
        for match in allMatches:
            newData += "new Match('" + match.homeTeam + "','" + match.awayTeam + "','" + match.group + "'),"
        newData += "];\n"
        modifiedJsFile.write(newData + jsFileData)
        
def saveToClipboard():
    matchesRaw = pd.read_csv("matches.csv")
    allMatches = []
    for index, row in matchesRaw.iterrows():
        match = Match(row['home team'],row['away team'],row['group'])
        allMatches.append(match)
    print(allMatches)
    newData = "const matches =  ["
    for match in allMatches:
        newData += "new Match('" + match.homeTeam + "','" + match.awayTeam + "','" + match.group + "'),"
    newData += "];\n"
    pyperclip.copy(newData) 
    print(newData)     


saveToClipboard()