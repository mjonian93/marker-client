import { useState, useEffect, useRef, useContext, FormEvent } from "react";
import axios from "axios";

import "./AddMarkobj.styles.css";
import { MarkobjObject, MarkobjsListUpdateFunctionContext } from "../../App";

export default function AddMarkobj() {
  const [title, setTitle] = useState("");
  const [markobjBody, setMarkobjBody] = useState("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [hasInputError, setHasInputError] = useState(false);

  const setMarkobjs = useContext(MarkobjsListUpdateFunctionContext);

  const titleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length > 0 || markobjBody.length > 0) {
      setIsFormSubmitting(true);
      const API_URL = import.meta.env.VITE_MARK_API_URL;
      const { data } = await axios.post<MarkobjObject>(`${API_URL}/markobj`, {
        title,
        note_body: markobjBody,
      });
      setMarkobjs((prev) => [...prev, data]);
    } else {
      setHasInputError(true);
    }

    setTitle("");
    setMarkobjBody("");
    setIsFormSubmitting(false);
    titleInputRef.current.focus();
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)} id="add-markobj-form">
      <input
        type="text"
        placeholder="Enter Title"
        ref={titleInputRef}
        id="title-input"
        className={hasInputError ? "input-error" : ""}
        value={title}
        onChange={(event) => {
          setHasInputError(false);
          setTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Markobj"
        id="markobj-body-textarea"
        className={hasInputError ? "input-error" : ""}
        cols={30}
        rows={10}
        value={markobjBody}
        onChange={(event) => {
          setHasInputError(false);
          setMarkobjBody(event.target.value);
        }}
      />
      <button id="add-markobj-btn" type="submit" disabled={isFormSubmitting}>
        {isFormSubmitting ? "..." : "Add Markobj"}
      </button>
    </form>
  );
}
