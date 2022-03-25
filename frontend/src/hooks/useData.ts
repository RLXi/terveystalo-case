import { Measurement } from "../interfaces";
import { useState, useEffect } from "react";
import axios from "axios";

export function useData() {
  const [data, setData] = useState<Measurement[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get("http://localhost:4000/tests");
        setData(response.data);
      } catch (e) {
        console.error(e);
        setData([]);
      }
    }
    getData();
  }, []);

  async function deleteItem(id: number) {
    try {
      const response = await axios.delete(`http://localhost:4000/tests/${id}`);
      console.log(response);
      const filtered = data.filter((item) => item.id !== id);
      setData(filtered);
    } catch (e) {
      console.error(e);
    }
  }

  return { data, deleteItem };
}
