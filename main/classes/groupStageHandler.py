import main.util.constants as const
import main.util.util as util
from main.classes.Match import Match

import urllib.request
import re

class groupStageHandler:
    def __init__(self):
        self.getFile()
        self.matches = self.extract_match_details()
        # for match in self.matches:
        #     match.prettyPrint()
    def getFile(self):
        # Download the file
        urllib.request.urlretrieve(const.SCORES_GROUP_IN, const.SCORES_GROUP_OUT)

        # Filter out the header content
        with open(const.SCORES_GROUP_OUT, 'r', encoding='utf-8') as file:
            lines = file.readlines()

        # Assume the header ends with the first empty line
        filtered_lines = []
        header_found = False
        for line in lines:
            if line.strip() == "":
                header_found = True
                continue
            if header_found:
                filtered_lines.append(line)

        # Save the filtered content back to the file
        with open(const.SCORES_GROUP_OUT, 'w', encoding='utf-8') as file:
            file.writelines(filtered_lines)

    #it should save matches it have looked at
    def extract_match_details(self):
        with open(const.SCORES_GROUP_OUT, 'r', encoding='utf-8') as file:
            text = file.read()
        
        matches = []
        current_group = None

        lines = text.splitlines()
        for line in lines:
            # Detect group name
            group_match = re.match(r"Group ([A-H])", line)
            if group_match:
                current_group = group_match.group(1)
                continue

            match_pattern = r"\((\d+)\)"
            match = re.search(match_pattern, line)
            if match:
                # Extract match number
                match_number = match.group(1)

                # Remove everything after '@' and split by spaces
                line = line[0:line.index("@")]
                lineList = re.split(r'\s+', line)

                # Extract date
                date = util.convert_date(lineList[2])  # Convert date string to date object

                # Dynamically find the position of the scores
                score_index = next(i for i, item in enumerate(lineList) if re.match(r"\d+-\d+", item))
                home_team = " ".join(lineList[4:score_index])  # Combine words for home team
                home_score = int(lineList[score_index].split("-")[0])  # Extract home score
                away_score = int(lineList[score_index].split("-")[1])  # Extract away score
                away_team = " ".join(lineList[score_index + 1:len(lineList) - 1])  # Combine words for away team

                # Determine result (1x2)
                if home_score > away_score:
                    result = "1"
                elif home_score < away_score:
                    result = "2"
                else:
                    result = "x"

                # Create Match object
                match_obj = Match(home_team, away_team, current_group)
                match_obj.homeScore = home_score
                match_obj.awayScore = away_score
                match_obj.group = current_group
                match_obj.date = date  # Assign the date
                match_obj.result = result
                match_obj.number = match_number
                match_obj.prettyPrint()
                matches.append(match_obj)
            
        return matches