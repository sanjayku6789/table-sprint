import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCategory.css";
import { useNavigate } from "react-router-dom";


function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categorySequence, setCategorySequence] = useState(0);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();


  const handleImageUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setImage(URL.createObjectURL(uploadedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("sequence", categorySequence);
    formData.append("status", 1);
    formData.append("category_image", file);

    try {
      const response = await fetch("http://localhost:3000/category/add", {
        method: "POST",
        headers: {
          auth_token: token,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Category added successfully!");
        navigate(-1);
      } else {
        const error = await response.json();
        alert(`Failed to add category: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while adding the category.");
    }
  };

  return (
    <div className="container">
      <div className="card p-4 shadow">
        <h3 className="mb-4">Add Category</h3>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="categorySequence" className="form-label">
                Category Sequence
              </label>
              <div className="input-group">
                <input
                  type="number"
                  id="categorySequence"
                  className="form-control"
                  value={categorySequence}
                  onChange={(e) => setCategorySequence(e.target.value)}
                  placeholder="Enter sequence number"
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <div className="d-flex align-items-center">
              <div className="image-preview me-3">
                {image ? (
                  <img src={image} alt="Uploaded" />
                ) : (
                  <span className="text-muted">No Image</span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
                />
                <small className="text-muted">Max file size: 10MB</small>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Save Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
