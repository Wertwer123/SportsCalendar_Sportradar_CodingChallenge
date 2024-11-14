"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsAPI = exports.SportsAPI = exports.TeamsAPI = exports.VenuesAPI = void 0;
const databaseInit_1 = __importDefault(require("./databaseInit"));
class VenuesAPI {
    getVenueById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM venues WHERE id = ?";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [result] = yield connection.query(query, [id]);
            connection.release();
            return result[0];
        });
    }
}
exports.VenuesAPI = VenuesAPI;
class TeamsAPI {
    getTeamById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM teams WHERE id = ?";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [result] = yield connection.query(query, [id]);
            connection.release();
            return result[0];
        });
    }
}
exports.TeamsAPI = TeamsAPI;
class SportsAPI {
    getSportById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM sports WHERE id = ?";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [result] = yield connection.query(query, [id]);
            connection.release();
            return result[0];
        });
    }
}
exports.SportsAPI = SportsAPI;
class EventsAPI {
    getSportEventById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM events WHERE id = ?";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [result] = yield connection.query(query, [id]);
            connection.release();
            return result[0];
        });
    }
    getSportEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM events;";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [result] = yield connection.query(query);
            connection.release();
            return result;
        });
    }
    addSportEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO events (dateTime, _sport_Id, _team_1_Id, _team_2_Id, _venue_Id, description) VALUES(?, ?, ?, ?, ?, ?)";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [inserted] = yield connection.execute(query, [
                event.dateTime,
                event._sport_Id,
                event._team_1_Id,
                event._team_2_Id,
                event._venue_Id,
                event.description,
            ]);
            connection.release();
            return this.getSportEventById(inserted.insertId);
        });
    }
    removeSportEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM events WHERE id = ?";
            const connection = yield databaseInit_1.default.getDataBaseConnection();
            if (!connection) {
                return Promise.reject();
            }
            const [res] = yield connection.execute(query, [id]);
            connection.release();
            return res[0];
        });
    }
}
exports.EventsAPI = EventsAPI;
//# sourceMappingURL=api.js.map