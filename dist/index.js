"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const api_1 = require("./Backend/api");
const databaseInit_1 = require("./Backend/databaseInit");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const dataBaseInit = new databaseInit_1.DataBaseInit();
const eventsAPI = new api_1.EventsAPI();
const sportsAPI = new api_1.SportsAPI();
const teamsAPI = new api_1.TeamsAPI();
dataBaseInit.createDatabaseConnection();
app.use(express_1.default.json());
app.use('/', express_1.default.static(path.join(__dirname, 'Frontend')));
//Teams api get calls
app.get('/api/teams/:id', (req, res) => {
    if (!dataBaseInit.isConnectionValid()) {
        console.log("Connection to database was lost");
        return;
    }
    teamsAPI.getTeamById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)).then((receivedTeam) => {
        if (!receivedTeam) {
            res.status(500).send("Not found");
            return;
        }
        res.json(receivedTeam);
    });
});
//Teams api calls end
//Sports get api calls
app.get('/api/sports/:id', (req, res) => {
    if (!dataBaseInit.isConnectionValid()) {
        console.log("Connection to database was lost");
        return;
    }
    sportsAPI.getSportById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)).then((receivedSport) => {
        if (!receivedSport) {
            res.status(500).send("Not found");
            return;
        }
        res.json(receivedSport);
    });
});
//Sports get api calls end
//Events api calls to get all sports events that are saved inside of th databse
app.get('/api/events', (req, res) => {
    if (!dataBaseInit.isConnectionValid()) {
        console.log("Connection to database was lost");
        return;
    }
    eventsAPI.getSportEvents(dataBaseInit.getDataBaseConnection()).then((recievedEvents) => {
        res.json(recievedEvents);
    });
});
app.get('/api/events/:id', (req, res) => {
    if (!dataBaseInit.isConnectionValid()) {
        return;
    }
    res.json(eventsAPI.getSportEventById(dataBaseInit.getDataBaseConnection(), parseInt(req.params.id)));
});
app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map