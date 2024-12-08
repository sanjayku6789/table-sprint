const db = require("../config/database");

const getAllCategory = (req, res) => {
  let query = "SELECT * from category;";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error fetching category");
    const result = results.map((category) => {
      if (category.category_image) {
        category.category_image = category.category_image.toString("base64"); // Convert Buffer to Base64
      }
      return category;
    });
    res.status(200).json(result);
  });
};


const createCategory = (req, res) => {
    const {category_name, status, sequence} = req.body;
    const category_imz = req.file ? req.file.buffer : null;
    let query ="INSERT INTO category (category_name, category_image, status, sequence) VALUES (?, ?, ?, ?)"
    db.query(query, [category_name,category_imz,status,sequence],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Category creation failed', error: err });
        }
        res.status(201).json({ message: 'Category created successfully' });
      }
    );
  };


  const editCategory = (req, res) => {
    const { id } = req.params;
    const {category_name, status, sequence} = req.body;
    const category_imz = req.file ? req.file.buffer : null;
  
    db.query(
      "UPDATE category SET category_name = ?, category_image = ?, status = ?, sequence = ? WHERE id = ?",
        [category_name, category_imz, status, sequence, id],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to update category", error: err });
        }
        res.status(200).json({ message: "category updated successfully" });
      }
    );
  };

  const deleteCategory = (req, res) => {
    const { id } = req.params;
    let query = "DELETE FROM category WHERE id = ?"
    db.query(query, [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete category', error: err });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    });
  };

module.exports = {
    getAllCategory,
    createCategory,
    editCategory,
    deleteCategory
  };
