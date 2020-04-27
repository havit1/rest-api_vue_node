const express = require("express");
const app = express();
const { v4 } = require("uuid");
const path = require("path");

let CONTACTS = [{ id: v4(), name: "test", value: "123456789", marked: false }];

app.use(express.json());

app.get("/api/contacts", (req, res) => {
  res.status(200).json(CONTACTS);
});

app.delete("/api/contacts/:id", (req, res) => {
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: "Deleted" });
});

app.post("/api/contacts", (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(3000, () => console.log("Server is running on port 3000..."));
