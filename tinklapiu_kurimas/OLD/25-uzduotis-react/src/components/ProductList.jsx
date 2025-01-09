import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

function ProductList() {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} <Link to={`/products/${product.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;