import React from 'react'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { Settings, Notifications } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import AddArticles from './AddArticles'
import profile from '../../assets/image/profile.jpg'


const MyButton = styled(Button)`
   font-family: "Roboto","Helvetica","Arial",sans-serif;
   letter-spacing: 0.02857em;
   text-transform: uppercase;
   border-radius: 20px;
   background-color: #4f46e5;
   margin-right: 16px;
`

function MainContentHeader() {

   return (
      <Box pt={3} pb={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
         <Box sx={{ display: 'flex' }} >
            <Avatar alt="Some profile" src={profile} sx={{ width: 70, height: 70 }} />
            <Box ml={1}>
               <Typography variant="h4">Welcome back, Kirill!</Typography>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ color: 'gray' }} />
                  <Typography ml={1} variant="body2" color='textSecondary'>You have 2 new messages and 15 new tasks</Typography>
               </Box>
            </Box>
         </Box >

         <Box sx={{ display: 'flex' }}>

            <AddArticles MyButton={MyButton} />

            <Box>
               <MyButton variant="contained" sx={{ backgroundColor: '#334155' }}>
                  <Settings sx={{ width: '18px', height: '18px', mr: 1 }} />
                  <Typography variant='text'>Settings</Typography>
               </MyButton>
            </Box>


         </Box>

      </Box>
   )
}

export default MainContentHeader
