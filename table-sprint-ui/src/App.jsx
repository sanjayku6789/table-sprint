import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Login from "./Components/login/Login";
import ProductList from "./Components/products/ProductList";
import DashBoard from "./Components/dashboard/DashBoard";
import NavBar from "./Components/navbar/NavBar";
import Header from "./Components/header/Header"; // Assuming Header is in Components/header
import "bootstrap/dist/css/bootstrap.min.css";
import AddProducts from "./Components/products/addproduct/AddProducts";
import Category from "./Components/category/Category";
import AddCategory from "./Components/category/addcategory/AddCategory";
import SubCategory from "./Components/subcategory/SubCategory";
import ProductDetails from "./Components/products/viewproduct/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="category" element={<Category />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="add-product" element={<AddProducts />} />
          <Route path="product-details" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function HomeLayout() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1">
        <div className="flex-shrink-0">
          <NavBar />
        </div>

        <div className="flex-grow-1 p-3 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;