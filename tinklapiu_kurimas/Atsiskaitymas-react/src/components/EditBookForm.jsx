import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

const EditBookForm = ({ books, updateBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookToEdit = books.find((book) => book.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: bookToEdit?.title || "",
    author: bookToEdit?.author || "",
    price: bookToEdit?.price || "",
    image: bookToEdit?.image || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = { ...formData, id: parseInt(id) };
    updateBook(updatedBook);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Update Book</button>
    </form>
  );
};

export default EditBookForm;
