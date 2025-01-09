import '/src/styles/Navbar.css';
import { Link } from 'react-router';
const Navbar = () => {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/add-book" className="navbar-link">Add Book</Link>
          </li>
          <li className="navbar-item">
            <Link to="/edit-book" className="navbar-link">Edit Book</Link>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;