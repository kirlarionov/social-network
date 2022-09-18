import React, { useState, useEffect } from 'react'
import { getArticles } from './services'

export const Context = React.createContext()

export const ArticleProvider = ({ children }) => {
   const [articles, setArticles] = useState([])

   useEffect(() => {
      getArticles()
         .then(data => setArticles(data))
         .catch(err => {
            alert(`Error attempting to get "Articles": ${err.message} (${err.name})`)
         })
   }, [])

   return (
      <Context.Provider value={{ articles, setArticles }}>
         {children}
      </Context.Provider>
   )
}
