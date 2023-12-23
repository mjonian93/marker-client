import { useState, Dispatch, SetStateAction } from "react";

import DeleteModal from "./DeleteModal";

import { MarkobjView } from "./Markobj";
import { MarkobjObject } from "../../../App";

import "./Markobj.styles.css";

import MarkMarkobj from "./MarkMarkobj";

interface MarkobjViewerProps {
  markobj: MarkobjObject;
  setMarkobjView: Dispatch<SetStateAction<MarkobjView>>;
}

export default function MarkobjViewer({ markobj, setMarkobjView }: MarkobjViewerProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id, title, markobj_body } = markobj;

  const handleDeleteMarkobj = () => {
    setShowDeleteModal(true);
  };

  const handleMarkMarkobj = () => {
    MarkMarkobj(markobj);
  };

  return (
    <div id="markobj-container">
      {showDeleteModal && (
        <DeleteModal showDeleteModal={setShowDeleteModal} markobjId={id} />
      )}
      <h3>{title}</h3>
      <p>{markobj_body}</p>
      <div className="markobj-buttons-container">
      <button
          className="neutral-btn"
          onClick={() => void handleMarkMarkobj()}
        >
          Mark
        </button>
        <button
          className="neutral-btn"
          onClick={() => setMarkobjView(MarkobjView.EDITING)}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => void handleDeleteMarkobj()}>
          Delete
        </button>
      </div>
    </div>
  );
}
