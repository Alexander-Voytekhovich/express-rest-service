const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'USER', order = 'user' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = Column;
