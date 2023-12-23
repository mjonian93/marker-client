import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";

import AddMarkobj from "./components/AddMarkobj";
import MarkobjsList from "./components/MarkobjsList";

import "./App.css";
import "./utility.styles.css";

export interface MarkobjObject {
  id: number;
  title: string;
  markobj_body: string;
}

export const MarkobjsListUpdateFunctionContext = createContext(
  {} as Dispatch<SetStateAction<MarkobjObject[]>>
);

export default function App() {
  const [markobjs, setMarkobjs] = useState<MarkobjObject[]>([]);

  useEffect(() => {
    const getMarkobjs = async () => {
      const API_URL = import.meta.env.VITE_MARK_API_URL;
      const { data } = await axios.get<MarkobjObject[]>(`${API_URL}/markobjs`);
      setMarkobjs(data);
    };

    void getMarkobjs();
  }, []);

  return (
    <MarkobjsListUpdateFunctionContext.Provider value={setMarkobjs}>
      <div>
        <h1 id="app-title">Mark App</h1>
        <small id="made-with-txt">
          Made with{" "}
          <a target="_blank" href="https://fastapi.tiangolo.com/">
            FastAPI
          </a>{" "}
          and
          <a target="_blank" href="https://react.dev/">
            {" "}
            React.js
          </a>
        </small>
        <AddMarkobj />
        <hr />
        <MarkobjsList markobjs={markobjs} />
      </div>
    </MarkobjsListUpdateFunctionContext.Provider>
  );
}
