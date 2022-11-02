class TodoData {
  private db: TodoItemType[];

  constructor() {
    this.db = [];
  }

  private async downloadData() {
    this.db = [];
    const list = await fetch('http://localhost:3004/todoList').then((res) =>
      res.json()
    );
    list.forEach((item: TodoItemType) => {
      this.db.push(item);
    });
  }

  async getData() {
    await this.downloadData();
    return this.db;
  }

  async addData(data: TodoItemType) {
    await fetch('http://localhost:3004/todoList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Credentials: 'include',
      },
      body: JSON.stringify(data),
    }).then(() => {
      this.db.push(data);
    }).then(() => {
      return this.db;
    })
  }

  async changeData(data: TodoItemType) {
    await fetch(`http://localhost:3004/todoList/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Credential: 'include',
      },
      body: JSON.stringify(data),
    }).then(() => {
      const newDb = this.db.filter((item) => {
        return item.id === data.id ? data : item;
      });
      this.db = newDb;
      return this.db;
    })
  }

  async clearDataItem(id: TodoItemType['id']) {
    console.log(4);
    await fetch(`http://localhost:3004/todoList/${id}`, {
      method: 'DELETE',
    });
  }

  async deleteData(ids: TodoItemType['id'][]) {
    console.log(3)
    await Promise.all(ids.map(id => this.clearDataItem(id)));
    const newDb = this.db.filter((item) => {
      return ids.indexOf(item.id) == -1;
    });
    this.db = newDb;
    return this.db;
  }
}

export { TodoData };