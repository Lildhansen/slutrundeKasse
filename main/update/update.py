

import datetime
import requests, json, os
import main.classes.Excel as Excel

#CONSTANTS
groupStageSlugName = "group-stage"
ro32SlugName = "round-of-32"
ro16SlugName = "round-of-16"
quarterFinalsSlugName = "quarterfinals"
semiFinalsSlugName = "semifinals"
finalSlugName = "final"

#config variables
firstDayOfTournament = datetime.datetime(year=2022, month=11, day=20)
tournamentType = "fifa.world"
firstKnockoutType = ro16SlugName

#global variables
groupStageMatches = []
teamsInRo32 = []
teamsInRo16 = []
teamsInRo8 = []
teamsInSemiFinals = []
teamsInFinal = []
global winnerTeam
winnerTeam = None
matchesCovered = []

url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{tournamentType}/teams"
resp = requests.get(url)
data = resp.json()

team_ids = []
team_names = []

def handleGroupStageMatchesOnDay(date):
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{tournamentType}/scoreboard?dates={date.strftime('%Y%m%d')}"
    resp = requests.get(url)
    data = resp.json()

    for event in data.get("events", []):
        if event["season"]["slug"] != "group-stage":
            print("Reached past group stage")
            return None
        competition = event["competitions"][0]
        if competition["status"]["type"]["state"] != "post":
            print("Skipping non-completed match")
            continue
        
        home = competition["competitors"][0]
        away = competition["competitors"][1]

        # Determine winner
        if home.get("winner"):
            result = "1"
        elif away.get("winner"):
            result = "2"
        else:
            result = "x"

        groupStageMatches.append({
            "home": home["team"]["displayName"],
            "away": away["team"]["displayName"],
            "result": result
        })

def handleKnockoutMatchesOnDay(date, knockoutType):
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{tournamentType}/scoreboard?dates={date.strftime('%Y%m%d')}"
    resp = requests.get(url)
    data = resp.json()

    for event in data.get("events", []):
        event_id = event["id"]
        
            
        if event["season"]["slug"] != knockoutType:
            return None
        competition = event["competitions"][0]
        if competition["status"]["type"]["state"] != "post":
            print("Skipping non-completed match")
            continue

        
        home = competition["competitors"][0]
        away = competition["competitors"][1]

        #populate first knockout type
        if event['season']['slug'] == firstKnockoutType:
            teamsInRo16.append(home["team"]["displayName"]) #should be ro32 for 2026
            teamsInRo16.append(away["team"]["displayName"]) #should be ro32 for 2026

        # Determine winner
        if home.get("winner"):
            winner = home["team"]["displayName"]
        elif away.get("winner"):
            winner = away["team"]["displayName"]
        else:
            raise Exception("Knockout match with id ", event_id, "cannot end in a draw")
        addToCorrectKnockoutTeamList(winner, knockoutType)
        

def addToCorrectKnockoutTeamList(winningTeam, knockoutType):
    global winnerTeam
    if knockoutType == ro32SlugName:
        teamsInRo16.append(winningTeam)
    elif knockoutType == ro16SlugName:
        teamsInRo8.append(winningTeam)
    elif knockoutType == quarterFinalsSlugName:
        teamsInSemiFinals.append(winningTeam)
    elif knockoutType == semiFinalsSlugName:
        teamsInFinal.append(winningTeam)
    elif knockoutType == finalSlugName:
        winnerTeam = winningTeam


def getMatchTypeOnDate(date):
    print(date)
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/{tournamentType}/scoreboard?dates={date.strftime('%Y%m%d')}"
    resp = requests.get(url)
    data = resp.json()

    for event in data.get("events", []):
        return event["season"]["slug"]
    return None #no matches on that date

def updatePreviousDateRun(date):
    # Accepts a date or datetime, always writes as full datetime
    if isinstance(date, datetime.date) and not isinstance(date, datetime.datetime):
        # Convert date to datetime for consistency
        date = datetime.datetime.combine(date, datetime.time.min)
    with open("main/data/previousDateRun.txt", "w") as f:
        f.write(date.strftime("%Y-%m-%d %H:%M:%S"))

def loadPreviousDateRun():
    if os.path.exists("main/data/previousDateRun.txt"):
        with open("main/data/previousDateRun.txt", "r") as f:
            date_str = f.read().strip()
            # Always return a datetime.datetime object
            if date_str:
                return datetime.datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
    return firstDayOfTournament
        
#for 2026 this should be getRo32Teams():

