#own imports
from main.classes.Player import Player

# non-own imports
import orjson
import os
import openpyxl
from openpyxl.styles import Font, Color 


def loadPlayers():
    players = []
    for file in os.listdir('main/data'):
        player = None
        if file.endswith('.json'):
            with open(f'main/data/{file}', 'r',encoding='utf-8') as f:
                data = orjson.loads(f.read())
            player = Player(data['nameValue'])
            player.groupMatchGames = data['matchValues']
            player.ro16Teams = data['ro16Values']
            player.ro8Teams = data['ro8Values']
            player.quarterFinalTeams = data['ro8Values']  
            player.semiFinalTeams = data['semiValues']
            player.finalTeams = data['finaleValues']
            player.winner = data['winnerValue']
            player.topScorer = data['topGoalScorerValue']
            player.daneToScore = data['daneToScoreValue']
            player.howManyGoalsByDane = data['howManyGoalsDaneScoresValue']
            player.redCardedPlayer = data['playerToGetRedCardedValue']
        players.append(player)
    return players
                
def setupExcelFile():
    pass

def setup():
    players = loadPlayers()
    for player in players:
        print(player.__dict__)
    setupExcelFile()
       
            
if __name__ == '__main__':
    setup()