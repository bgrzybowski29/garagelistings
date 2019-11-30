import axios from 'axios';

const baseUrl = 'http://localhost:3000'

const api = axios.create({
  baseURL: baseUrl
})
const baseUrl2 = 'https://www.fueleconomy.gov/ws/rest/vehicle/menu/'

const api2 = axios.create({
  baseURL: baseUrl2
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}
export const getMyItems = async (user) => {
  const resp = await api.get(`/users/${user}/items`);
  return resp.data
}
export const getSavedItems = async (user) => {
  const resp = await api.get(`/users/${user}/savedItems`);
  return resp.data
}
export const getAllItems = async () => {
  const resp = await api.get(`/items`);
  return resp.data
}

// https://www.fueleconomy.gov/ws/rest/vehicle/menu/year
// https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=2012
// https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=2012&make=Honda
// https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=2012&make=Honda&model=Fit

export const getAutoYears = async () => {
  const resp = await api2.get(`year`)
  return addEmptyElement(resp.data.menuItem);
}
export const getAutoMakes = async (year) => {
  const resp = await api2.get(`make?year=${year}`)
  return addEmptyElement(resp.data.menuItem);
}

export const getAutoModels = async (year, make) => {
  const resp = await api2.get(`model?year=${year}&make=${make}`)
  return addEmptyElement(resp.data.menuItem);
}
export const getAutoModelOptions = async (year, make, model) => {
  const resp = await api2.get(`options?year=${year}&make=${make}&model=${model}`)
  return addEmptyElement(resp.data.menuItem);
}
const addEmptyElement = (arr) => {
  let retArr = arr;
  if (!Array.isArray(arr)) {
    let newArr = [retArr];
    retArr = newArr;
  }
  retArr.unshift({ text: '', value: '' });
  return retArr;
}

export const updateComment = async (id, data) => {
  const resp = await api.put(`/comments/${id}`, { comment: data })
  return resp.data
}

export const destroyComment = async (id) => {
  const resp = await api.delete(`/comments/${id}`)
  return resp.data
}
