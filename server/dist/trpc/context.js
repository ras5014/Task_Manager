"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
const authHelpers_1 = require("../utils/authHelpers");
function createContext({ req }) {
    const auth = req.headers.authorization;
    if (!auth)
        return {};
    const token = auth.replace("Bearer ", "");
    try {
        const payload = (0, authHelpers_1.verifyToken)(token);
        if (typeof payload === "string" || !payload.userId) {
            return {};
        }
        return { userId: payload.userId };
    }
    catch (error) {
        return {};
    }
}
