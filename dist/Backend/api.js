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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsAPI = exports.SportsAPI = exports.TeamsAPI = exports.VenuesAPI = void 0;
;
;
class VenuesAPI {
    getVenueById(connection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                return Promise.reject();
            }
            const query = "SELECT * FROM venues WHERE id = " + id;
            const [result] = yield connection.query(query);
            return result[0];
        });
    }
}
exports.VenuesAPI = VenuesAPI;
class TeamsAPI {
    getTeamById(connection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                return Promise.reject();
            }
            const query = "SELECT * FROM teams WHERE id = " + id;
            const [result] = yield connection.query(query);
            return result[0];
        });
    }
}
exports.TeamsAPI = TeamsAPI;
class SportsAPI {
    getSportById(connection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                console.log("Lost connection to the data base");
                return Promise.reject();
            }
            const query = "SELECT * FROM sports WHERE id = " + id;
            const [result] = yield connection.query(query);
            return result[0];
        });
    }
}
exports.SportsAPI = SportsAPI;
;
class EventsAPI {
    getSportEventById(connection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                console.log("Lost connection to the data base");
                return Promise.reject();
            }
            const query = "SELECT * FROM events WHERE id = " + id;
            const [result] = yield connection.query(query);
            return result[0];
        });
    }
    getSportEvents(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                console.log("Lost connection to the data base");
                return Promise.reject();
            }
            const query = "SELECT * FROM events;";
            const [result] = yield connection.query(query);
            return result;
        });
    }
}
exports.EventsAPI = EventsAPI;
;
//# sourceMappingURL=api.js.map