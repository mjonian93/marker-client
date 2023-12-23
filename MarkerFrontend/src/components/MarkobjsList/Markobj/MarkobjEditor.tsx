import axios from "axios";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import { MarkobjObject, MarkobjsListUpdateFunctionContext } from "../../../App";
import { MarkobjView } from "./Markobj";

import "./Markobj.styles.css";

interface MarkobjEditorProps {
  markobj: MarkobjObject;
  setMarkobjView: Dispatch<SetStateAction<MarkobjView>>;
}

export default function MarkobjEditor({ markobj, setMarkobjView }: MarkobjEditorProps) {
  const [markobjTitle, setMarkobjTitle] = useState(markobj.title);
  const [markobjBody, setMarkobjBody] = useState(markobj.markobj_body);
  const [isInvalidSave, setIsInvalidSave] = useState(false);

  const setMarkobjs = useContext(MarkobjsListUpdateFunctionContext);

  const markobjTitleInputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  useEffect(() => {
    markobjTitleInputRef.current.focus();
  }, []);

  const handleMarkobjSave = async (
    event: FormEvent<HTMLFormElement>,
    id: typeof markobj.id
  ) => {
    event.preventDefault();

    if (markobjTitle.length > 0 || markobjBody.length > 0) {
      const API_URL = import.meta.env.VITE_MARK_API_URL;
      await axios.put(`${API_URL}/markobj/${id}`, {
        title: markobjTitle,
        markobj_body: markobjBody,
      });
      const { data } = await axios.get<MarkobjObject[]>(`${API_URL}/markobjs`);
      setMarkobjs(data);

      setMarkobjView(MarkobjView.VIEWING);
    } else {
      setIsInvalidSave(true);
      markobjTitleInputRef.current.focus();
    }
  };

  return (
    <form
      id="markobj-container"
      onSubmit={(event) => void handleMarkobjSave(event, markobj.id)}
    >
      <input
        type="text"
        placeholder="Enter Markobj Title"
        ref={markobjTitleInputRef}
        id="markobj-title-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        value={markobjTitle}
        onChange={(event) => {
          setIsInvalidSave(false);
          setMarkobjTitle(event.target.value);
        }}
      />
      <textarea
        placeholder="Enter Markobj"
        id="markobj-body-edit-input"
        className={isInvalidSave ? "input-error" : ""}
        cols={30}
        rows={5}
        value={markobjBody}
        onChange={(event) => {
          setIsInvalidSave(false);
          setMarkobjBody(event.target.value);
        }}
      />
      <div className="markobj-buttons-container">
        <button className="save-btn" type="submit">
          Save
        </button>
        <button
          className="neutral-btn"
          type="button"
          onClick={() => setMarkobjView(MarkobjView.VIEWING)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
