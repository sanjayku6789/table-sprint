import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No JWT token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/products/all", {
      method: "GET",
      headers: {
        "auth_token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.message);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        toast.error("sajfsdjvjds", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  }, [navigate]);

  const viewProductDetails = (product) => {
    navigate("/home/product-details", { state: { product } });
  };

  const deleteProduct = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      if (!token) {
        console.error("No JWT token found. Cannot proceed with deletion.");
        return;
      }

      fetch(`http://localhost:3000/products/delete/${productId}`, {
        method: "DELETE",
        headers: {
          "auth_token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete product.");
          }
          alert("Product deleted successfully");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="product-header">Product List</h3>
        <Link to="/home/add-product" className="btn btn-primary">
          Add Product
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Status</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>{product.category_name}</td>
                <td>{product.sub_category_name}</td>
                <td className={product.status === 1 ? "text-success" : "text-danger"}>{product.status === 1 ? "Active" : "Inactive"}</td>
                <td>{product.price}</td>
                <td>
                  <button className="btn btn-link text-primary" onClick={() => viewProductDetails(product)}>
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-link text-danger" onClick={() => deleteProduct(product.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
