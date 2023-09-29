import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        seterror(res.status);
        console.log(res)
        return res.json();
      })
      .then((data) => {
        setdata(data);
        setloading(false);
      });
  }, [url]);

  return { data: data, loading, error };
};

export default useFetch;
