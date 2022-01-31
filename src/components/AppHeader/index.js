import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton } from '@mui/material'
import { Menu, OpenInFull, BookmarkBorder } from '@mui/icons-material'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import SearchInput from './SearchInput'
import MessagesWindow from './MessagesWindow'
import usaFlag from '../../assets/image/usa24.png'
import ukraineFlag from '../../assets/image/ukraine.png'


const drawerWidth = 280

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}))

const MyToolbar = styled(Toolbar)`
   position: realative;
   display: flex;
   justify-content: space-between;
   background-color: #73e7bf8a;
`


const AppHeader = ({ open, handleDrawerOpen }) => {

   const [langFlag, setLangFlag] = useState(localStorage.getItem('lang') || 'USA')

   const handleLangFlag = () => {
      if (langFlag === 'USA') {
         localStorage.setItem('lang', 'UA')
         setLangFlag('UA')
      } else {
         localStorage.setItem('lang', 'USA')
         setLangFlag('USA')
      }
   }


   return (
      <AppBar position="fixed" open={open}>
         <MyToolbar>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2 }}
               >
                  <Menu />
               </IconButton>
               <Typography variant="h6" noWrap component="div">
                  Social App
               </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <IconButton size="large" aria-label="language" color="inherit" onClick={handleLangFlag}>
                  <Box component='img' alt='Flag'
                     src={langFlag === 'USA' ? usaFlag : ukraineFlag} />
               </IconButton>

               <IconButton size="large" aria-label="fullscreen" color="inherit">
                  <OpenInFull />
               </IconButton>

               <SearchInput />

               <IconButton size="large" aria-label="bookmark " color="inherit">
                  <BookmarkBorder />
               </IconButton>

               <MessagesWindow />

            </Box>
         </MyToolbar>
      </AppBar>
   )
}

export default AppHeader
