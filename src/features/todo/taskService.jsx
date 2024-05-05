import axiosInstance from '../../utils/axiosConfig';
import { baseUrl } from "../../utils/baseUrl";

export const getTasks = async () => {
    const response = await axiosInstance.get(`${baseUrl}/todo/get-todo`);
    return response.data;
}

export const addTask = async (task) => {
    const response = await axiosInstance.post(`${baseUrl}/todo/create-todo`, task);
    return response.data;
}

export const removeTask = async (task) => {
    const response = await axiosInstance.delete(`${baseUrl}/todo/delete-todo/${task}`);
    return response.data;
};

export const updateTask = async (task) => {
    const response = await axiosInstance.put(`${baseUrl}/todo/update-todo/${task.id}`,{
        title: task.title.updateTask,
    });
    return response.data;
};

const taskService = {
    getTasks,
    addTask,
    removeTask,
    updateTask,
}

export default taskService;