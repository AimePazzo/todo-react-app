import React from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


const AddTask = ({ togglePopup, data,deleteModal }) => {
  return (
    <div className='task'>
      <p>{data.title}</p>
      <div className='action'>
        <FaRegEdit className='edit' onClick={() => togglePopup(data._id, data.title)} />
        <MdDelete className='delete' onClick={() => deleteModal(data._id)} />
      </div>
    </div>
  );
};

export default AddTask;

