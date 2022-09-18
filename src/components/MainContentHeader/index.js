import React, { useContext } from 'react'
import { Box, Typography, Avatar } from '@mui/material'
import { Settings, Notifications } from '@mui/icons-material'
import AddArticles from './AddArticles'
import CustomButton from '../CustomButton'
import profile from '../../assets/image/profile.jpg'
import { Context as MessagesContext } from '../../context-messages'
import { Context as ArticleContext } from '../../context-articles'

const MainContentHeader = () => {
   const { newMessages } = useContext(MessagesContext)
   const { articles } = useContext(ArticleContext)

   return (
      <Box
         pt={3}
         pb={4}
         sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
         <Box sx={{ display: 'flex' }} >
            <Avatar
               alt="Some profile"
               src={profile}
               sx={{ width: 70, height: 70 }}
            />
            <Box ml={1}>
               <Typography variant="h4">Welcome back, Kirill!</Typography>
               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Notifications sx={{ color: 'gray' }} />
                  <Typography
                     ml={1}
                     variant="body2"
                     color='textSecondary'
                  >
                     You have <b>{newMessages}</b> new messages and <b>{articles.length}</b> articles
                  </Typography>
               </Box>
            </Box>
         </Box >

         <Box sx={{ display: 'flex' }}>
            <AddArticles />
            <Box>
               <CustomButton variant="contained" sx={{ backgroundColor: '#334155' }}>
                  <Settings sx={{ width: '18px', height: '18px', mr: 1 }} />
                  <Typography variant='text'>Settings</Typography>
               </CustomButton>
            </Box>
         </Box>
      </Box>
   )
}

export default MainContentHeader
