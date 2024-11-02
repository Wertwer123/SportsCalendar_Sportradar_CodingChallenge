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
const Display = document.getElementById("events_test");
function getAllSportEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/api/events", {
            method: "GET"
        });
        return response.json();
    });
}
getAllSportEvents().then((events) => {
    console.log(Display);
    if (!Display) {
        return;
    }
    events.forEach((value) => {
        const NameSpan = document.createElement('div');
        NameSpan.innerText = value.description;
        Display.appendChild(NameSpan);
    });
});
//# sourceMappingURL=frontend.js.map