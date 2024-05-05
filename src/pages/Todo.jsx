import React, { useEffect, useState } from "react";
import AddTask from "../components/addTask";
import EditModel from "../components/editModel"; // Import the EditModel component
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getTasks,deleteTask } from "../features/todo/taskSlice";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
});
export const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const togglePopup = (id, title) => {
    setIsOpen(!isOpen);
    setTaskId(id);
    setTaskTitle(title);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addTask(values));
      formik.resetForm();
    },
  });
  const taskState = useSelector((state) => state.tasks.tasks?.data);
  const updatedTaskState = useSelector(
    (state) => state.tasks.updatedTask?.data
  );
  const newTask = useSelector((state) => state.tasks.newTask?.data);
  const deleteTaskState = useSelector((state) => state.tasks.deleteTask?.message);
  const dispatch = useDispatch();
  const deleteModal = (id) => {
    dispatch(deleteTask(id));
    toast.warning(deleteTaskState)
    const updatedTaskState = taskState.filter((task) => task._id !== id);
    dispatch(getTasks(updatedTaskState));
  };

  const logout = () => {
    localStorage.clear("token");
    window.location.href = "/";
  };

  useEffect(() => {
      dispatch(getTasks());
  }, [newTask, dispatch]);

  return (
    <div className="container-todo">
      <h1>Todo Task</h1>
      <form id="todo-form" onSubmit={formik.handleSubmit}>
          <div className="form-div">
          <div>
          <input
            type="text"
            name="title"
            placeholder="Enter your task..."
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
          </div>
          <div>
          <button className="button-todo" type="submit">
            Add Todo
          </button>
        </div>
          </div>
        <MdLogout className="logout-btn" onClick={()=>{logout()}}/>
      </form>
      <div id="todo-list">
        <div className="table">
          <p>Tasks</p>
          <p>Action</p>
        </div>
        {taskState &&
          taskState.map((task, index) => (
            <React.Fragment key={index}>
              {updatedTaskState && updatedTaskState._id === task._id ? (
                <AddTask
                  togglePopup={togglePopup}
                  key={index}
                  data={updatedTaskState}
                  deleteModal={deleteModal}
                />
              ) : (
                <AddTask togglePopup={togglePopup} key={index} data={task} deleteModal={deleteModal} />
              )}
            </React.Fragment>
          ))}
        {isOpen && (
          <EditModel
            togglePopup={togglePopup}
            taskId={taskId}
            taskTitle={taskTitle}
          />
        )}
      </div>
    </div>
  );
};
