import pandas as pd

class Match:
    def __init__(self,homeTeam,awayTeam,group):
        self.homeTeam = homeTeam
        self.awayTeam = awayTeam
        self.group = group
        self.number = None
        self.homeScore = None
        self.awayScore = None
        self.date = None
        self.result = None #1x2
    def __str__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group
    def __repr__(self):
        return self.homeTeam + " vs " + self.awayTeam + " in group " + self.group
    def excelPrint(self):
        return self.homeTeam + " - " + self.awayTeam
    def prettyPrint(self):
        print(f"{self.number}: {self.homeTeam} {self.homeScore} - {self.awayScore} {self.awayTeam} ({self.group}) ({self.date}) ({self.result})")
    def __eq__(self, other):
        return self.homeTeam == other.homeTeam and self.awayTeam == other.awayTeam

def loadMatchesFromCsv():
    matchesRaw = pd.read_csv("matches.csv")
    allMatches = []
    for index, row in matchesRaw.iterrows():
        match = Match(row['home team'],row['away team'],row['group'])
        allMatches.append(match)
    return allMatches