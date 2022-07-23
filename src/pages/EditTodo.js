import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  editTodo,
  asyncLoad,
} from "./todosSlice";
import "../App.css";

function EditTodo() {
  //const loading = useSelector((state) => state.todos.loading);
  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);

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
      dispatch(asyncLoad({ nav: navigate, destination: "/" }));
    }
  };

  return (
    <div>
      <button
        onClick={() => dispatch(asyncLoad({ nav: navigate, destination: "/" }))}
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
            />
            <label htmlFor={item.id} className="label">
              {item.value === "yes" ? "Yes" : "No"}
            </label>
          </span>
        ))}
      </div>
      <div>
        <button onClick={submitInput} className="btn btn-outline-primary">
          {params.id ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default EditTodo;
