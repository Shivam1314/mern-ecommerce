const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cat) => {
    if (err) {
      return res.status(400).json({ error: "Category not found in db" });
    }
    req.category = cat;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "Not able to create category in db" });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, cats) => {
    if (err) {
      return res.status(400).json({ error: "No Categories found" });
    }
    res.json(cats);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ error: "Failed to update category" });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, cat) => {
    if (err) {
      return res.status(400).json({ error: "Failed to delete category" });
    }
    res.json({
      message: `Successfully deleted ${cat.name} category`
    });
  });
};
