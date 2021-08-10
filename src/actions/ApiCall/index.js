
import axios from 'axios'
import { API_ROOT } from 'utilities/constants'
/**
 *Get data board
 */
export const fetchBoardDetails = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
    return request.data.result
}
/**
 *API create new column
 */
export const createNewColumn = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/columns`, data)
    return request.data.result
}
/**
 *API update ỏ remive column
 */
export const updateColumn = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data)
    return request.data.result
}
/**
 *API create new Card
 */
export const createNewCard = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/cards`, data)
    return request.data.result
}