const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'example', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    if (columns.length > 0) {
      this.columns = columns.map(column => {
        return { id: uuid(), ...column };
      });
    } else {
      this.columns = [];
    }
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
