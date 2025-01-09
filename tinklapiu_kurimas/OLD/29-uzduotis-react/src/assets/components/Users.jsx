import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Users = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/user/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-center">
      <img 
        src={user.avatar_url} 
        alt={`${user.login} avatar`} 
        className="rounded-circle" 
        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
      />
      <h2 className="mt-3">{user.login}</h2>
      <p><strong>Name:</strong> {user.name || 'N/A'}</p>
      <p><strong>Company:</strong> {user.company || 'N/A'}</p>
      <p><strong>Location:</strong> {user.location || 'N/A'}</p>
    </div>
  );
};

export default Users;