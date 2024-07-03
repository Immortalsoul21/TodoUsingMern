let dynamoose = require("dynamoose");
let express = require("express");
let cors = require("cors");
const bodyParser = require("body-parser"); 
dynamoose.aws.ddb.local("http://localhost:8000");

let app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const Todorouter = require("./routes/api");
app. use("/", Todorouter);

app.listen(9000, () => console.log("Server started on port 10000"));
