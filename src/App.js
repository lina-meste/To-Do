import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffc0cb;
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  border: none;
  background-color: #ff69b4;
  color: white;
  padding: 8px;
  border-radius: 2px;
  cursor: pointer;
`;

const Tasks = styled.div`
  margin-top: 20px;
  width: 300px;
`;

const ListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditableText = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
`;

const App = () => {
  const [input, setInput] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleClick = () => {
    setTodoList((prev) => [
      ...prev,
      { id: prev.length + 1, task: input, complete: false },
    ]);
    setInput("");
  };

  const handleComplete = (id) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, complete: !task.complete } : task
      )
    );
    setCompletedTaskCount((prev) =>
      todoList.find((task) => task.id === id && !task.complete)
        ? prev + 1
        : prev - 1
    );
  };

  const handleEditStart = (id) => setEditingTaskId(id);

  const handleEditFinish = (id, newTask) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, task: newTask } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
    setCompletedTaskCount((prev) =>
      todoList.find((task) => task.id === id && task.complete) ? prev - 1 : prev
    );
  };

  return (
    <Container>
      <h2>To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task!"
      />
      <Button onClick={handleClick}>Add</Button>
      <Tasks>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            {editingTaskId === todo.id ? (
              <EditableText
                value={todo.task}
                onBlur={() => handleEditFinish(todo.id, todo.task)}
                onChange={(e) =>
                  setTodoList((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, task: e.target.value } : t
                    )
                  )
                }
              />
            ) : (
              <>
                <div
                  style={{
                    textDecoration: todo.complete && "line-through",
                    color: todo.complete ? "#808080" : "inherit",
                  }}
                  onClick={() => handleComplete(todo.id)}
                >
                  {todo.task}
                </div>
                <Button onClick={() => handleEditStart(todo.id)}>Edit</Button>
                <DeleteButton onClick={() => handleDelete(todo.id)}>
                  X
                </DeleteButton>
              </>
            )}
          </ListItem>
        ))}
      </Tasks>
      <div>
        <span>
          <b>Pending Tasks:</b> {todoList.length - completedTaskCount}
        </span>
        <span>
          <b> | Completed Tasks:</b> {completedTaskCount}
        </span>
      </div>
    </Container>
  );
};

export default App;
