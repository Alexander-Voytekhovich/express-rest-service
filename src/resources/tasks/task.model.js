const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'USER',
    order = 'user',
    description = 'P@55w0rd',
    userId = 'P@55w0rd',
    boardId = 'P@55w0rd',
    columnId = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(user) {
    const { id, title, order, description, userId, boardId, columnId } = user;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
