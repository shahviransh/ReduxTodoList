import { React } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, asyncLoad } from "../features/todos/todosSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function Home() {
  const todos = useSelector((state) => state.todos.list);
  const loading = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toasting = (dest) => {
    dispatch(asyncLoad(true));
    toast.info("Loading...", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    setTimeout(() => {
      dispatch(asyncLoad(false));
      navigate(dest);
    }, 2000);
  };

  const renderTodos = () => {
    const queryParams = new URLSearchParams(location.search);
    const finished = queryParams.get("finished");
    if (finished === "1") {
      return printTodos(todos.filter((item) => item.finished));
    } else if (finished === "0") {
      return printTodos(todos.filter((item) => !item.finished));
    }
    return printTodos(todos);
  };

  const printTodos = (editedTodos) => {
    return editedTodos.map((item) => (
      <dd key={item.id}>
        <div className="row list">
          <div className="column">{item.name}</div>
          <div className="column">{item.finished ? "Yes" : "No"}</div>
          <div className="column">
            <button
              onClick={() => dispatch(deleteTodo(item.id))}
              disabled={loading}
              className="btn btn-danger"
            >
              D
            </button>
            <button
              onClick={() => toasting(`/todo/${item.id}`)}
              disabled={loading}
              className="btn btn-primary"
            >
              E
            </button>
            <ToastContainer theme="colored" />
          </div>
        </div>
      </dd>
    ));
  };

  return (
    <div>
      <ToastContainer theme="colored" />
      <button
        onClick={() => toasting("/todo")}
        disabled={loading}
        className="btn btn-warning floatRight"
      >
        New
      </button>
      <dl>
        <div className="row">
          <div className="column">Name</div>
          <div className="column">Finished</div>
          <div className="column">Actions</div>
        </div>
        {renderTodos()}
      </dl>
    </div>
  );
}

export default Home;
