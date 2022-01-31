import { API_MESSAGES_URL, API_ARTICLES_URL } from './config'

//                   MESSAGES

export const getMessages = async () => {
   const response = await fetch(API_MESSAGES_URL)
   const data = await response.json()
   return data
}

export const removeMessage = async (id) => {
   const response = await fetch(`${API_MESSAGES_URL}/${id}`, { method: "DELETE" })
   return await response.json()
}

export const updateMessage = async (id, data) => {
   const response = await fetch(`${API_MESSAGES_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
   })
   return await response.json()
}

//                   ARTICLES

export const addArticle = async (data) => {
   const response = await fetch(API_ARTICLES_URL, {
      headers: {
         "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data)
   })
   return await response.json()
}

export const getArticles = async () => {
   const response = await fetch(API_ARTICLES_URL)
   const data = await response.json()
   return data
}

export const updateArticle = async (id, data) => {
   const response = await fetch(`${API_ARTICLES_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
   })
   return await response.json()
}

export const removeArticle = async (id) => {
   const response = await fetch(`${API_ARTICLES_URL}/${id}`, { method: "DELETE" })
   return await response.json()
}