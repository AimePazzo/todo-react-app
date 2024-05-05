import { toast } from "react-toastify";
import taskService from "./taskService";
import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk('todo/get-todo',async(thunkAPI)=>{
    try {
        return await taskService.getTasks()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const addTask = createAsyncThunk('todo/add-task',async(task,thunkAPI)=>{
    try {
        return await taskService.addTask(task)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateTask = createAsyncThunk('todo/update-task',async(task,thunkAPI)=>{
    try {
        return await taskService.updateTask(task)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteTask = createAsyncThunk('todo/delete-task',async(task,thunkAPI)=>{
    try {
        return await taskService.removeTask(task)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction('Reset_all');

const initialState ={
    tasks:[],
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

export const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getTasks.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getTasks.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.tasks = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(getTasks.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.response
        })
        .addCase(updateTask.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.updatedTask = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(updateTask.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(addTask.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(addTask.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.newTask = action.payload;
            state.isSuccess = true;
            state.isError = false;
        })
        .addCase(addTask.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(deleteTask.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.deleteTask = action.payload
            state.isError = false;
           
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState,()=> initialState)
    }
});

export default taskSlice.reducer;