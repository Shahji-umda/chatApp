const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

let chats = [
  {
    from: "rukayya",
    to: "neha",
    msg: "send me your exam sheets",
    created_at: new Date(),
  },
  {
    from: "umdduuu",
    to: "umair",
    msg: "send me your exams 2nd sheets",
    created_at: new Date(),
  },
  {
    from: "tomar sharma",
    to: "neha dhoopya",
    msg: "send me your exam sheets with your friendss",
    created_at: new Date(),
  },
  {
    from: "tony shark",
    to: "neha sharma",
    msg: "send me your exam sheets and exam syllabus",
    created_at: new Date(),
  },
];

Chat.insertMany([
  {
    from: "rukayya",
    to: "neha",
    msg: "send me your exam sheets",
    created_at: new Date(),
  },
]);

Chat.insertMany(chats);
