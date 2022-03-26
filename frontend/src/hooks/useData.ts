import { Measurement } from "../interfaces";
import { useState, useEffect } from "react";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";

const apiurl = import.meta.env.VITE_APIURL || "http://localhost:8080/api";

export function useData() {
  const [data, setData] = useState<Measurement[]>([]);
  const notifications = useNotifications();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${apiurl}/tests`);
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
      const response = await axios.delete(`${apiurl}/tests/${id}`);
      console.log(response);
      const filtered = data.filter((item) => item.id !== id);
      setData(filtered);
      notifications.showNotification({
        message: "Measurement deleted",
      });
    } catch (e) {
      console.error(e);
    }
  }

  return { data, deleteItem };
}
