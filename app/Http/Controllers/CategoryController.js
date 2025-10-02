const CategoryService = require("../../Services/CategoryService");

class CategoryController {
  async create(req, res) {
    try {
      const { title, budget } = req.body;
      await CategoryService.createCategory({ title, budget: parseInt(budget) || 0 });
      res.redirect("/admin/categories");
    } catch (err) {
      res.status(500).send("Erreur lors de la création de la catégorie");
    }
  }

  async delete(req, res) {
    try {
      const categoryId = req.params.id;
      await CategoryService.deleteCategory(categoryId);
      res.redirect("/admin/categories");
    } catch (err) {
      res.status(500).send("Erreur lors de la suppression de la catégorie");
    }
  }
}

module.exports = new CategoryController();