import express, { Express, Request, Response , Application } from 'express';
import * as path from 'path';
import { Connection } from 'mysql2/promise';
import { EventsAPI } from './Backend/api';
import { DataBaseInit } from './Backend/databaseInit';

const app: Application = express();
const port = process.env.PORT || 8000;
const dataBaseInit = new DataBaseInit();
const eventsAPI = new EventsAPI();

dataBaseInit.createDatabaseConnection();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'Frontend')));

//api call to get all sports events that are saved inside of th databse
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