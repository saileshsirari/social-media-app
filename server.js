const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();
const { authSocket, socketServer } = require("./socketServer");
const posts = require("./routes/posts");
const users = require("./routes/users");
const comments = require("./routes/comments");
const messages = require("./routes/messages");
const PostLike = require("./models/PostLike");
const Post = require("./models/Post");

dotenv.config();

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://post-it-heroku.herokuapp.com"],
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));


const { MongoClient } = require('mongodb');
const uri =  "mongodb+srv://saileshsirari:Sai%4011235%2A@cluster0.2vi4n.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri);

(async () => {
  try {
    await client.connect();
    const dbRole = await client.db().command({ hello: 1 });
    console.log(
      `Role of database - Host: ${dbRole.me}  Is primary: ${dbRole.isWritablePrimary}`
    );
    await client.close(); 
  } catch (e) {
    console.log(' 1 here Error: ', e.message);
  }
})();
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    
    console.log(`Your port is ${mongoose.connection.db}`); // undefined
    console.log("MongoDB connected");
  }
);

httpServer.listen(process.env.PORT || 7000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/messages", messages);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
