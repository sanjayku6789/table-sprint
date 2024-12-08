import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No JWT token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/category/all", {
      method: "GET",
      headers: {
        "auth_token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [navigate]);

  const deleteCategory = (categoryId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (isConfirmed) {
      if (!token) {
        console.error("No JWT token found. Cannot proceed with deletion.");
        return;
      }

      fetch(`http://localhost:3000/category/delete/${categoryId}`, {
        method: "DELETE",
        headers: {
          "auth_token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete category.");
          }
          alert("Category deleted successfully");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
          );
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          alert("Failed to delete category.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="product-header">Category</h3>
        <Link to="/home/addcategory" className="btn btn-add-category">
          Add Category
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Category Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>Sequence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.category_name}</td>
                <td>
                <img src={`data:image/jpeg;base64,${category.category_image}`} alt={category.category_name} className="category-image" style={{ maxWidth: "100px", height: "auto" }}/>
                </td>
                <td
                  className={
                    category.status === "Active"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {category.status}
                </td>
                <td>{category.sequence}</td>
                <td>
                  <button
                    className="btn btn-link text-primary"
                    onClick={() => navigate(`/edit-category/${category.id}`)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => deleteCategory(category.id)}
                  >
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

export default Category;
