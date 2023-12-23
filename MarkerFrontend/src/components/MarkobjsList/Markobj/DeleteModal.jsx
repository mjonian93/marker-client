import { useContext } from "react";
import axios from "axios";

import { MarkobjsListUpdateFunctionContext } from "../../../App";
import "./DeleteModal.styles.css";

export default function DeleteModal({ markobjId, showDeleteModal }) {
  const setMarkobjs = useContext(MarkobjsListUpdateFunctionContext);
  const handleYesClick = async () => {
    const API_URL = "http://localhost:8000";
    await axios.delete(`${API_URL}/markobj/${markobjId}`);
    const { data } = await axios.get(`${API_URL}/markobjs`);
    setMarkobjs(data);
    showDeleteModal(false);
  };
  const handleNoClick = () => {
    showDeleteModal(false);
  };
  return (
    <div id="delete-modal-container">
      <div id="delete-modal">
        <p id="prompt-msg">Delete this Markobj?</p>
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