import pandas as pd

class Match:
    def __init__(self,homeTeam,awayTeam,group):
        self.homeTeam = homeTeam
        self.awayTeam = awayTeam
        self.group = group
    def __str__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group
    def __repr__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group
    def excelPrint(self):
        return self.homeTeam + " - " + self.awayTeam

def loadMatchesFromCsv():
    matchesRaw = pd.read_csv("matches.csv")
    allMatches = []
    for index, row in matchesRaw.iterrows():
        match = Match(row['home team'],row['away team'],row['group'])
        allMatches.append(match)
    return allMatches