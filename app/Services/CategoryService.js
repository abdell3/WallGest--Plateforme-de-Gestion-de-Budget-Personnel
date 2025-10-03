const CategoryRepository = require("../Repositories/CategoryRepository");

class CategoryService {
  
  async listCategories() { 
    return await CategoryRepository.findAll(); 
  }

  async findById(id) { 
    return await CategoryRepository.findById(id); 
  }

  async createCategory(data) { 
    return await CategoryRepository.create(data); 
  }

  async updateCategory(id, data) { 
    return await CategoryRepository.update(id, data); 
  }

  async deleteCategory(id) { 
    return await CategoryRepository.delete(id); 
  }

  async countCategoriesSince(date) { 
    return await CategoryRepository.countSince(date); 
  }
}

module.exports = new CategoryService();

