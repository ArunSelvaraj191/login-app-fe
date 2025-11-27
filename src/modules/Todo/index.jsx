import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  console.log("editIndex ::", editIndex);
  console.log("tasks ::", tasks);
  const handleChange = (event) => {
    const value = event.target.value;
    console.log("value ::", value);
    setTask(value);
  };
  const addTask = () => {
    setTasks([...tasks, task]);
    setTask("");
  };
  const deleteTask = (indexToDelete) => {
    console.log("indexToDelete ::", indexToDelete);
    const filteredTask = tasks.filter((t, index) => index !== indexToDelete);
    console.log("filteredTask :::", filteredTask);
    setTasks(filteredTask);
  };
  const handleUpdateTask = (indexToUpdate) => {
    setEditIndex(indexToUpdate);
    console.log("indexToUpdate ::", indexToUpdate, tasks[indexToUpdate]);
    setTask(tasks[indexToUpdate]);
  };
  const updateTask = () => {
    const updated = [...tasks];
    updated[editIndex] = task;
    setTasks(updated);
    setEditIndex(null);
    setTask("");
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">MUI Todo List</Typography>
        <TextField
          fullWidth
          label="Enter a Task"
          value={task}
          onChange={handleChange}
        />
        {editIndex == null ? (
          <Button variant="contained" sx={{ mt: 2 }} onClick={addTask}>
            Add Task
          </Button>
        ) : (
          <Button variant="contained" sx={{ mt: 2 }} onClick={updateTask}>
            Edit Task
          </Button>
        )}
        {tasks?.length > 0 && (
          <Box>
            <Typography variant="h5">Task Lists</Typography>
            {tasks.map((t, index) => {
              return (
                <Card key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2">{t}</Typography>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateTask(index)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTask(index)}
                  >
                    <Delete />
                  </IconButton>
                </Card>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Todo;
