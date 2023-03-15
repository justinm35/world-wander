"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//expres and middleware imports
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
//mongoose imports
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 3500;
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)());
app.use('/posts', postRoutes_1.default);
const CONNECTION_URI = "mongodb+srv://WorldWander:12341234@cluster0.ljqueyg.mongodb.net/?retryWrites=true&w=majority";
mongoose_1.default
    .connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .catch((error) => console.log(error));
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
