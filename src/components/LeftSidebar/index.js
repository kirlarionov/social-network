import React, { useState, useEffect, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import {
   Box, Drawer, Typography, Avatar, Badge, List,
   Divider, ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material'
import { Inbox, Mail, AccountCircleOutlined } from '@mui/icons-material'
import AccountMenu from './AccountMenu'
import Notifications from './Notifications'
import logo from '../../assets/image/logo.svg'
import profile from '../../assets/image/profile.jpg'



const drawerWidth = 280

const SideBarAvatar = styled(Box)`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 15px;
   background-color: #dce7ff
`

const LeftSidebar = ({ open, DrawerHeader }) => {

   const [anchorAccountMenu, setAnchorAccountMenu] = useState(null)
   const [profileStatus, setProfileStatus] = useState(localStorage.getItem('status') || 'Online')
   const [profileStatusColor, setProfileStatusColor] = useState()
   const openAccountMenu = Boolean(anchorAccountMenu)

   const handleClick = event => setAnchorAccountMenu(event.currentTarget)
   const handleCloseAccountMenu = useCallback(() => setAnchorAccountMenu(null), [])

   const getProfileStatus = (status) => {
      setProfileStatus(status)
      localStorage.setItem('status', status)
   }

   useEffect(() => {
      switch (profileStatus) {
         case 'Online':
            setProfileStatusColor('success')
            break
         case 'Away':
            setProfileStatusColor('warning')
            break
         case 'Busy':
            setProfileStatusColor('error')
            break
         case 'Invisible':
            setProfileStatusColor('info')
            break
         default:
            setProfileStatusColor('info')
            break
      }
   }, [profileStatus, handleCloseAccountMenu])


   return (
      <Drawer
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box'
            }
         }}
         variant="persistent"
         anchor="left"
         open={open}>
         <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#dce7ff' }}>
            <Box component='img' src={logo} alt="Logo" pl={2} />
            <Box>
               <Notifications />
               <IconButton
                  id="fade-button"
                  aria-controls={openAccountMenu ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? 'true' : undefined}
                  onClick={handleClick}>
                  <Badge color={profileStatusColor} variant="dot" overlap="circular" badgeContent=" "
                     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                     <AccountCircleOutlined />
                  </Badge>
               </IconButton>
               <AccountMenu
                  handleCloseAccountMenu={handleCloseAccountMenu}
                  anchorAccountMenu={anchorAccountMenu}
                  openAccountMenu={openAccountMenu}
                  getProfileStatus={getProfileStatus}
               />

            </Box>
         </DrawerHeader>
         <Divider />

         <SideBarAvatar>
            <Avatar alt="Some profile" src={profile} sx={{ width: 100, height: 100 }} />
         </SideBarAvatar>
         <Typography component="h6" variant='h6' color="inherit" textAlign='center' sx={{ backgroundColor: '#dce7ff' }} >
            Some Name
         </Typography>
         <Typography variant='body2' color="inherit" textAlign='center' sx={{ backgroundColor: '#dce7ff' }} >
            hughes.brian@company.com
         </Typography>

         <List sx={{ backgroundColor: '#dce7ff' }}>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
               <ListItem button key={text}>
                  <ListItemIcon>
                     {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
               </ListItem>
            ))}
         </List>
         <Divider />

         <List sx={{ backgroundColor: '#dce7ff', height: '100%' }}>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
               <ListItem button key={text}>
                  <ListItemIcon>
                     {index % 2 === 0 ? <Inbox /> : <Mail />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
               </ListItem>
            ))}
         </List>
      </Drawer>
   )
}

export default LeftSidebar
