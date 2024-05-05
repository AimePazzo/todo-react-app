/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useSelector,useDispatch } from 'react-redux';
import { updateTask } from '../features/todo/taskSlice';

const updateSchema = yup.object().shape({
  updateTask: yup.string()
})

const editModel = ({ togglePopup,taskId,taskTitle }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      updateTask: taskTitle || ''
    },
    validationSchema: updateSchema,
    onSubmit: (values) => {
      togglePopup();
      const data = {id:taskId, title:values}
      dispatch(updateTask(data))
    }
  })
  return (
    <div id="editModal" className="modal" onClick={togglePopup}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={togglePopup}>
          &times;
        </span>
        <input type="text" id="edit-todo-input" name='updateTask' value={formik.values.updateTask} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        <button type='button' id="update" className="button-todo" onClick={formik.handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default editModel;
