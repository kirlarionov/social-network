import React, { useCallback, useState } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Menu, Fade, MenuItem, Divider } from '@mui/material'
import {
   AccountCircleOutlined, Circle, SettingsOutlined, ContactlessOutlined, Logout, ArrowRight
} from '@mui/icons-material'


const MyMenuItem = styled(MenuItem)`
   padding-top: 12px;
   padding-bottom: 12px;
`
const SubMenuCircle = styled(Circle)`
   margin-right: 8px;
   width: 19px;
`


function AccountMenu({ handleCloseAccountMenu, anchorAccountMenu, openAccountMenu, getProfileStatus }) {

   const [anchorAccountMenuStatus, setnchorAccountMenuStatus] = useState(null)
   const openAccountMenuStatus = Boolean(anchorAccountMenuStatus)

   const handleMouseEnter = event => setnchorAccountMenuStatus(event.currentTarget)
   const handleCloseAccountMenuStatus = useCallback(() => setnchorAccountMenuStatus(null), [])

   const handleActiveStatus = useCallback(e => {
      const status = e.currentTarget.childNodes[1].data
      getProfileStatus(status)
      handleCloseAccountMenuStatus()
      handleCloseAccountMenu()
   }, [getProfileStatus, handleCloseAccountMenu, handleCloseAccountMenuStatus])


   return (
      <Menu
         id="fade-menu"
         MenuListProps={{ 'aria-labelledby': 'fade-button' }}
         anchorEl={anchorAccountMenu}
         open={openAccountMenu}
         onClose={handleCloseAccountMenu}
         TransitionComponent={Fade}
         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
         <MenuItem>
            <Typography variant='title1' sx={{ display: 'block' }}>Signed in as
               <Typography variant='body2' sx={{ display: 'block' }}>hughes.brian@company.com</Typography>
            </Typography>
         </MenuItem>
         <Divider />
         <MyMenuItem onClick={handleCloseAccountMenu} >
            <AccountCircleOutlined sx={{ display: 'inline-block', mr: 1 }} />Profile
         </MyMenuItem>
         <MyMenuItem onClick={handleCloseAccountMenu} >
            <SettingsOutlined sx={{ display: 'inline-block', mr: 1 }} />Setting
         </MyMenuItem>
         <MyMenuItem
            onClick={handleCloseAccountMenu}
            onMouseEnter={handleMouseEnter}
            sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <ContactlessOutlined sx={{ display: 'inline-block', mr: 1 }} />Status
            </Box>
            <ArrowRight />
         </MyMenuItem>
         <Divider />
         <MenuItem onClick={handleCloseAccountMenu}>
            <Logout sx={{ display: 'inline-block', mr: 1 }} />Sign out
         </MenuItem>

         <Menu
            id="fade-menu-status"
            MenuListProps={{ 'aria-labelledby': 'fade-button' }}
            anchorEl={anchorAccountMenuStatus}
            open={openAccountMenuStatus}
            onClose={handleCloseAccountMenuStatus}
            TransitionComponent={Fade}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
         >
            <MyMenuItem onClick={handleActiveStatus}>
               <SubMenuCircle sx={{ color: 'green' }} />Online
            </MyMenuItem>
            <MyMenuItem onClick={handleActiveStatus}>
               <SubMenuCircle sx={{ color: 'orange' }} />Away
            </MyMenuItem>
            <MyMenuItem onClick={handleActiveStatus}>
               <SubMenuCircle sx={{ color: 'red' }} />Busy
            </MyMenuItem>
            <MyMenuItem onClick={handleActiveStatus}>
               <SubMenuCircle sx={{ color: '#0287d0' }} />Invisible
            </MyMenuItem>
         </Menu>

      </Menu>
   )
}

export default AccountMenu
