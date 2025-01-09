import React, { useState } from "react";
import { useNavigate } from "react-router";
const AddBookForm = ({ addBook }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categories = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Fantasy",
    "Biography",
    "Science",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.title.length < 3 || formData.title.length > 100) {
      newErrors.title = "Title must be between 3 and 100 characters.";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.author)) {
      newErrors.author = "Author must contain only letters and spaces.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(formData.image)) {
      newErrors.image =
        "Image must be a valid URL ending with .jpg, .jpeg, .png, or .webp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addBook(formData);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>

      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      {errors.title && <p className="error">{errors.title}</p>}

      <label>
        Author:
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </label>
      {errors.author && <p className="error">{errors.author}</p>}

      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      {errors.category && <p className="error">{errors.category}</p>}

      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </label>
      {errors.price && <p className="error">{errors.price}</p>}

      <label>
        Image URL:
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </label>
      {errors.image && <p className="error">{errors.image}</p>}

      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
