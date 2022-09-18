import React, { useState, useEffect, createContext } from 'react'
import { getMessages } from './services'

export const Context = createContext()

export const MessagesProvider = ({ children }) => {
   const [messages, setMessages] = useState([])
   const [newMessages, setNewMessages] = useState(null)

   useEffect(() => {
      getMessages()
         .then(data => setMessages(data))
         .catch(err => {
            alert(`Error attempting to get "Messages": ${err.message} (${err.name})`)
         })
   }, [])

   return (
      <Context.Provider value={{ messages, setMessages, newMessages, setNewMessages }}>
         {children}
      </Context.Provider>
   )
}