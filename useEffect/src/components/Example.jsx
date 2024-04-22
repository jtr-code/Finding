import { useEffect, useState } from "react";

const Example = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState(1);

  console.log("user: ", user);

  useEffect(() => {
    const BASE_URL = `https://dummyjson.com/users/${id}`;

    const controller = new AbortController();

    fetch(BASE_URL, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch ${id}`);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // setTimeout(() => {
        setUser(data);
        setLoading(false);
        // }, 1000);
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    return () => {
      controller.abort();
    };
  }, [id]);

  function handleClick() {
    setId(Math.floor(Math.random() * 100));
  }
  return (
    <div>
      <button onClick={handleClick}>Add some values</button>
      {loading ? (
        "Loading some content..."
      ) : (
        <>
          {error && <div>{error}</div>}
          {user && (
            <article>
              <p>
                {user.firstName}&nbsp;
                {user.lastName}
              </p>
            </article>
          )}
        </>
      )}
    </div>
  );
};

export default Example;
