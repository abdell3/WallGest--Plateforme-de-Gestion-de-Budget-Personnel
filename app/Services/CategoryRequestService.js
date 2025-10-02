const CategoryRequestRepository = require("../Repositories/CategoryRequestRepository");

class CategoryRequestService {

  async listRequests() {
    return await CategoryRequestRepository.findAll();
  }
  
  async listUserRequests(userId) {
    return await CategoryRequestRepository.findByUser(userId);
  }
  
  async createRequest(data) {
    return await CategoryRequestRepository.create(data);
  }
  
  async updateRequest(id, data) {
    return await CategoryRequestRepository.update(id, data);
  }
  
  async deleteRequest(id) {
    return await CategoryRequestRepository.delete(id);
  }
}

module.exports = new CategoryRequestService();
