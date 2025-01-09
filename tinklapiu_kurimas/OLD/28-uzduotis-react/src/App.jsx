import React, { useEffect, useState } from "react";
import Card from "/src/assets/components/Card";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <Card user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
