const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOveride = require("method-override");

main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));


app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
 console.log(chats);
    res.render("index.ejs", { chats });
});


app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),

    });

     newChat
 .save()
 .then((res) => {
    console.log("chat was saved");
 })
 .catch((err) => {
    console.log(err);
 });
    res.redirect("/chats");
});

//show routes
app.get("/chats/:id", async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//update route

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updateChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }

    );
    console.log(updateChat);
    res.redirect("/chats");
});

//delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})


//get route
app.get("/", (req, res) => {
    res.send("root is working");
});

//errorhandling
app.use((err, req, res, next) => {
    let { status = 500, message = "some error is occured" } = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
    console.log("server listening on port 8080");
}); 