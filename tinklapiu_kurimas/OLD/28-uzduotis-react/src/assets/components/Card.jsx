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
        <button
          className="btn btn-secondary"
          onClick={() => alert(`Details of ${user.login}`)}
        >
          View Details &raquo;
        </button>
      </div>
    </div>
  );
};

export default Card;
