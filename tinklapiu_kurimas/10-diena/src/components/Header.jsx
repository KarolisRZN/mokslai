import "./Header.css";
import dog from "../assets/dog-cat.jpg";
export default function Header() {
  return (
    <header>
      <h1 className="header-title">Page title</h1>
      <img
        src={dog}
        alt="Dog and Cat"
        className="header-img w-100 object-fit-cover"
      />
    </header>
  );
}
