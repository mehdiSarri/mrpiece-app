import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);

  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  return (
    <div className="product-vew">
      <h2>{product.name}</h2>
      <div className="product-section">
        <img src={product.image} alt={product.name} />
        <h3>${product.price}</h3>
        <p>{product.description}</p>
      </div>
      <Link to={"/"}>
        <button>Retour</button>
      </Link>
    </div>
  );
};
export default ProductScreen;
