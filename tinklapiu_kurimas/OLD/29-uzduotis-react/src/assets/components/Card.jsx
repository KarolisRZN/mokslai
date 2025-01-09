import { Link } from "react-router";

const Card = ({ user }) => {
  return (
    <div className="card text-center p-3 border-0">
      <img
        src={user.avatar_url}
        className="rounded-circle mx-auto"
        alt={`${user.login} avatar`}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title mt-2">{user.login}</h5>
        <Link to={`/users/${user.id}`} className="btn btn-secondary">
          View Details &raquo;
        </Link>
      </div>
    </div>
  );
};

export default Card;
