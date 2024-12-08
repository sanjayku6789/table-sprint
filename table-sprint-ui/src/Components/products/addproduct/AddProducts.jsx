import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No JWT token found.");
      return;
    }

    fetch("http://localhost:3000/category/all", {
      headers: {
        auth_token: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [token]);

  useEffect(() => {
    if (category && token) {
      fetch(`http://localhost:3000/subcategory/bycat/${category}`, {
        headers: {
          auth_token: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSubCategories(data);
        })
        .catch((error) => {
          console.error("Error fetching subcategories:", error);
        });
    } else {
      setSubCategories([]);
    }
  }, [category, token]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.error("No JWT token found.");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    if (image) {
      formData.append("product_image", image);
    }
    formData.append("status", "0"); // Assuming "0" is a placeholder value
    formData.append("price", "19999.00"); // Placeholder price
    formData.append("description", "Realme 5G Mobile"); // Placeholder description
    formData.append("sub_category_id", subCategory);
    formData.append("category_id", category);
    formData.append("sequence", "1"); // Placeholder sequence

    try {
      const response = await fetch("http://localhost:3000/products/create", {
        method: "POST",
        headers: {
          auth_token: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Product added successfully:", result);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Category Dropdown */}
          <div className="col-md-4">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="col-md-4">
            <label className="form-label">Subcategory</label>
            <select
              className="form-select"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              disabled={!category}
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subCat) => (
                <option key={subCat.id} value={subCat.id}>
                  {subCat.sub_category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name Input */}
          <div className="col-md-4">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="col-md-6">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            <small className="form-text text-muted">
              Maximum allowed file size is 10MB
            </small>
          </div>

          {/* Preview Image */}
          <div className="col-md-6 text-center">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxHeight: "150px", marginTop: "10px" }}
              />
            ) : (
              <div
                className="border rounded d-flex align-items-center justify-content-center"
                style={{ height: "150px", marginTop: "10px" }}
              >
                <span>Image Preview</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
