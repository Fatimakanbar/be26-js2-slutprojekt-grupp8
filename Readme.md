## Projektbeskrivning

Detta är ett gruppprojekt, vi är grupp 8 med medlemmarna Fatima, Dzemila och Alicia.

Vi har byggt en hemsida som ska hjälpa med arbetsflöden, där vi kan lägga till projekt, tilldela medlemmar till det projektet och lägga till uppgifter i tre olika statusar: ny, pågående och slutförda uppgifter.

Controllers mappen- ansvarar för användarens interaktioner med hemsidan.

Views mappen- ansvarar för all rendering och det användaren ser på hemsidan.

Models- ansvarar för uppbyggnaden av klasser.

database- ansvarar för förfrågningar, hämta och hantera data från firebase.

main.ts - ansvarar för uppstart av applikationen.

## Firebase

Applikationen använder Firebase Realtime Database för att lagra projekt, medlemmar och uppgifter.
För att köra projektet lokalt behöver applikationen vara konfigurerad med en Firebase Realtime Database.
Databasen används för att hämta, skapa och uppdatera information om projekt, medlemmar och uppgifter

## Installation

Klona projektet:
git clone https://github.com/Fatimakanbar/be26-js2-slutprojekt-grupp8.git
Gå till projektmappen:
cd be26-js2-slutprojekt-grupp8
Installera beroenden:
npm install
Starta utvecklingsservern:
npm run dev
Öppna adressen som visas i terminalen.

## Projektstruktur

Projektet är organiserat med inspiration från MVC-principen:
Models – representerar projekt, medlemmar och uppgifter.
Views – ansvarar för det som visas på webbplatsen.
Controllers – hanterar användarinteraktioner.
Database – hanterar kommunikationen med Firebase.

## Gruppmedlemmar

Uppdelningen av arbetet gjordes följande:
Alicia – projekthantering
Dzemila – uppgiftshantering
Fatima – medlemshantering

## Liveversion

Netlify länk:

https://be26-js2-slutprojekt-grupp8.netlify.app/
