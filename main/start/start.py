#own imports
from main.classes.Player import Player
from main.classes.Team import Team
from main.classes.Excel import setupExcelFile
from main.classes.Email import sendInitialEmail

# non-own imports
import orjson
import os
import pandas as pd
from configparser import ConfigParser


def loadPlayers():
    players = []
    for file in os.listdir('main/data/players'):
        player = None
        if file.endswith('.json'):
            with open(f'main/data/players/{file}', 'r',encoding='utf-8') as f:
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

def createStandingsForTeams():
    teams = []
    matchesRaw = pd.read_csv("matches.csv")
    for index, row in matchesRaw.iterrows():
        if not any(team.name == row['home team'] for team in teams):
            teams.append(Team(row['home team'],row['group'])) 
        if not any(team.name == row['away team'] for team in teams):
            teams.append(Team(row['away team'],row['group']))
    #add all teams to the standings json file:
    # with open('main/data/standings.json','w',encoding='utf-8') as f:
    #     f.write(orjson.dumps([team.__dict__ for team in teams]).decode('utf-8'))
                

def setup():
    config = ConfigParser()
    players = loadPlayers()
    # Create empty matches_covered.txt (overwrite if it exists)
    open('main/data/matches_covered.txt', 'w').close()
    # Excel setup
    if ('main/data/slutrundeKasse.xlsx' not in os.listdir()):
        setupExcelFile(players)
    else:
        print("Slutrundekasse exists!")
    config.read('main/email.ini')
    if (not config.getboolean('email_config','initialemailsent')):
        willSendInitialEmail = False
        while (True):
            userInput = input("Is the Email.ini file set up and do you want to send the initial email? (y/n): ")
            if len(userInput) > 0 and userInput.lower()[0] == 'y':
                willSendInitialEmail = True
                break
            elif len(userInput) > 0 and userInput.lower()[0] == 'n':
                break
        if willSendInitialEmail:
            sendInitialEmail()
    # if ('main/data/standings.json' not in os.listdir()):
    #     createStandingsForTeams()
    
       
            
if __name__ == '__main__':
    setup()