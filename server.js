const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

// נתיב לקובץ הפגישות
const meetingsFile = path.join(__dirname, "newP.json");

// נתיב לקובץ החגים
const holidaysFile = path.join(__dirname, "holidays.json");

// שליפת פגישות
app.get("/newP.json", (req, res) => {
  fs.readFile(meetingsFile, "utf8", (err, data) => {
    if (err) {
      console.error("שגיאה בקריאת הקובץ:", err);
      return res.status(500).send("שגיאה בשרת");
    }
    res.send(JSON.parse(data));
  });
});

// שליפת חגים
app.get("/holidays", (req, res) => {
  fs.readFile(holidaysFile, "utf8", (err, data) => {
    if (err) {
      console.error("שגיאה בקריאת קובץ החגים:", err);
      return res.status(500).send("שגיאה בשרת");
    }
    res.send(JSON.parse(data));
  });
});

// שמירת פגישות
app.post("/save-meetings", (req, res) => {
  const meetings = req.body;
  fs.writeFile(meetingsFile, JSON.stringify(meetings, null, 2), "utf8", (err) => {
    if (err) {
      console.error("שגיאה בשמירת הקובץ:", err);
      return res.status(500).send("שגיאה בשמירה");
    }
    res.send({ message: "הפגישות נשמרו בהצלחה" });
  });
});

app.listen(PORT, () => {
  console.log(`✅ השרת רץ על http://localhost:${PORT}`);
});
