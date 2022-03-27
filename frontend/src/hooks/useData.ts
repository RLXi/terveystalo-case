import { Measurement } from "../interfaces";
import { useState, useEffect, useMemo } from "react";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";

const apiurl = import.meta.env.VITE_APIURL || "http://localhost:8080/api";

export function useData() {
  const [data, setData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`${apiurl}/tests`);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setData([]);
        setLoading(false);
      }
    }
    setReload(false);
    getData();
  }, [reload]);

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  async function deleteItem(id: number) {
    try {
      const response = await axios.delete(`${apiurl}/tests/${id}`);
      const filtered = data.filter((item) => item.id !== id);
      setData(filtered);
      notifications.showNotification({
        message: "Measurement deleted",
      });
    } catch (e) {
      console.error(e);
    }
  }

  return { data: memoizedData, loading, deleteItem, setReload };
}
