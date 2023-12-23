import { useContext } from "react";
import axios from "axios";

import { NotesListUpdateFunctionContext } from "../../../App";
import "./DeleteModal.styles.css";

export default function DeleteModal({ noteId, showDeleteModal }) {
  const setNotes = useContext(NotesListUpdateFunctionContext);
  const handleYesClick = async () => {
    const API_URL = "http://localhost:8000";
    await axios.delete(`${API_URL}/note/${noteId}`);
    const { data } = await axios.get(`${API_URL}/notes`);
    setNotes(data);
    showDeleteModal(false);
  };
  const handleNoClick = () => {
    showDeleteModal(false);
  };
  return (
    <div id="delete-modal-container">
      <div id="delete-modal">
        <p id="prompt-msg">Delete this Note?</p>
        <div id="btn-container">
          <button id="yes-btn" onClick={() => handleYesClick()}>
            Yes
          </button>
          <button id="no-btn" onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}