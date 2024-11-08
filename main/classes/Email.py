import os
import smtplib
import configparser
from email.message import EmailMessage
from datetime import date
import excel2img

class Email:
    def __init__(self):
        self.sender = None
        self.password = None
        self.server = None
        self.port = None
        self.receivers = []
        self.mailBody = None #what should be the body of the email
        self.subject = None
        self.emailIniFile = os.path.join('main', 'Email.ini')
        self.__setupEmailInformationFromConfigFile()
    #sets the attributes of the current Email object up based on a .ini file (directory of that file is the parameter of the method)
    # this method is only called when instantiating an Email object
    def __setupEmailInformationFromConfigFile(self):
        configSection = "email_config"
        config = configparser.ConfigParser()
        config.read(self.emailIniFile)
        self.sender = config.get(configSection,'sender')
        self.password = config.get(configSection,'password')
        self.server = config.get(configSection,'server')
        self.port = int(config.getint(configSection,'port'))
        self.receivers = config.get(configSection,'receivers').split(';')
    #attach the files (that is excelfile and screenshot thereof) to the email
    def attachFiles(self,message,excelFile,newFileName,screenshotDirectory):
        self.attachExcelFile(message,excelFile,newFileName)
        self.attachExcelFileScreenshot(message,excelFile,screenshotDirectory,"slutrundeKasse.png")
        
    #attach the excel file to the email
    def attachExcelFile(self,message,excelFile,newFileName):
        with open(excelFile, 'rb') as f:
            fileData = f.read()
        message.add_attachment(fileData, maintype="application", subtype="xlsx", filename=newFileName)
            
    #take screenshot of the excel file and attach it to the email
    def attachExcelFileScreenshot(self,message,excelFile,screenshotDirectory,screenshotName):
        excel2img.export_img(excelFile,screenshotDirectory, "Feriekasse", None) #"Feriekasse" = sheetname
        with open(screenshotDirectory, 'rb') as f:
            imgData = f.read()
        message.add_attachment(imgData, maintype="image", subtype="png", filename=screenshotName)
    def setupMailInfo(self,message):
        message['From'] = self.sender
        message['To'] = self.receivers
        message['Subject'] = self.subject
        message.set_content(self.mailBody)
    def connectToSmtpAndSendMail(self,message):
        smtp = smtplib.SMTP_SSL(self.server)
        smtp.connect(self.server,self.port)
        smtp.login(self.sender,self.password)
        smtp.sendmail(to_addrs=self.receivers,msg=message.as_string(),from_addr=self.sender)
        smtp.quit()
        print("Email sent")
    #Updates the last mail sent value in the email.ini file
    def updateLastMailSentValue(self):
        config = configparser.ConfigParser()
        config.read(self.emailIniFile)
        try:
            config.add_section("email_config")
        except configparser.DuplicateSectionError:
            pass
        config.set("email_config", "lastDateSent", date.today().isoformat())
        with open(self.emailIniFile, "w") as config_file:
            config.write(config_file)
    def updateInitialMailSentValue(self):
        config = configparser.ConfigParser()
        config.read(self.emailIniFile)
        try:
            config.add_section("email_config")
        except configparser.DuplicateSectionError:
            pass
        config.set("email_config", "initialemailsent", "True")
        with open(self.emailIniFile, "w") as config_file:
            config.write(config_file)


def sendInitialEmail():
    email = Email()
    message = EmailMessage()
    email.subject = "Feriekassen for slutrunden er blevet oprettet"
    email.mailBody = "Feriekassen for slutrunden er blevet oprettet og kan ses i den vedhæftede excel fil (.xlsx), samt i det vedhæftede billede af excelfilen."
    
    email.setupMailInfo(message)
    
    excelFile = fr"main/data/slutrundeKasse.xlsx" 
    filename = "main/data/feriekasse (" + date.today().strftime("%d-%m-%Y") + ").xlsx"
    email.attachFiles(message,excelFile,filename,fr"main/data/slutrundeKasse.png")
    
    email.connectToSmtpAndSendMail(message)
    
    ##cleanup (update config file and remove the screenshot)
    email.updateInitialMailSentValue()
    os.remove(fr"main/data/slutrundeKasse.png")

def sendRecurringEmail():
    pass    