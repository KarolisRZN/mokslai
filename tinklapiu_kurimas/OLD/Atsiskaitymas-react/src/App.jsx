import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router";
import Navbar from "/src/components/Navbar";
import Footer from "/src/components/Footer";
import BookList from "/src/components/BookList";
import AddBookForm from "/src/components/AddBookForm";
import EditBookForm from "/src/components/EditBookForm";
import BookCatalog from "/src/components/BookCatalog";
import "./App.css";

const App = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Natashas Dance",
      author: "Orlando Figes",
      image:
        "https://dauntbooks.co.uk/wp-content/uploads/2020/06/9780140297966.jpg.webp",
      price: 19.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 2,
      title: "Hamlet",
      author: "William Shakespeare",
      image:
        "https://hawkherald.com/wp-content/uploads/2024/04/IMG_9984-900x1200.jpeg",
      price: 9.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 3,
      title: "Macbeth",
      author: "William Shakespeare",
      image:
        "https://m.media-amazon.com/images/I/61hohBiQGAL._AC_UF1000,1000_QL80_.jpg",
      price: 15.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 4,
      title: "The Hobiet",
      author: "J. R. R. Tolkien",
      image:
        "https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg",
      price: 29.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 5,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      image:
        "https://m.media-amazon.com/images/I/81LVEH25iJL._AC_UF1000,1000_QL80_.jpg",
      price: 9.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 6,
      title: "Harry Potter",
      author: "J.K. Rowling",
      image:
        "https://target.scene7.com/is/image/Target/GUEST_1c7dc567-7645-4c95-844f-9ab0457f29f1?wid=488&hei=488&fmt=pjpeg",
      price: 9.99,
      inCart: false,
      refunded: false,
    },
    {
      id: 7,
      title: "David Copperfield",
      author: "Charles Dickens",
      image:
        "https://m.media-amazon.com/images/I/71yeEaCVIrL._UF1000,1000_QL80_.jpg",
      price: 9.99,
      inCart: false,
      refunded: false,
    },
  ]);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      {
        ...newBook,
        id: prevBooks.length + 1,
        inCart: false,
        refunded: false,
        addedByUser: true,
      },
    ]);
  };

  const addToCart = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, inCart: true, refunded: false } : book
      )
    );
  };

  const returnBook = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, inCart: false, refunded: true } : book
      )
    );
  };

  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                addToCart={addToCart}
                returnBook={returnBook}
              />
            }
          />
          <Route path="/add-book" element={<AddBookForm addBook={addBook} />} />

          <Route
            path="/edit-book/:id"
            element={<EditBookForm books={books} updateBook={updateBook} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
