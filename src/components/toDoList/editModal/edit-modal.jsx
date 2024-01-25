import "./edit-modal.css";
import "../to-do-list.css";
import { useState } from "react";
import classNames from "classnames";

export function EditModal({ onHandleEdit, onEditClose }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleApprove = () => {
    if (value.length === 0) return setError("Musisz wpisać tekst");

    setError("");
    onHandleEdit(value);
  };

  return (
    <div className="editBox">
      <h3>Edytuj zadanie:</h3>
      <form
        className="editControls"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="editInput">
          <input
            placeholder="Wprowadź nową treść zadania"
            className={classNames("input", "editInput", {
              outline: Boolean(error),
            })}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <div className="error">{error}</div>
        </div>
        <div className="editButtons">
          <button className="button editButton" onClick={() => handleApprove()}>
            ZATWIERDŹ
          </button>
          <button className="button editButton" onClick={() => onEditClose()}>
            ANULUJ
          </button>
        </div>
      </form>
    </div>
  );
}
