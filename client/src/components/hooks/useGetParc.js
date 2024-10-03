import { useState, useEffect } from "react";

const useGetParc = () => {
  const [parc, setParc] = useState(null);

  useEffect(() => {
    const getParc = async () =>
      await fetch("/parc")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          } else return response.json();
        })
        .then((data) => setParc(data))
        .catch((error) => console.error("Error fetching parc:", error));
    getParc();
  }, []);

  return parc;
};

export default useGetParc;
