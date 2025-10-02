const CategoryRequestRepository = require("../Repositories/CategoryRequestRepository");
const CategoryService = require("./CategoryService");

class CategoryRequestService {

  async listPendingRequests() {
    return await CategoryRequestRepository.findAllPending();
  }
  
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
  
  async approveRequest(requestId) {
    const request = await CategoryRequestRepository.findById(requestId);
    if (!request) throw new Error("Demande de catégorie non trouvée");

    await CategoryService.createCategory({ title: request.title, budget: 0 });
    return await CategoryRequestRepository.update(requestId, { status: 'approved' });
  }

  async rejectRequest(requestId) {
    return await CategoryRequestRepository.update(requestId, { status: 'rejected' });
  }
  
  async deleteRequest(id) {
    return await CategoryRequestRepository.delete(id);
  }
}

module.exports = new CategoryRequestService();
