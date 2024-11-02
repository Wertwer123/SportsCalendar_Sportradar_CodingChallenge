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
exports.EventsAPI = void 0;
class EventsAPI {
    getSportEventById(connection, id) {
        return {
            id: id,
            dateTime: new Date(),
            sport_Id: 0,
            team_1_Id: 0,
            team_2_Id: 0,
            venue_Id: 0,
            description: ""
        };
    }
    getSportEvents(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!connection) {
                console.log("Lost connection to the data base");
                return new Promise(() => { });
            }
            const query = "SELECT * FROM events;";
            const result = yield connection.query(query);
            return result[0];
        });
    }
}
exports.EventsAPI = EventsAPI;
;
//# sourceMappingURL=api.js.map