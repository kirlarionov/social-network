import React, { useState, useEffect } from 'react'
import { getArticles } from './services'


export const Context = React.createContext()

export const ArticleProvider = ({ children }) => {
   const [articles, setArticles] = useState({})

   useEffect(() => {
      getArticles()
         .then(data => setArticles(data.reduce((acc, currentArticle) => ({
            ...acc,
            [currentArticle.id]: currentArticle
         }), {})))
   }, [])


   return (
      <Context.Provider value={{ articles, setArticles }}>
         {children}
      </Context.Provider>
   )
}