const db = require("../config/database");

const getAllProducts = (req, res) => {
  let query = "SELECT p.id, p.product_name, p.product_image, p.price, p.status, c.category_name, sc.sub_category_name FROM products p LEFT JOIN sub_category sc ON p.sub_category_id = sc.id LEFT JOIN category c ON p.category_id = c.id;"
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error fetching products");
    const product_res = results.map(product => {
        if (product.product_image) {
          product.product_image = product.product_image.toString('base64'); // Convert Buffer to Base64
        }
        return product;
      });
    res.status(200).json(product_res);
  });
};

  const createProduct = (req, res) => {
    const {
      product_name,
      status,
      price,
      sub_category_id,
      category_id,
      description,
      sequence,
    } = req.body;
    const product_imz = req.file ? req.file.buffer : null;
    db.query(
      "INSERT INTO products (product_name, product_image, status, price, description, sub_category_id, category_id, sequence) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [product_name,product_imz,status,price,description,sub_category_id,category_id,sequence],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Product creation failed', error: err });
        }
        res.status(201).json({ message: 'Product created successfully' });
      }
    );
  };

//Update
const updateProduct = (req, res) => {
  const { id } = req.params;
  console.log("Request params:", req.body);
  const {
    product_name,
    status,
    price,
    sub_category_id,
    category_id,
    description,
    sequence,
  } = req.body;

  const product_imz = req.file ? req.file.buffer : null;

  db.query(
    "UPDATE products SET product_name = ?,product_image = ?, status = ?, price = ?, description = ?, sub_category_id = ?, category_id = ?, sequence = ? WHERE id = ?",
      [product_name,product_imz,status,price, description,sub_category_id,category_id, sequence, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to update product", error: err });
      }
      res.status(200).json({ message: "Product updated successfully" });
    }
  );
};

const deleteProduct = (req, res) => {
  const { id } = req.params;
  console.log("id : ", id)
  db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete product', error: err });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
