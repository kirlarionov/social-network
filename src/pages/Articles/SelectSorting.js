import React, { useState, useContext, useEffect } from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { Context } from '../../context-articles'

const SelectSorting = () => {
   const { setArticles } = useContext(Context)
   const [sort, setSort] = useState('')

   const handleChange = (event) => {
      setSort(event.target.value)
   }

   useEffect(() => {
      switch (sort) {
         case 'old':
            setArticles(prevState => [...prevState].sort((a, b) => new Date(b.createdAt) < new Date(a.createdAt) ? 1 : -1))
            break;
         case 'new':
            setArticles(prevState => [...prevState].sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1))
            break
         case 'important':
            setArticles(prevState => [...prevState].sort(a => a.important ? -1 : 1))
            break
         case 'unimportant':
            setArticles(prevState => [...prevState].sort(a => !a.important ? -1 : 1))
            break
         default:
            setArticles(prevState => [...prevState].sort((a, b) => new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1))
            break
      }
   }, [sort, setArticles])


   return (
      <FormControl sx={{ marginBottom: '15px', minWidth: 132 }}>
         <InputLabel id="demo-simple-select-autowidth-label">SHOW FIRST...</InputLabel>
         <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={sort}
            onChange={handleChange}
            autoWidth
            label="SHOW FIRST.."
         >
            <MenuItem value='new'>New</MenuItem>
            <MenuItem value='old'>Old</MenuItem>
            <MenuItem value='important'>Important</MenuItem>
            <MenuItem value='unimportant'>Unimportant</MenuItem>
         </Select>
      </FormControl>
   )
}

export default SelectSorting