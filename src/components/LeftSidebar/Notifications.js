import React, { useState, forwardRef } from 'react'
import { IconButton, Snackbar, Badge } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { NotificationsNone } from '@mui/icons-material'


const Alert = forwardRef(function Alert(props, ref) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Notifications = () => {
   const [open, setOpen] = useState(false)

   const handleClick = () => setOpen(true)

   const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
         return
      }
      setOpen(false)
   }


   return (
      <>
         <IconButton onClick={handleClick}>
            <Badge badgeContent={3} color="secondary" >
               <NotificationsNone color="action" />
            </Badge>
         </IconButton>

         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
               This is a example message! [ NOTIFICATIONS ]
            </Alert>
         </Snackbar>
      </>
   )
}

export default Notifications

