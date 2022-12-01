# Studenten Management
Baue eine Webapp zum Verwalten von Studenten.
Nutze dafuer die entsprechende API, dessen Beschreibung du unten findest.

## Anleitung
1. Installiere das mitgelieferte NPM-Projekt mit `npm install`
2. Starte das installiere NPM-Projekt mit `npm run dev`
3. Untersuche die `data.js`: Darin findest du Konstanten fuer die API URLs sowie eine erste Funktion zum holen einer Liste von Studenten.
4. Implementiere diese Funktion und teste sie gewissenhaft in der `main.js`.
5. Stelle die Liste der Studenten im DOM sinnvoll dar (eine Tabelle koennte gut sein). Baue auch Schalter zum 'weiterblaettern' und 'zurueckblaettern' ein.
6. Baue in die Liste/Tabelle eine Moeglichkeit zur Detailansicht von einzelnen Studenten ein. Diese Ansicht koennte die Daten aus der bereits geholten Liste nutzen oder auch einen weiteren 'API-Call' fuer die entsprechende Studenten-ID durchfuehren.
7. Baue ausserdem eine Moeglichkeit zum Bearbeiten der Studenten-Daten ein, welche diese Aenderungen ueber die PUT-Route der API beim Server einreicht.
8. Baue eine Moeglichkeit zum Anlegen neuer Studenten ein. Nutze die POST-Route der API, um diesen neuen Datensatz beim Server einzureichen.
9. Baue eine Loeschfunktion fuer Studenten ein, die den jeweiligen Studenten mittels dessen ID ueber API DELETE-Route loescht.

Achte auf eine sinnvolle Fehlerbehandlung falls bestimmte API-Anfragen schiefgehen und zeige eventuelle Fehler im DOM an.

> TIPP: Nutze das Prinzip bei dem du Daten per Anfrage veraenderst und dir dann immer wieder die frischen Daten von der API holst.


# Kurze Anleitung für die Student-API:
**API** url: https://test.100best.guide/locations/dci-students/student
Gesendete Student-Objects vom Server sehen folgendermaßen aus:
```
{
   _id: "2l3j5h6j3454khlkhjjkj3256" // String
   name: "Susi Bones",              // String
   classId: de-2022,                // Number
   address: {
      street: "blablastraße",       // String (Straße)
      streetNum: 22,                // Number (Hausnummer)
      postalCode: 12345,            // Number (Postleitzahl)
      city: "Dortmund",             // String (Stadt)
   }                                    
}
```
## Um eine Liste der ersten 20 Einträge zu bekommen:
- **GET** request nach https://test.100best.guide/locations/dci-students/student
Mittels query können die Parameter **limit**, **skip** und **classId** in die URL übergeben werden
Beispiel:
https://test.100best.guide/locations/dci-students/student?skip=10%limit=20
- **limit** bestimmt die Anzahl der zurückgesendeten Daten (standard: 10)
- **skip** gibt an, um wie viel stellen die Daten übersprungen werden sollen (standard: 0)
- **classId** gibt nur diejenigen Students wieder, welche diese ClassId haben
​
​
## Um einzelne Students mittels der id zu bekommen:
**GET** request nach https://test.100best.guide/locations/dci-students/student/ID
Um einen neuen Student an den Server zu senden:
- **POST** request nach https://test.100best.guide/locations/dci-students/sudent
Dabei muss als payload (im request body) ein Object in folgender Form gesendet werden:
```
let data = {
   name: "Susi Bones",              // String
   classId: de-2022,                // Number
   address: {
      street: "blablastraße",       // String (Straße)
      streetNum: 22,                // Number (Hausnummer)
      postalCode: 12345,            // Number (Postleitzahl)
      city: "Dortmund",             // String (Stadt)
   }                                    
}
```
**WICHTIG**: Das Object muss in json form zum server gesendet werden (JSON.stringify())
​
​
## Um einen vorhandenen Student zu updaten, mit Hilfe der id :
- **PUT** request nach https://test.100best.guide/locations/dci-students/student/ID  (ID mit der id ersetzen)
Dabei muss als payload (im request body) ein Object in folgender Form gesendet werden:
```
let data = {
   name: "Susi Bones",              // String
   classId: de-2022,                // Number
   address: {
      street: "blablastraße",       // String (Straße)
      streetNum: 22,                // Number (Hausnummer)
      postalCode: 12345,            // Number (Postleitzahl)
      city: "Dortmund",             // String (Stadt)
   }                                    
}
```
**WICHTIG**: Das Object muss in json form zum server gesendet werden (JSON.stringify())
​
​
## Um einen vorhandenen student zu löschen, mit Hilfe der id:
- **DELETE** request nach https://test.100best.guide/locations/dci-students/student/ID  (ID mit der id ersetzen)