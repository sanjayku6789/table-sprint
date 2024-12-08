import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SubCategory.css";

const SubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No JWT token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/subcategory/all", {
      method: "GET",
      headers: {
        "auth_token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sub category");
        }
        return response.json();
      })
      .then((data) => {
        setSubCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching sub category:", error);
      });
  }, [navigate]);

  const deleteSubCategory = (subCategoryId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this sub category?"
    );
    if (isConfirmed) {
      if (!token) {
        console.error("No JWT token found");
        return;
      }

      fetch(`http://localhost:3000/subcategory/delete/${subCategoryId}`, {
        method: "DELETE",
        headers: {
          "auth_token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete sub category.");
          }
          alert("Sub Category deleted successfully");
          setSubCategories((prevSubCategories) =>
            prevSubCategories.filter((subCategory) => subCategory.id !== subCategoryId)
          );
        })
        .catch((error) => {
          console.error("Error deleting sub category:", error);
          alert("Failed to delete sub category.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="product-header">Sub Category</h3>
        <Link to="/home/addsubcategory" className="btn btn-add-category">
          Add Sub Category
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Sub Category Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory) => (
              <tr key={subCategory.id}>
                <td>{subCategory.id}</td>
                <td>{subCategory.sub_category_name}</td>
                <td>
                <img src={`data:image/jpeg;base64,${subCategory.sub_category_image}`} alt={subCategory.sub_category_name} className="category-image" style={{ maxWidth: "100px", height: "auto" }}/>
                </td>
                <td
                  className={
                    subCategory.status === "Active"
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {subCategory.status}
                </td>
                <td>{subCategory.category_name}</td>
                <td>
                  <button
                    className="btn btn-link text-primary"
                    onClick={() => navigate(`/edit-sub-category/${subCategory.id}`)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => deleteSubCategory(subCategory.id)}
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

export default SubCategory;
