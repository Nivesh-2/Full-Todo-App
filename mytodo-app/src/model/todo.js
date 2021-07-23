const todos = [];

class Todo {
  constructor(id, description, target) {
    if(!id){
      this.id = Math.random().toString();
    }
    else{
      this.id = id;
    }
    this.description = description;
    this.target = target;
  }

  // static trail(){
  //     console.log('Found You');
  // }

  addTodo() {
    return new Promise((resolve, reject) => {
      let todo = this;
      //console.log(todo);
      if(todo.length !== 0){
        todos.push(this);
        //console.log(todos);
        resolve("Success");
      }
      else{
        reject({status: false});
      }
    });
  }

  static featchAll(){
    return todos;
  }

  static featchById(id){
    return todos.find(todo=> todo.id === id);
  }

  updateTodo(){
    let ind = todos.findIndex(todo => todo.id === this.id);
    if(ind > -1){
      todos[ind].description = this.description;
      todos[ind].target = this.target;
      return true;
    }
    return false;
  }

  static deleteById(id){
    let ind =  todos.findIndex(todo => todo.id === id);
    if(ind > -1){
      todos.splice(ind, 1);
      return true;
    }

    return false;
  }

  static classifyTodos(date){
    let dueTodos = [];
    let upcoming = [];
    let completed = [];
    todos.forEach((todo)=>{
      if(todo.target === date){
        dueTodos.push(todo);
      }
      else if(todo.target > date){
        upcoming.push(todo);
      }
      else{
        completed.push(todo);
      }
    });

    return {due: dueTodos, upcoming: upcoming, completed: completed};
  }

}


export default Todo;
