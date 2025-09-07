from datetime import datetime

def convert_date(date_str):
    # Parse the month and day from the string
    parsed_date = datetime.strptime(date_str, "%b/%d")
    
    # Set the year to the current year
    current_year = datetime.now().year
    return parsed_date.replace(year=current_year)