import "./styles/style.css";

import "./scripts/components/utils.js";
import "./scripts/components/app-bar.js";
import "./scripts/components/footer-bar.js";
import "./scripts/components/note-list.js";
import "./scripts/components/note-item.js";
import "./scripts/components/note-input.js";
import Utils from "./scripts/components/utils.js";

const noteList = document.querySelector("note-list");

const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

async function createNotes(noteData) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    };
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes", options);
    const result = await response.json();
    showResponseMessage(result.message);
  } catch (error) {
    showResponseMessage("Error creating note:", error);
  }
  renderNotes();
}

async function deleteNotes(noteId) {
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, options);
    const result = await response.json();
    showResponseMessage(result.message);
  } catch (error) {
    showResponseMessage(error);
  }
  renderNotes();
}

async function renderNotes() {
  noteList.innerHTML = "";
  const loading = document.querySelector("#loading");

  Utils.showLoading(loading);

  try {
    const response = await fetch("https://notes-api.dicoding.dev/v2/notes");

    await Utils.sleep();

    const notes = await response.json();

    if (notes.status === "success") {
      notes.data.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.noteData = {
          id: note.id,
          title: note.title,
          body: note.body,
          createdAt: note.createdAt,
          archived: note.archived,
        };

        noteItem.addEventListener("note-delete", (event) => {
          const noteId = event.detail.id;
          deleteNotes(noteId);
        });

        noteList.appendChild(noteItem);
      });
    } else {
      noteList.innerHTML = "<p>Gagal memuat catatan.</p>";
    }
  } catch (error) {
    noteList.innerHTML = "<p>Gagal memuat catatan.</p>";
    console.error("Error loading notes:", error);
  } finally {
    Utils.hideLoading(loading);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.querySelector("note-input");
  const shadowForm = noteInput.shadowRoot.querySelector("#note-input");
  const shadowTitle = noteInput.shadowRoot.querySelector("#title");
  const shadowBody = noteInput.shadowRoot.querySelector("#body");

  shadowForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const noteData = {
      title: shadowTitle.value,
      body: shadowBody.value,
    };

    createNotes(noteData);
  });
});

renderNotes();
