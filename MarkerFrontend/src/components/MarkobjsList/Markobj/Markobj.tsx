import { useState } from "react";
import MarkobjViewer from "./MarkobjViewer";
import MarkobjEditor from "./MarkobjEditor";
import { MarkobjObject } from "../../../App";

export enum MarkobjView {
  VIEWING,
  EDITING,
}

export default function Markobj({ markobj }: { markobj: MarkobjObject }) {
  const [markobjView, setMarkobjView] = useState<MarkobjView>(MarkobjView.VIEWING);

  switch (markobjView) {
    case MarkobjView.VIEWING:
      return <MarkobjViewer markobj={markobj} setMarkobjView={setMarkobjView} />;
    case MarkobjView.EDITING:
      return <MarkobjEditor markobj={markobj} setMarkobjView={setMarkobjView} />;
    default:
      return <></>;
  }
}
