import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, asyncLoad } from "../features/todos/todosSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

function EditTodo() {
  const todos = useSelector((state) => state.todos.list);
  const loading = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (params.id) {
      const todo = todos.find((item) => item.id === params.id);
      if (todo) {
        setName(todo.name);
        setSelected(todo.finished);
      }
    }
  }, [todos, params]);

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

  const submitInput = () => {
    let ids = params.id;
    if (name === "") {
      alert("Please enter a name");
    } else {
      if (ids) {
        dispatch(editTodo({ id: ids, name: name, finished: selected }));
      } else {
        const todo = {
          id: Date.now().toString(),
          name: name,
          finished: selected,
        };
        dispatch(addTodo(todo));
      }
      toasting("/");
    }
  };

  return (
    <div>
      <ToastContainer theme="colored" />
      <button
        onClick={() => toasting("/")}
        disabled={loading}
        className="btn btn-secondary floatLeft"
      >
        Back
      </button>
      <div>
        <h6 className="nameLeft">Name</h6>
        <input
          type="text"
          placeholder="Name Here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <h6 className="finLeft">Finished</h6>
        {[
          { id: "1", value: "yes" },
          { id: "2", value: "no" },
        ].map((item) => (
          <span key={item.id}>
            <input
              type="radio"
              id={item.id}
              name="choose"
              value={item.value}
              onChange={(e) => setSelected(e.target.value === "yes")}
              className="form-check-name"
              checked={(selected ? "yes" : "no") === item.value}
              disabled={loading}
            />
            <label htmlFor={item.id} className="label">
              {item.value === "yes" ? "Yes" : "No"}
            </label>
          </span>
        ))}
      </div>
      <div>
        <ToastContainer theme="colored" />
        <button
          onClick={submitInput}
          disabled={loading}
          className="btn btn-outline-primary"
        >
          {params.id ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
