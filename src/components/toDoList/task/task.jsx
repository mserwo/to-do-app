import "./task.css";
import cn from "classnames";

export function Task({ taskFromArr, onEditClick, handleDelete, handleTick }) {
  return (
    <div className="task">
      <div className={cn("taskText", { taskDone: taskFromArr.completed })}>
        {taskFromArr.name}
      </div>

      <div className="icons">
        <img
          className="imgTick"
          src="images/tick.png"
          onClick={() => handleTick(taskFromArr.id)}
        />
        <button
          className="btn-edit"
          onClick={() => onEditClick(taskFromArr.id)}
        >
          <b>EDIT</b>
        </button>
        <img
          className="imgCross"
          src="images/cross.png"
          onClick={() => handleDelete(taskFromArr.id)}
        />
      </div>
    </div>
  );
}
