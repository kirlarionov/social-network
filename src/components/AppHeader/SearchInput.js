import React, { useCallback, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, Collapse, Box, Typography, MenuItem } from '@mui/material'
import { SearchRounded, Close } from '@mui/icons-material'


const SearchWrapper = styled(Collapse)`
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: white;
   z-index: 1000;
`
const SearchBox = styled(Box)`
   position: relative;  
   display: flex;
   justify-content: space-between;
   align-items: center;
   height: 64px;
   padding: 0 25px;
`
const MySearchRounded = styled(SearchRounded)`
   width: 30px;
   height: 30px;
   color: #6e7d92;
   margin-right: 15px;
`
const SearchVariantsBox = styled(Box)`
   position: absolute;
   top: 64px;
   left: -0px;
   width: 100%;
   background-color: white;
   padding-bottom: 10px;
   border-top: 1px #d2d7de solid;
   box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`
const SearchVariantWord = styled(Typography)`
   padding: 10px 0 0 20px;
   color: black;
`

const searchArray = [
   'Toyota',
   'Volkswagen',
   'Volvo',
   'Honda',
   'Ford',
   'Nissan',
   'Hyundai',
   'Tiguan',
   'Tata',
   'Transporter',
   'Toto'
]


function SearchInput() {

   const [checked, setChecked] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [searchVariants, setSearchVariants] = useState(null)

   const handleOpen = () => setChecked(true)
   const handleClose = () => {
      setChecked(false)
      setInputValue('')
   }


   useEffect(() => {
      // let filterArray = []
      // const inputWordArray = inputValue.toLowerCase()

      // if (inputWordArray.length) {

      //    for (let i = 0; i < searchArray.length; i++) {
      //       let wordVariant = searchArray[i].toLowerCase()

      //       if (inputWordArray === wordVariant.slice(0, inputWordArray.length)) {
      //          let newWord = wordVariant[0].toUpperCase() + wordVariant.slice(1)
      //          filterArray.push(newWord)
      //       }
      //    }
      // }
      // setSearchVariants(filterArray)

      setSearchVariants(searchArray.filter(item => item.toUpperCase().includes(inputValue.toUpperCase())))

   }, [inputValue, setInputValue])


   const changeInputValue = useCallback(e => setInputValue(e.currentTarget.value), [])


   return (
      <Box >
         <IconButton size="large" aria-label="search" color="inherit" onClick={handleOpen}>
            <SearchRounded />
         </IconButton>

         <SearchWrapper in={checked} mountOnEnter >
            <SearchBox>
               <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <MySearchRounded />
                  <input
                     type='text'
                     placeholder='Search for a make or model of a car      ("toyota")'
                     value={inputValue}
                     onChange={changeInputValue}
                     style={{ fontSize: '16px', width: '100%' }} />
               </Box>
               <IconButton onClick={handleClose}>
                  <Close style={{ width: '30px', height: '30px' }} />
               </IconButton>
            </SearchBox>
         </SearchWrapper>

         {checked && (
            <SearchVariantsBox sx={{ display: !inputValue.length ? 'none' : 'block' }}>

               {searchVariants.length ? searchVariants.map(word => (
                  <MenuItem key={Date.now() + word}>
                     <SearchVariantWord >{word}</SearchVariantWord>
                  </MenuItem>))
                  : <SearchVariantWord sx={{ color: 'gray' }} key={Date.now()}> Ничего не найдено...</SearchVariantWord>}

            </SearchVariantsBox>
         )}
      </Box >
   )
}

export default SearchInput
