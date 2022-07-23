import { React } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, asyncLoad } from "./todosSlice";
import "../App.css";

function Home() {
  const todos = useSelector((state) => state.todos.list);
  //const loading = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
              className="btn btn-danger"
            >
              D
            </button>
            <button
              onClick={() =>
                dispatch(
                  asyncLoad({ nav: navigate, destination: `/todo/${item.id}` })
                )
              }
              className="btn btn-primary"
            >
              E
            </button>
          </div>
        </div>
      </dd>
    ));
  };

  return (
    <div>
      <button
        onClick={() =>
          dispatch(
            asyncLoad({ nav: navigate, destination: "/todo" })
          )
        }
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
