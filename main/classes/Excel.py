
import openpyxl
from openpyxl.styles import Font, Color 
from main.classes.Match import loadMatchesFromCsv


#sets up the text on the left side (so not the actual data for the players)
def setupNonPlayerText(ws,row,column):
    #group matches
    matches = loadMatchesFromCsv()
    ws.cell(row=row,column=column,value="Gruppe:")
    ws.cell(row=row,column=column+1,value="Kamp:")
    for match in matches:
        row += 1
        ws.cell(row=row,column=column,value=match.group)
        ws.cell(row=row,column=column+1,value=match.excelPrint())
    row += 1
    #ro16 teams:
    ws.cell(row=row,column=column,value="Hold i ottendedelsfinalen:")
    for i in range(16):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #ro8 teams:
    ws.cell(row=row,column=column,value="Hold i kvartfinalen:")
    for i in range(8):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #semi final teams:
    ws.cell(row=row,column=column+1,value="Hold i semifinalen:")
    for i in range(4):
        row += 1
        ws.cell(row=row,column=column+1,value=f"Hold {i+1}")
    #finals teams:
    for i in range(2):
        row += 1
        ws.cell(row=row,column=column+1,value=f"hold {i+1}")
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

def setCellWidths(ws,cellWidths):
    ##just pick the longest string in each column and set the width to that
    pass
    
    

def setupExcelFile(players):
    wb = openpyxl.Workbook() # new workbook
    ws = wb.active #new worksheet
    ws.title = "Feriekasse"
    row = 1
    column = 1
    
    setupNonPlayerText(ws,row,column)
    
    wb.save(fr"main/data/slutrundeKasse.xlsx")
    wb.close()
    
    
    # for player in players:
        # pass