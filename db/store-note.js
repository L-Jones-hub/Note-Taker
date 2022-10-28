const util = require(`util`);
const fs = require(`fs`);
const idNumber = require(`../helpers/uuid`);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFile(`db/db.json`);
  }
  write(note) {
    return writeFile(`db/db.json`, JSON.stringify(note));
  }
  getNote() {
    return this.read().then((notes) => {
      let parsedNote;
      try {
        parsedNote = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNote = [];
      }
      return parsedNote;
    });
  }
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error(`Make sure you've added a title and text to your note.`);
    }
    const newNote = { title, text, idNumber };
    return this.getNote()
      .then((notes) => [...notes, newNote])
      .then((updatedNote) => this.write(updatedNote))
      .then(() => newNote);
  }
  deleteNote(id) {
    return this.getNote()
      .then((note) => note.filter((note) => note.idNumber !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
