import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError("An error has occurred");
    }
  }, [url]);

  const postData = async (postData: unknown, postUrl: string = url) => {
    try {
      return await axios({
        url: postUrl,
        method: "post",
        data: postData,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      setError("An error has occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData, postData };
};
