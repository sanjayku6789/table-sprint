import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="container mt-4">
        <p>No product data available. Please go back to the product list.</p>
        <button className="btn btn-primary" onClick={() => navigate("/home/products")}>
          Back to Product List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Product Details</h3>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{product.product_name}</h5>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Category:</strong> {product.category_name}</p>
              <p><strong>Subcategory:</strong> {product.sub_category_name}</p>
              <p><strong>Status:</strong> {product.status === 1 ? "Active" : "Inactive"}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Description:</strong> {product.description || "N/A"}</p>
              {product.product_image && (
                <img
                  src={`data:image/jpeg;base64,${product.product_image}`}
                  alt={product.product_name}
                  className="img-thumbnail"
                  style={{ maxHeight: "200px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/home/products")}>
        Back to Product List
      </button>
    </div>
  );
};

export default ProductDetails;
