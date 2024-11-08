
import openpyxl
from openpyxl.styles import Font, Color 
from main.classes.Match import loadMatchesFromCsv

import os

#sets up the text on the left side (so not the actual data for the players)
def setupNonPlayerText(ws):
    row = 1
    column = 1
    #group matches
    matches = loadMatchesFromCsv()
    ws.cell(row=row,column=column,value="Gruppe:")
    ws.cell(row=row,column=column+1,value="Kamp:")
    for match in matches:
        row += 1
        ws.cell(row=row,column=column,value=match.group)
        ws.cell(row=row,column=column+1,value=match.excelPrint())
    #ro16 teams:
    row += 2
    ws.cell(row=row,column=column,value="Hold i ottendedelsfinalen:")
    for i in range(16):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #ro8 teams:
    row += 1
    ws.cell(row=row,column=column,value="Hold i kvartfinalen:")
    for i in range(8):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #semi final teams:
    row += 1
    ws.cell(row=row,column=column,value="Hold i semifinalen:")
    for i in range(4):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #finals teams:
    row += 1
    ws.cell(row=row,column=column,value="Hold i finalen:")
    for i in range(2):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #winner
    row += 1
    ws.cell(row=row,column=column,value="Vinder:")
    row += 1
    #topscorer
    ws.cell(row=row,column=column,value="Topscorer:")
    row+=1
    #dane to score
    ws.cell(row=row,column=column,value="Dansker der scorer:")
    row += 1
    #how many goals by dane
    ws.cell(row=row,column=column,value="Hvor mange mål scorer den valgte dansker:")
    #player to get red card
    row += 1
    ws.cell(row=row,column=column,value="Spiller der får rødt kort:")

def setupPlayerText(ws,player,column):
    row = 1
    ws.cell(row=row,column=column,value=player.name)
    for match in player.groupMatchGames:
        row += 1
        ws.cell(row=row,column=column,value=match)
    row += 2
    for team in player.ro16Teams:
        row += 1
        ws.cell(row=row,column=column,value=team)
    row += 1
    for team in player.quarterFinalTeams:
        row += 1
        ws.cell(row=row,column=column,value=team)
    row += 1
    for team in player.semiFinalTeams:
        row += 1
        ws.cell(row=row,column=column,value=team)
    row += 1
    for team in player.finalTeams:
        row += 1
        ws.cell(row=row,column=column,value=team)
    row += 1
    ws.cell(row=row,column=column,value=player.winner)
    row += 1
    ws.cell(row=row,column=column,value=player.topScorer.title())
    row += 1
    ws.cell(row=row,column=column,value=player.daneToScore.title())
    row += 1
    ws.cell(row=row,column=column,value=player.howManyGoalsByDane)
    row += 1
    ws.cell(row=row,column=column,value=player.redCardedPlayer.title())
    
        

def setCellWidths(ws):
    column = 1
    
    cellWidths = []
    while True:
        if ws.cell(row=1,column=column).value: #if something is in this column
            longestStringLength = -1
            for row in range(ws.max_row):
                cellValue = ws.cell(row=row+1,column=column).value
                if cellValue:
                    cellValueLength = len(ws.cell(row=row+1,column=column).value)
                    if cellValueLength > longestStringLength:
                        longestStringLength = cellValueLength      
            cellWidths.append(longestStringLength)
            column += 1
        else:
            break

    for i, cellWidth in enumerate(cellWidths):
        print(cellWidth)
        ws.column_dimensions[numberToExcelColumn(i+1)].width = cellWidth
    
    
#for excelfile
#number is always at least 1
#max working output = ZZ
def numberToExcelColumn(number):
    result = ""
    chars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ" #first blank space is intended
    while number > len(chars)-1:
        if result != "":
            nextLetterIndex = chars.index(result[-1])+1
            if nextLetterIndex == len(chars):
                nextLetterIndex = 1
            result = result[1:-1] + chars[nextLetterIndex]
            number -= len(chars)-1
        else:
            result += chars[1]
            number -= len(chars)-1
    if (number != 0):
        result += chars[number]
    return result

def setupExcelFile(players):
    ##only for testing 
    file_path = os.path.join('main', 'data', 'slutrundeKasse.xlsx')
    
    if os.path.exists(file_path):
        print(f"Deleting existing file: {file_path}")
        os.remove(file_path)
    else:
        print(f"No existing file to delete: {file_path}")

    
    ##
    wb = openpyxl.Workbook() # new workbook
    ws = wb.active #new worksheet
    ws.title = "Feriekasse"
    setupNonPlayerText(ws)
    column = 3
    for player in players:
        setupPlayerText(ws,player,column)
        column += 1
        
    setCellWidths(ws)
    wb.save(fr"main/data/slutrundeKasse.xlsx")
    wb.close()
    
#todo
    #make it look prettier (colors, more distinct borders)