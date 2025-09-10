
##todo:
    # prompt user for results
    # update standings
    # update excel file
    # send email
    
    #if all results are in:
        #update team who goes through
        #update excel file
        #send email
        
import datetime
import requests, json, os

#gloabl variables
newMatches = []
matchesCovered = []

url = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams"
resp = requests.get(url)
data = resp.json()

team_ids = []
team_names = []

# # Navigate through the JSON
# for sport in data.get("sports", []):
#     for league in sport.get("leagues", []):
#         for team_entry in league.get("teams", []):
#             team = team_entry.get("team", {})
#             team_ids.append(team.get("id"))
#             team_names.append(team.get("displayName"))

# # Print results
# for tid, name in zip(team_ids, team_names):
#     print(f"{name}: {tid}")


# team_id = 2869
# url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams/{team_id}/schedule"

# resp = requests.get(url)
# data = resp.json()

# for event in data.get("events", []):
#     comp = event["competitions"][0]
#     home = comp["competitors"][0]
#     away = comp["competitors"][1]
    
#     # Determine winner
#     if home.get("winner"):
#         winner = home["team"]["displayName"]
#     elif away.get("winner"):
#         winner = away["team"]["displayName"]
#     else:
#         winner = "Draw"
    
#     print(f"{event['date'][:10]}: {home['team']['displayName']} vs {away['team']['displayName']} → Winner: {winner}")

# # --- SETTINGS ---
# teams_url = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams"
# seen_file = "seen_matches.json"

# # Load previously seen matches
# if os.path.exists(seen_file):
#     with open(seen_file, "r") as f:
#         seen_matches = set(json.load(f))
# else:
#     seen_matches = set()

# new_matches = []

# # Get all team IDs
# resp = requests.get(teams_url)
# teams_data = resp.json()

# i = 0
# team_ids = [2869]
# for sport in teams_data.get("sports", []):
#     for league in sport.get("leagues", []):
#         for t in league.get("teams", []):
#             team_ids.append(t["team"]["id"])
#             i += 1
#             if i == 10:
#                 break

# Fetch matches for each team
# def handleGroupStageMatchesForTeam(event, teamId):
#     url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams/{teamId}/schedule"
#     resp = requests.get(url)
#     data = resp.json()
#     for event in data.get("events", []):
#         event_id = event["id"]
#         # Skip if already seen
#         if event_id in seen_matches:
#             continue
            
#         if event["seasonType"]["name"] != "Group Stage":
#             print("Skipping non-group stage match")
#             continue
#         competition = event["competitions"][0]
#         if competition["status"]["type"]["state"] != "post":
#             print("Skipping non-completed match")
#             continue
        
#         home = competition["competitors"][0]
#         away = competition["competitors"][1]
def handleGroupStageMatchesOnDay(date):
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates={date.strftime('%Y%m%d')}"
    resp = requests.get(url)
    data = resp.json()

    for event in data.get("events", []):
        event_id = event["id"]
        
            
        if event["season"]["slug"] != "group-stage":
            print("Skipping non-group stage match")
            continue
        competition = event["competitions"][0]
        if competition["status"]["type"]["state"] != "post":
            print("Skipping non-completed match")
            continue
        
        home = competition["competitors"][0]
        away = competition["competitors"][1]

        # Determine winner
        if home.get("winner"):
            winner = home["team"]["displayName"]
        elif away.get("winner"):
            winner = away["team"]["displayName"]
        else:
            winner = "Draw"

        newMatches.append({
            "id": event_id,
            "date": event["date"],
            "home": home["team"]["displayName"],
            "away": away["team"]["displayName"],
            "winner": winner
        })
        matchesCovered.append(event_id)
# 633829



# handleGroupStageMatchesOnDay(datetime.date(year=2022, month=12, day=1))
# for tid in team_ids:
#     schedule_url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams/{tid}/schedule"
#     resp = requests.get(schedule_url)
#     data = resp.json()

#     for event in data.get("events", []):
#         event_id = event["id"]
#         # Skip if already seen
#         if event_id in seen_matches:
#             continue

#         print(event["seasonType"]["name"])
        




#         comp = event["competitions"][0]

#         # Only group stage + completed matches
#         if comp.get("round", {}).get("slug") != "Group Stage":

#             print("Skipping non-group stage match")
#             continue
#         if comp["status"]["type"]["state"] != "post":
#             print("Skipping non-completed match")
#             continue


#         home = comp["competitors"][0]
#         away = comp["competitors"][1]

#         # Determine winner
#         if home.get("winner"):
#             winner = home["team"]["displayName"]
#         elif away.get("winner"):
#             winner = away["team"]["displayName"]
#         else:
#             winner = "Draw"

#         new_matches.append({
#             "id": event_id,
#             "date": event["date"],
#             "home": home["team"]["displayName"],
#             "away": away["team"]["displayName"],
#             "winner": winner
#         })

# # Print only new matches
# for m in new_matches:
#     print(f"{m['date'][:10]}: {m['home']} vs {m['away']} → Winner: {m['winner']}")
#     seen_matches.add(m["id"])

# # Save updated seen matches
# with open(seen_file, "w") as f:
#     json.dump(list(seen_matches), f)

if __name__ == "__main__":
    today = datetime.date.today()
