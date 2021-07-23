import axios from "axios";

const url = "http://localhost:5000/todos/";


class TodoServices {
  static getTodos(options) {
    return axios.get(url, options);
  }
  static getTodo(id, options) {
    return axios.get(url + id, options);
  }
  static deleteTodo(id, options) {
    return axios.delete(url + id, options);
  }
  static postTodo(todo, options) {
    return axios.post(url + "postTodo/", todo, options);
  }

  static updateTodo(id, todo, options) {
    return axios.put(url + "updateTodo/" + id, todo, options);
  }
}

export default TodoServices;
