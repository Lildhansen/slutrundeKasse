class Player:
    def __init__(self, name):
        self.name = name
        self.groupMatchGames = []
        self.ro16Teams = []
        self.ro8Teams = []
        self.quarterFinalTeams = []
        self.semiFinalTeams = []
        self.finalTeams = []
        self.winner = None
        self.topScorer = None
        self.daneToScore = None
        self.howManyGoalsByDane = None
        self.redCardedPlayer = None