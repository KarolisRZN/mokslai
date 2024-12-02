const BookCatalog = () => {
  return (
    <div className="catalog-container">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <img src={book.image} alt={book.title} className="book-image" />
          <div className="discount-badge">{book.discount}</div>
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <div className="book-price">
            <span className="current-price">{book.price} €</span>
            <span className="old-price">{book.oldPrice} €</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCatalog;