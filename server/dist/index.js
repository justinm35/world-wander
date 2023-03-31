"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//expres and middleware imports
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const photoRoutes_1 = __importDefault(require("./routes/photoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
//mongoose imports
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = __importDefault(require("./middleware/passport"));
(0, passport_2.default)(passport_1.default);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3500;
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
app.use('/posts', postRoutes_1.default);
app.use('/photos', photoRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.listen(PORT, () => console.log(`###### Server running on port: ${PORT}`));
const MONGO_URI = process.env.CONNECTION_URI;
mongoose_1.default
    .connect(MONGO_URI) //{useNewUrlParser: true,useUnifiedTopology: true,} as ConnectOptions
    .catch((error) => console.log(error));
mongoose_1.default.connection.on('connected', () => {
    console.log('###### Databse Connected');
});
