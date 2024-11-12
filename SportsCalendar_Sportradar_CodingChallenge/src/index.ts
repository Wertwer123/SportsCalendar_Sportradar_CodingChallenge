import express, { Express, Request, Response, Application } from "express";
import * as path from "path";
import { EventsAPI, SportsAPI, TeamsAPI, VenuesAPI } from "./Backend/api";

const app: Application = express();
const port = process.env.PORT || 8000;
const eventsAPI = new EventsAPI();
const sportsAPI = new SportsAPI();
const teamsAPI = new TeamsAPI();
const venuesAPI = new VenuesAPI();

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "Frontend")));

//Venues api get calls

app.get("/api/venues/:id", (req: Request, res: Response) => {
  venuesAPI.getVenueById(parseInt(req.params.id)).then((receivedVenue) => {
    if (!receivedVenue) {
      res.status(500).send("Not found");
      return;
    }

    res.json(receivedVenue);
  });
});

//Venues api get calls

//Teams api get calls
app.get("/api/teams/:id", (req: Request, res: Response) => {
  teamsAPI.getTeamById(parseInt(req.params.id)).then((receivedTeam) => {
    if (!receivedTeam) {
      res.status(500).send("Not found");
      return;
    }

    res.json(receivedTeam);
  });
});

//Teams api calls end

//Sports get api calls
app.get("/api/sports/:id", (req: Request, res: Response) => {
  sportsAPI.getSportById(parseInt(req.params.id)).then((receivedSport) => {
    if (!receivedSport) {
      res.status(500).send("Not found");
      return;
    }

    res.json(receivedSport);
  });
});
//Sports get api calls end

//Events api get calls
app.get("/api/events", (req: Request, res: Response) => {
  eventsAPI.getSportEvents().then((recievedEvents) => {
    res.json(recievedEvents);
  });
});

app.get("/api/events/:id", (req: Request, res: Response) => {
  eventsAPI.getSportEventById(parseInt(req.params.id)).then((recievedEvent) => {
    if(!recievedEvent){
      res.status(500).send("Not found");
      return;
    }
    res.json(recievedEvent);
  });
});

//events api get calls end

//events api insert/remove calls

app.post("/api/events", (req: Request, res: Response) => {
  
  eventsAPI
    .addSportEvent(req.body)
    .then((addedSportEvent) => {
      res.status(200).json(addedSportEvent);
    })
    .catch((error) => {
      res.status(500).json(error);
      console.error(error);
    });
});

app.delete("/api/events/:id", (req: Request, res: Response) => {
  eventsAPI.removeSportEvent(parseInt(req.params.id));
  res.status(200).json();
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
