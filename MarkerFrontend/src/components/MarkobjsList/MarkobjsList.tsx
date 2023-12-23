import { MarkobjObject } from "../../App";
import Markobj from "./Markobj";

import "./MarkobjsList.styles.css";

export default function MarkobjsList({ markobjs }: { markobjs: MarkobjObject[] }) {
  return (
    <div id="markobjs-list-container">
      <h2 id="markobjs-list-header">MARKOBJS</h2>
      <ul id="markobjs-list">
        {markobjs.map((markobj) => (
          <li key={markobj.id}>
            <Markobj markobj={markobj} />
          </li>
        ))}
      </ul>
    </div>
  );
}
