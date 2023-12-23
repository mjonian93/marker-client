import { useContext, Dispatch, SetStateAction } from "react";
import axios from "axios";

import { MarkobjObject, MarkobjsListUpdateFunctionContext } from "../../../App";

import "./DeleteModal.styles.css";

interface DeleteModalProps {
  markobjId: number;
  showDeleteModal: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteModal({
  markobjId,
  showDeleteModal,
}: DeleteModalProps) {
  const setMarkobjs = useContext(MarkobjsListUpdateFunctionContext);

  const handleYesClick = async () => {
    const API_URL = import.meta.env.VITE_MARK_API_URL;
    await axios.delete(`${API_URL}/markobj/${markobjId}`);

    const { data } = await axios.get<MarkobjObject[]>(`${API_URL}/markobjs`);
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
          <button id="yes-btn" onClick={() => void handleYesClick()}>
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
