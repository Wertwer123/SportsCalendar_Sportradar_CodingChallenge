import express, { Express, Request, Response , Application } from 'express';
import * as path from 'path';
import { EventsAPI, SportsAPI, TeamsAPI } from './Backend/api';
import { DataBaseInit } from './Backend/databaseInit';

const app: Application = express();
const port = process.env.PORT || 8000;
const dataBaseInit = new DataBaseInit();
const eventsAPI = new EventsAPI();
const sportsAPI = new SportsAPI();
const teamsAPI = new TeamsAPI();


dataBaseInit.createDatabaseConnection();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'Frontend')));

//Teams api get calls
app.get('/api/teams/:id', (req: Request, res: Response) => {

    if(!dataBaseInit.isConnectionValid()){
        console.log("Connection to database was lost")
        return;
    }

    teamsAPI.getTeamById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)).then((receivedTeam) => {

        if(!receivedTeam){
            res.status(500).send("Not found");
            return;
        }

        res.json(receivedTeam);
    })

})


//Teams api calls end

//Sports get api calls
app.get('/api/sports/:id', (req: Request, res: Response) =>{

    if(!dataBaseInit.isConnectionValid()){
        console.log("Connection to database was lost")
        return;
    }

    sportsAPI.getSportById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)).then((receivedSport) =>{

        if(!receivedSport){
            res.status(500).send("Not found");
            return;
        }

        res.json(receivedSport);
    })
})
//Sports get api calls end

//Events api calls to get all sports events that are saved inside of th databse
app.get('/api/events', (req: Request, res: Response) => {
    if(!dataBaseInit.isConnectionValid()){
        console.log("Connection to database was lost")
        return;
    }

    eventsAPI.getSportEvents(dataBaseInit.getDataBaseConnection()).then((recievedEvents) =>{
        res.json(recievedEvents);
    });
});

app.get('/api/events/:id', (req: Request, res: Response) => {

    if(!dataBaseInit.isConnectionValid()){
        return;
    }

    res.json(eventsAPI.getSportEventById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)));
 });

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});