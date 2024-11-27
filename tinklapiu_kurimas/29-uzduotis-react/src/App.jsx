import React, { useEffect, useState } from "react";
import Card from "/src/assets/components/Card";
import Users from "/src/assets/components/Users";
import { BrowserRouter as Router, Routes, Route } from 'react-router';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                {users.map((user) => (
                  <div className="col-md-4 col-sm-6 mb-4" key={user.id}>
                    <Card user={user} />
                  </div>
                ))}
              </div>
            }
          />
          <Route path="/users/:id" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;