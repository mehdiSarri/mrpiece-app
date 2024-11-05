import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <Link to={`/products/${product._id}`}>
        <h3>{product.name}</h3>
        <h3>DZD {product.price}</h3>
      </Link>
    </div>
  );
};
export default Product;
