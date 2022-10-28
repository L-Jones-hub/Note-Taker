const path = require(`path`);

const db = require(`../db/db.json`);
const idNumber = require(`../helpers/uuid`);
const storeNote = require(`../db/store-note`);
const fs = require(`fs`);

const router = require(`express`).Router();

router.get(`/notes`, (req, res) => {
  storeNote
    .getNote()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  storeNote
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
  storeNote
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

router.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, `../public/index.html`));
});

module.exports = router;
