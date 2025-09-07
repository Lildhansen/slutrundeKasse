import bs4
import requests
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from chromedriver_py import binary_path


#maybe i need to use selenium to get the page itself 
#   need to wait for elem with class="event event--results" to appear
    #when it appears, we know that the page is loaded, and we can save the page and close selenium

class Soup:
    def __init__(self):
        self.res = None
        self.soup = None
    def getLinkContent(self,link):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # Run in headless mode
        svc = webdriver.ChromeService(executable_path=binary_path)
        driver = webdriver.Chrome(service=svc,options=options)
        try:
            # Load the page
            driver.get(link)

            # Wait for the element with class "event event--results" to appear
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'event--results'))
            )

            # Get the page source after the element has appeared
            self.res = driver.page_source

        finally:
            driver.quit()
        self.soup = bs4.BeautifulSoup(self.res, "html.parser")
        
        # print(self.soup.find('div', class_='container__liveTableWrapper tournament_page'))
    def getMatchesNotCovered(self,coveredMatches):
        # print(self.soup)
        container = self.soup.find('div', class_='sportName soccer')
        print(container != None)
        for row in container.find_all('div'):
            if self.isHeader(row):
                headerText = self.getHeaderText(row)
                print(headerText)
                #if it has the word "Kvalifikation" no need to do this anymore
                #if it has the word "Play Offs", we only need to look after all group matches has been loaded in
                    #also, i guess here we could just look at what team is bold to know who won
                    #here we need some flag to figure out if we are done with group matches (this flag should also be saved in our data file)
                #otherwise we know it is a group stage match

    def isHeader(self,elem):
        return elem.get('class') == ['wclLeagueHeader', 'wclLeagueHeader--collapsed', 'wclLeagueHeader--pinned', 'wclLeagueHeader--noCheckBox', 'wclLeagueHeader--indent']
    def getHeaderText(self,elem):
        aTag = elem.find('a')
        if aTag:
            return aTag.text
        return None
soup = Soup()
soup.getLinkContent("https://www.flashscore.dk/fodbold/verden/vm-2022/resultater/")
    #tested that it works for both em 2024 and vm 2022 (tests could be make to check on specific URLs)
soup.getMatchesNotCovered([])
#just save all covered matches in json/csv file and compare with them (just the hometeam/awayteam)