const SavingGoalService = require("../../Services/SavingGoalService");
const CategoryService = require("../../Services/CategoryService");

class SavingGoalController {
  async index(req, res) {
    const savingGoals = await SavingGoalService.listUserSavingGoals(req.session.user.id);
    res.render("saving-goals/index", { 
      savingGoals, 
      title: "Objectifs d'épargne" 
    });
  }

  async create(req, res) {
    try {
      const { 
        title, 
        targetAmount, 
        deadline, 
        priority, 
        categoryId 
      } = req.body;
      
      await SavingGoalService.createSavingGoal({
        title,
        targetAmount: parseInt(targetAmount),
        currentAmount: 0,
        deadline: deadline ? new Date(deadline) : null,
        priority: priority || 'medium',
        status: 'active',
        userId: req.session.user.id,
        categoryId: parseInt(categoryId)
      });
      
      res.redirect("/saving-goals");
    } catch (err) {
      res.status(500).send("Erreur lors de la création de l'objectif d'épargne");
    }
  }

  async show(req, res) {
    const savingGoal = await SavingGoalService.getSavingGoal(req.params.id);
    if (!savingGoal) {
      return res.status(404).send("Objectif d'épargne non trouvé");
    }
    res.render("saving-goals/show", { 
      savingGoal, 
      title: "Détails de l'objectif" 
    });
  }

  async update(req, res) {
    try {
      const { title, targetAmount, deadline, priority, status } = req.body;
      
      await SavingGoalService.updateSavingGoal(req.params.id, {
        title,
        targetAmount: parseInt(targetAmount),
        deadline: deadline ? new Date(deadline) : null,
        priority,
        status
      });
      
      res.redirect("/saving-goals");
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour");
    }
  }

  async delete(req, res) {
    try {
      await SavingGoalService.deleteSavingGoal(req.params.id);
      res.redirect("/saving-goals");
    } catch (err) {
      res.status(500).send("Erreur lors de la suppression");
    }
  }

  async addProgress(req, res) {
    try {
      const { amount } = req.body;
      await SavingGoalService.updateSavingGoalProgress(req.params.id, parseInt(amount));
      res.redirect("/saving-goals");
    } catch (err) {
      res.status(500).send("Erreur lors de l'ajout du progrès");
    }
  }
}

module.exports = new SavingGoalController();
