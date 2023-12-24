import axios from "axios";

import { MarkobjObject } from "../../../App";

export default async function MarkMarkobj(markobj: MarkobjObject) {
    const API_URL = import.meta.env.VITE_MARK_API_URL;
    // const { data } = await axios.post(`${API_URL}/mark/${markobj.id}`);
    await axios.post(`${API_URL}/mark/${markobj.id}`);
}