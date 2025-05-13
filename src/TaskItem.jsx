import { useState } from "react";

function TaskItem({ task, onRemove, onEdit, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  function handleSave() {
    onEdit(task.id, editedContent);
    setIsEditing(false);
  }

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <input
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="user-input"
          />
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`task-content ${task.completed ? "completed" : ""}`}
            onClick={() => onToggle(task.id)}
          >
            {task.content}
          </span>
          <div className="task-actions">
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button onClick={() => onRemove(task.id)} className="remove-button">
              x
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
