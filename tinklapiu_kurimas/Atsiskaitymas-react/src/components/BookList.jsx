import '/src/styles/BookList.css';
import { Link } from 'react-router';


const BookList = ({ books, addToCart, returnBook }) => {
    return (
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.image} alt={book.title} className="book-image" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-price">${book.price}</p>
  
            {!book.inCart && !book.refunded && (
              <button onClick={() => addToCart(book.id)}>Add to Cart</button>
            )}

            {book.inCart && !book.refunded && (
              <button onClick={() => returnBook(book.id)}>Return</button>
            )}
  
            {book.inCart && !book.refunded && <p>In Cart</p>}
            {book.refunded && <p>Refunded</p>}

            {book.addedByUser && (
              <Link to={`/edit-book/${book.id}`}>
                <button>Edit</button>
              </Link>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default BookList;