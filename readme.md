simple:
program input: all matches, all teams
    skal skaffes someway (i csv-format er nok nemmest)
    https://fixturedownload.com/download/csv/uefa-euro-2024
~~UI for users (ville være nemmest hvis det alt sammen var i en fil) (ellers er en zipfil finno):~~
    ~~html side med alle kampene~~
    ~~de skal udfylde deres resultater (+ alle extra stuff)~~
    ~~skrive deres navn (dette skal nok blive titlen på filen)~~
    ~~submitte, som så generer en fil (som de kan sende)~~
        måske det kan gøres så den sender mail med det (not sure how) 
        **JSON**, csv, dunno
        
program der bruger filerne (hvis alle filerne i en mappe):
    gemmer resultater i excelfil (ikke bare resultater men hvad alle har satset på)
    ui for mig: 
        der kommer kampe op (1 af gangen):
            jeg skriver 1, x, 2 (måske s hvis jeg skal skippe og kampen ikke er spillet(og noget for at exit))
            når jeg exitter opdateres filen
    efter alle kampe er udfyldt "gætter" den på en stilling (for nogle kan den være sikre på kun baseret på 1x2)
        for dem den ikke er sikre på sætter den det op så jeg kan skrive hvem der går videre  
            hold der er a-point
            alle 3. pladser
            
forskellige makes:
~~setup (html filen som users skal bruge)~~
~~start (sætter excelfilen op og loader alt det ind)~~
update (både opdaterer og sender)



advanced:
get scores from internet:
https://github.com/openfootball/worldcup/blob/master/2026--usa/cup.txt