def setTestData():
    global groupStageMatches, teamsInRo16, teamsInRo8, teamsInSemiFinals, teamsInFinal, winnerTeam
    # Hardcoded tournament data
    groupStageMatches = [
        {'home': 'Qatar', 'away': 'Ecuador', 'result': '2'}, {'home': 'England', 'away': 'Iran', 'result': '1'},
        {'home': 'Senegal', 'away': 'Netherlands', 'result': '2'}, {'home': 'United States', 'away': 'Wales', 'result': 'x'},
        {'home': 'Argentina', 'away': 'Saudi Arabia', 'result': '2'}, {'home': 'Denmark', 'away': 'Tunisia', 'result': 'x'},
        {'home': 'Mexico', 'away': 'Poland', 'result': 'x'}, {'home': 'France', 'away': 'Australia', 'result': '1'},
        {'home': 'Morocco', 'away': 'Croatia', 'result': 'x'}, {'home': 'Germany', 'away': 'Japan', 'result': '2'},
        {'home': 'Spain', 'away': 'Costa Rica', 'result': '1'}, {'home': 'Belgium', 'away': 'Canada', 'result': '1'},
        {'home': 'Switzerland', 'away': 'Cameroon', 'result': '1'}, {'home': 'Uruguay', 'away': 'South Korea', 'result': 'x'},
        {'home': 'Portugal', 'away': 'Ghana', 'result': '1'}, {'home': 'Brazil', 'away': 'Serbia', 'result': '1'},
        {'home': 'Wales', 'away': 'Iran', 'result': '2'}, {'home': 'Qatar', 'away': 'Senegal', 'result': '2'},
        {'home': 'Netherlands', 'away': 'Ecuador', 'result': 'x'}, {'home': 'England', 'away': 'United States', 'result': 'x'},
        {'home': 'Tunisia', 'away': 'Australia', 'result': '2'}, {'home': 'Poland', 'away': 'Saudi Arabia', 'result': '1'},
        {'home': 'France', 'away': 'Denmark', 'result': '1'}, {'home': 'Argentina', 'away': 'Mexico', 'result': '1'},
        {'home': 'Japan', 'away': 'Costa Rica', 'result': '2'}, {'home': 'Belgium', 'away': 'Morocco', 'result': '2'},
        {'home': 'Croatia', 'away': 'Canada', 'result': '1'}, {'home': 'Spain', 'away': 'Germany', 'result': 'x'},
        {'home': 'Cameroon', 'away': 'Serbia', 'result': 'x'}, {'home': 'South Korea', 'away': 'Ghana', 'result': '2'},
        {'home': 'Brazil', 'away': 'Switzerland', 'result': '1'}, {'home': 'Portugal', 'away': 'Uruguay', 'result': '1'},
        {'home': 'Ecuador', 'away': 'Senegal', 'result': '2'}, {'home': 'Netherlands', 'away': 'Qatar', 'result': '1'},
        {'home': 'Iran', 'away': 'United States', 'result': '2'}, {'home': 'Wales', 'away': 'England', 'result': '2'},
        {'home': 'Australia', 'away': 'Denmark', 'result': '1'}, {'home': 'Tunisia', 'away': 'France', 'result': '1'},
        {'home': 'Poland', 'away': 'Argentina', 'result': '2'}, {'home': 'Saudi Arabia', 'away': 'Mexico', 'result': '2'},
        {'home': 'Canada', 'away': 'Morocco', 'result': '2'}, {'home': 'Croatia', 'away': 'Belgium', 'result': 'x'},
        {'home': 'Costa Rica', 'away': 'Germany', 'result': '2'}, {'home': 'Japan', 'away': 'Spain', 'result': '1'},
        {'home': 'Ghana', 'away': 'Uruguay', 'result': '2'}, {'home': 'South Korea', 'away': 'Portugal', 'result': '1'},
        {'home': 'Cameroon', 'away': 'Brazil', 'result': '1'}, {'home': 'Serbia', 'away': 'Switzerland', 'result': '2'}
    ]
    teamsInRo32 = []
    teamsInRo16 = ['Netherlands', 'United States', 'Argentina', 'Australia', 'France', 'Poland', 'England', 'Senegal', 'Japan', 'Croatia', 'Brazil', 'South Korea', 'Morocco', 'Spain', 'Portugal', 'Switzerland']
    teamsInRo8 = ['Netherlands', 'Argentina', 'France', 'England', 'Croatia', 'Brazil', 'Morocco', 'Portugal']
    teamsInSemiFinals = ['Croatia', 'Argentina', 'Morocco', 'France']
    teamsInFinal = ['Argentina', 'France']
    winnerTeam = 'Argentina' 



if __name__ == "__main__":
    currentDate = datetime.datetime.today() #set it to other day for testing
    currentDate = datetime.datetime(year=2022, month=12, day=18) #last day of world cup 2022
    # initially is the previous date run (or the first day of the tournament), but is the one we use to increment up to current date
    # previousDateRun = loadPreviousDateRun()
    # while previousDateRun is not None and previousDateRun <= currentDate:
    #     matchType = getMatchTypeOnDate(previousDateRun.date())
    #     if matchType == groupStageSlugName:
    #         handleGroupStageMatchesOnDay(previousDateRun)
    #     elif matchType == "3rd-place": #ignore 3rd place match
    #         pass
    #     elif matchType == None:
    #         print("No matches on date", previousDateRun)
    #         pass
    #     else:
    #         shouldGetRo16Teams = True
    #         handleKnockoutMatchesOnDay(previousDateRun, matchType)
    #     previousDateRun += datetime.timedelta(days=1)

    setTestData() #comment out to use live data
    
    Excel.updateExcelFile(groupStageMatches, teamsInRo16, teamsInRo8, teamsInSemiFinals, teamsInFinal, winnerTeam)
    # updatePreviousDateRun(currentDate)
    print("Group stage matches:", groupStageMatches)
    print("Teams in round of 16:", teamsInRo16)
    print("Teams in quarter finals:", teamsInRo8)
    print("Teams in semi finals:", teamsInSemiFinals)
    print("Teams in final:", teamsInFinal)
    print("Winner team:", winnerTeam)



        

