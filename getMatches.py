import requests
import csv
from datetime import datetime, timedelta

outfile = "matches.csv"

#this should be changed to the actual dates of the world cup
start_date = datetime(2022, 11, 20)
end_date = datetime(2022, 12, 2)

class Match:
    def __init__(self, home_team, away_team, id):
        self.home_team = home_team
        self.away_team = away_team
        self.id = id
        self.group = None

matches = []
fixtures = []

fixtures = []

current_date = start_date
while current_date <= end_date:
    date_str = current_date.strftime("%Y%m%d")
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates={date_str}"
    data = requests.get(url).json()

    for event in data.get("events", []):
        if event["season"]["slug"] != "group-stage":
            continue
        comp = event["competitions"][0]
        home = comp["competitors"][0]["team"]["displayName"]
        away = comp["competitors"][1]["team"]["displayName"]
        match = Match(home_team=home, away_team=away, id=event["id"])
        matches.append(match)


    current_date += timedelta(days=1)

# Get group names
for match in matches:
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event={match.id}"
    data = requests.get(url).json()
    match.group = data['header']['competitions'][0]['competitors'][0]['groups']['abbreviation'] #trust me bro

#save csv
with open(outfile, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["home team", "away team", "group"])
    for match in matches:
        writer.writerow([match.home_team, match.away_team, match.group])




# Save CSV
# with open(outfile, "w", newline="", encoding="utf-8") as f:
#     writer = csv.writer(f)
#     writer.writerow(["home_team", "away_team", "group"])
#     writer.writerows(fixtures)

# print(f"Saved {len(fixtures)} group stage matches to {outfile}")
