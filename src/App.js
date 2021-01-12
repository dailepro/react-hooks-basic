import { useEffect, useState } from "react";
import queryString from "query-string";
import "./App.css";
import Pagination from "./components/Pagination";
import PostList from "./components/PostList";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { stringify } from "query-string";
import PostFiltersForm from "./components/PostFiltersForm";
import Clock from "./components/Clock";

function App() {
  const [todoList, setTodoList] = useState([
    { id: "1", title: "I love FE" },
    { id: "2", title: "I love UI" },
    { id: "3", title: "I love UX" },
  ]);

  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totolRows: 1,
  });

  const [filters, setFilter] = useState({
    _limit: 10,
    _page: 1,
    title_like: "",
  });

  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestURL = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        console.log({ responseJSON });

        const { data, pagination } = responseJSON;

        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("Failed to fetch post list:", error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex((item) => item.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleFormSubmit(formValue) {
    console.log("formValue", formValue);

    const newTodo = {
      id: todoList.length + 1,
      ...formValue,
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilter({
      ...filters,
      _page: newPage,
    });
  }

  function handleFiltersChange(newFilters) {
    console.log("formValue", newFilters);
    setFilter({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  return (
    <div className="app">
      <h1>Welcome Reactjs</h1>
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide Clock</button>
      {/* <TodoForm onSubmit={handleFormSubmit} />
      <TodoList todos={todoList} onTodoClick={handleTodoClick} /> */}
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}

export default App;
