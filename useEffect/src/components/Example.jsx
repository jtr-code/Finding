import { useEffect, useState } from "react";

const Example = () => {
  // State variables for user data, loading state, error state, and ID
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [id, setId] = useState(1);

  /*
    The AbortController is used to cancel the fetch request if the component unmounts,
    preventing unnecessary network requests and potential memory leaks.
    This ensures that only the latest fetch request is processed and older requests are aborted.
  */

  // Fetch user data when ID changes
  useEffect(() => {
    const BASE_URL = `https://dummyjson.com/users/${id}`;

    const controller = new AbortController();

    // Fetch user data from the API
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
        // Set user data and update loading state
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    // Cleanup function to abort fetch request if component unmounts
    return () => {
      controller.abort();
    };
  }, [id]);

  // Function to generate a random ID when button is clicked
  function handleClick() {
    setId(Math.floor(Math.random() * 100));
  }

  // Render the component with loading, error, and user data handling
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
