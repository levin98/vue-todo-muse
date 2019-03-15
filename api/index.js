import axios from 'axios';

const url = "http://f383efb4.ngrok.io/api"


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

export const updateTodo = async (id, payload) => {
    return axios.put(url + "/todos/" + id, payload)
}

export const removeTodo = async (id, payload) => {
    return axios.delete(url + "/todos/" + id, { data: payload })
}