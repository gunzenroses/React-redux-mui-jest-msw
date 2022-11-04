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
    });
    return this.getData();
  }

  async changeData(data: TodoItemType) {
    await fetch(`http://localhost:3004/todoList/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Credential: 'include',
      },
      body: JSON.stringify(data),
    });
    return this.getData();
  }

  private async clearDataItem(id: TodoItemType['id']) {
    await fetch(`http://localhost:3004/todoList/${id}`, {
      method: 'DELETE',
    });
  }

  async deleteData(ids: TodoItemType['id'][]) {
    await Promise.all(ids.map(id => this.clearDataItem(id)));
    return this.getData();
  }
}

export { TodoData };