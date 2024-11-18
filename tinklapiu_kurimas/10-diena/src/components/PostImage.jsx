import "./PostImage.css";
import dog from "../assets/dog-cat.jpg";
export default function PostImage() {
  return (
    <div className="post-image">
      <img
        src={dog}
        alt="Dog and Cat"
        className="header-img w-100 object-fit-cover"
      />
    </div>
  );
}
