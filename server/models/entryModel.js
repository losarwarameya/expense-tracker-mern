const mongoose = require("mongoose");
const express = require("express");

const main = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/expense-tracker");
    console.log("connected to expense tracker database");
  } catch (error) {
    console.error("Error connecting to the database");
  }
};
main();

const EntriesSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Entries = mongoose.model("entries", EntriesSchema);

const app = express();

//Get entries
app.get("/entries", async (req, res) => {
  try {
    const entriesData = await Entries.find();
    res.json(entriesData);
  } catch (error) {
    console.error(error);
  }
});

//Middlewares
app.use(express.json());

//validate that all the required fields are present
const validateEntry = (req, res, next) => {
  const { heading, type, amount, userId } = req.body;
  if (heading == null || type == null || amount == null || userId == null) {
    return res.status(400).send("Required field missing");
  }
  next();
};

//Post entries
app.post("/add-entry", validateEntry, async (req, res) => {
  try {
    const newEntry = new Entries(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//Update entries
app.put("/update-entry/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, userId } = req.body; // replace these with the actual fields you want to update
    const updatedEntry = await Entries.findByIdAndUpdate(
      id,
      { amount, userId },
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).send("Entry not found");
    }
    res.json(updatedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//delete an entry
app.delete("/delete-entry/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await Entries.findByIdAndDelete(id);
    res.status(201).json(deletedEntry);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Server listening at port 5000");
});
