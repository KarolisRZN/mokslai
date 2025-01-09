import "./Header.css";

export default function Header(props) {
  console.log(props); // Kas ten?
  return (
    <header>
      <h1 className="header-title">{props.title}</h1>
      <img
        src={props.link}
        alt="Describe the image"
        className="header-img w-100 object-fit-cover"
      />
    </header>
  );
}
