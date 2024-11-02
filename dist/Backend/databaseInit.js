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
exports.DataBaseInit = void 0;
const promise_1 = require("mysql2/promise");
//Class that holds out mysql connection and offers utility checks for if we still have a valid connection
//and establishing a connection
class DataBaseInit {
    constructor() {
        this.mysqlConnection = null;
        this.access = {
            user: "root",
            database: "events_db"
        };
    }
    isConnectionValid() {
        return this.mysqlConnection != null;
    }
    getDataBaseConnection() {
        return this.mysqlConnection;
    }
    createDatabaseConnection() {
        this.establishDatabaseConnection().then((res) => {
            this.mysqlConnection = res;
        });
    }
    establishDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, promise_1.createConnection)(this.access);
            return connection;
        });
    }
}
exports.DataBaseInit = DataBaseInit;
//# sourceMappingURL=databaseInit.js.map