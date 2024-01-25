import cn from "classnames";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { EditModal } from "./editModal/edit-modal";
import { Task } from "./task";
import "./to-do-list.css";

export function ToDoList() {
  const [task, setTask] = useState("");
  const [taskArr, setTaskArr] = useState([
    { id: uuidv4(), name: "wypić mleko", completed: false },
    { id: uuidv4(), name: "wypić sok", completed: true },
  ]);
  const [error, setError] = useState("");

  const [isEditVisible, setIsEditVisible] = useState(false);
  const [currentEditId, setCurrentEditId] = useState("");

  const onEditClick = (id) => {
    setIsEditVisible(true);
    setCurrentEditId(id);
  };

  const handleEdit = (editedName) => {
    setTaskArr(
      taskArr.map((element) =>
        element.id === currentEditId
          ? {
              id: element.id,
              name: editedName,
              completed: element.completed,
            }
          : element
      )
    );
    setIsEditVisible(false);
  };

  const handleTick = (id) => {
    setTaskArr(
      taskArr.map((element) =>
        element.id === id
          ? {
              id: element.id,
              name: element.name,
              completed: !element.completed,
            }
          : element
      )
    );
  };

  const handleDelete = (id) => {
    setTaskArr(taskArr.filter((everyTaskArr) => everyTaskArr.id !== id));
  };

  const handleAdd = () => {
    if (task.length === 0) return setError("pole nie moze być puste");

    setTaskArr([...taskArr, { id: uuidv4(), name: task }]);
    setError("");
    setTask("");
  };

  return (
    <div className="container">
      <div className="controlBox">
        <h3>TO DO LIST</h3>
        <form
          className="controlsForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="controls">
            <input
              className={cn("input", { outline: Boolean(error) })}
              placeholder="Wpisz tekst"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></input>
            <button className="button" onClick={handleAdd}>
              ADD
            </button>
          </div>
          <div className="error">{error}</div>
        </form>
      </div>
      <div className="taskBox">
        <div>
          <h4>LISTA ZADAŃ</h4>

          {taskArr.length == 0 ? <p>Brak zadań na liście</p> : null}
        </div>
        <ul className="taskList">
          {taskArr.map((item, index) => {
            return (
              <Task
                taskFromArr={item}
                key={index}
                onEditClick={onEditClick}
                handleDelete={handleDelete}
                handleTick={handleTick}
              />
            );
          })}
        </ul>
      </div>
      {isEditVisible ? (
        <EditModal
          onEditClose={() => setIsEditVisible(false)}
          onHandleEdit={handleEdit}
        />
      ) : null}
      ;
    </div>
  );
}
