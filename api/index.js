import axios from 'axios';
import store from '@/store';
import router from '@/router';

const url = ""


export const registerUser = async (form) => {
    return axios.post(url + "/register", form)

}

export const login = async (form) => {
    return axios.post(url + "/login", form)
}

export const addTodo = async (item) => {
    return axios.post(url + "/todos", item)
}

export const getTodo = async (user) => {
    return axios.get(url + "/todos/" + user)
}