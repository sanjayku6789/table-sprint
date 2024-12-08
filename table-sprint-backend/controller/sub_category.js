const db = require("../config/database");

const getAllSubCategory = (req, res) => {
  let query = "SELECT sc.id, sc.sub_category_name,sc.sub_category_image,sc.status,c.category_name FROM sub_category sc left join category c on sc.category_id = c.id;";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("Error fetching sub category");
    const result = results.map((subcategory) => {
      if (subcategory.sub_category_image) {
        subcategory.sub_category_image = subcategory.sub_category_image.toString("base64");
      }
      return subcategory;
    });
    res.status(200).json(result);
  });
};


const createSubCategory = (req, res) => {
    const {sub_category_name, status, category_id} = req.body;
    const sub_category_imz = req.file ? req.file.buffer : null;
    let query ="INSERT INTO sub_category (sub_category_name, sub_category_image, status, category_id) VALUES (?, ?, ?, ?)"
    db.query(query, [sub_category_name,sub_category_imz,status,category_id],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Sub Category creation failed', error: err });
        }
        res.status(201).json({ message: 'Sub Category created successfully' });
      }
    );
  };


  const editSubCategory = (req, res) => {
    const { id } = req.params;
    const {sub_category_name, status, category_id} = req.body;
    const sub_category_imz = req.file ? req.file.buffer : null;
  
    db.query(
      "UPDATE sub_category SET sub_category_name = ?, sub_category_image = ?, status = ?, category_id = ? WHERE id = ?",
        [sub_category_name, sub_category_imz, status, category_id, id],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Failed to update sub category", error: err });
        }
        res.status(200).json({ message: "sub category updated successfully" });
      }
    );
  };

  const deleteSubCategory = (req, res) => {
    const { id } = req.params;
    let query = "DELETE FROM sub_category WHERE id = ?"
    db.query(query, [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to delete sub category', error: err });
      }
      res.status(200).json({ message: 'Sub Category deleted successfully' });
    });
  };

  const getSubCategoryByCategory = (req, res) => {
    const { cat_id } = req.params;
    let query = "SELECT id,sub_category_name FROM sub_category WHERE category_id = ?;";
    db.query(query,[cat_id], (err, results) => {
      if (err) return res.status(500).send("Error fetching sub category");
      res.status(200).json(results);
    });
  };

module.exports = {
    getAllSubCategory,
    createSubCategory,
    editSubCategory,
    deleteSubCategory,
    getSubCategoryByCategory
  };
