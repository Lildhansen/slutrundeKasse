#own imports
from main.classes.Player import Player
from main.classes.Excel import setupExcelFile
from main.classes.Email import sendInitialEmail

# non-own imports
import orjson
import os


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
                

def setup():
    players = loadPlayers()
    setupExcelFile(players)
    sendInitialEmail()
    #maybe need to add something so u can start but add the emails later (and then send the initial email later)
        #just take inspiration from feriekasse
    
       
            
if __name__ == '__main__':
    setup()