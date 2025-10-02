const CategoryService = require("../../Services/CategoryService");

class CategoryController {
  
  async index(req, res) {
    const categories = await CategoryService.listCategories();
    res.render("categories/index", { categories, title: "Catégories" });
  }

  async create(req, res) {
    try {
      const { title, budget } = req.body;
      await CategoryService.createCategory({ title, budget: parseInt(budget) });
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Erreur lors de la création de la catégorie");
    }
  }

  async edit(req, res) {
    const category = await CategoryService.findById(req.params.id);
    res.render("categories/edit", { category, title: "Modifier catégorie" });
  }

  async update(req, res) {
    try {
      const { title, budget } = req.body;
      await CategoryService.updateCategory(req.params.id, { title, budget: parseInt(budget) });
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour");
    }
  }

  async delete(req, res) {
    try {
      await CategoryService.deleteCategory(req.params.id);
      res.redirect("/categories");
    } catch (err) {
      res.status(500).send("Erreur lors de la suppression");
    }
  }
}

module.exports = new CategoryController();
