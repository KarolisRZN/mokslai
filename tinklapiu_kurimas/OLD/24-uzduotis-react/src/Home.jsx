import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {}
      <Link to="/about">Go to about</Link>
    </div>
  );
}

export default Home;