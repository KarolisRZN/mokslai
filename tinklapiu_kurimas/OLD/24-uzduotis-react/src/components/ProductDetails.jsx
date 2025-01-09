import { useParams, Link } from "react-router-dom";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Link to="/products">Back to product list</Link>
    </div>
  );
}

export default ProductDetails;