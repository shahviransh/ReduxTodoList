import "./logo.svg";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import EditTodo from "./pages/EditTodo";
import Home from "./pages/Home";
import Loading from "./pages/Loading";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="loading" element={<Loading/>} />
          <Route path="todo" element={<EditTodo />} />
          <Route path="todo/:id" element={<EditTodo />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
