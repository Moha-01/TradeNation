# TradeNation
Get All The Info Regarding Your Favorite Crypto Currency (DHBW Mosbach Web-Services Project)


###MatrNr.:
1. Mohamed Haji: 8528264
2. Lukas Hautzinger: 4873531
3. Dominic Merkle: 8233288

##Presentation:
https://docs.google.com/presentation/d/1oT9l2WuL1Awr_BXKkrrvWhsy5lTQNlwSimTNV-JfG-s/edit?usp=sharing

##GitHub:
https://github.com/Moha-01/TradeNation


[Recommended Test Option -> Test with Docker Desktop -> CLI]

1. docker-compose up --build   -> Wait untill all running!
2. visit http://localhost:3005 -> Login with username:admin/password:admin (not done yet)
3. visit http://localhost:3005/home to improve our Website

Using:
- React JS -> JavaScript Framework
 --> npx create-react-app Crypto-Hunter

- Material UI v4 -> React Komponent für schnelleres und einfacheres Web-Entwicklung ähnlich wie Bootstrap
	* Intallation: npm install @material-ui/core @material-ui/lab    -> (Eingabe im Terminal im Projekt Ordner)

- Chart JS v2 -> Chart Komponente für die Darstellung von Daten
	* Intallation: npm install react-chartjs-2

- Axios -> HTTP-Request Komponente für die Kommunikation mit dem Server
	* Intallation: npm install axios

- React-Router -> Router Komponente für die Navigation
	* Intallation: npm install react-router-dom

- node_modules -> Ordner für die Komponenten
	* Intallation: npm install -g node-modules

- react-html-parser -> Komponente für die Darstellung von HTML-Code
	* Intallation: npm install react-html-parser --force

-react-alice-carousel -> Komponente für die Darstellung von Bildern
	* Intallation: npm install react-alice-carousel

- assert -> Komponente für die Überprüfung von Bedingungen
	* Intallation: npm install assert --save

- buffer -> Komponente für die Darstellung von Bildern
	* Intallation: npm install buffer --save

- json-server -> Komponente für die Darstellung von Bildern
	* Intallation: npm install -g json-server

Requierments:
- NodeJs
- Visual Studio Code


API Keys:
- https://www.alphavantage.co/
  Key: DPN5UETZNKBHUWSC

- https://cloud.iexapis.com/        (50.000 Requests)
  Key 1: pk_d95aa31868b74f6db51b05ecc5376ce5
  Key 2: pk_a18f9fb063d24119b73a8f532bda731c
  Key 3: pk_99dc5983c38b4b46bbc750f6b2081537
  Key 4: pk_0b6c252c9a1b4774ac8a134fae36c94b


Ports:
	React-App: 3005
	json-server: 3500


Run Projekt: (You will need 2 bashes)
	1. npm start
	2. json-server db.json --port=3500


Docker CLI:
- docker-compose up --build
- docker save -o [.tar] [image]

Website:
  / -> Login   (Login is not done yet)
  /home -> Dashboard (almost done)

Note:
- Docker Desktop is 100% functional. Docker Portainer ist not functional
- Since this was a group work, we worked on the rest of the tasks in collaboration, so it was not clear to us who we should assign them to
