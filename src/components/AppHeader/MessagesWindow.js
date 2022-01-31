import React, { useState, useEffect, useRef, useCallback } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton, Badge, Paper, Tooltip } from '@mui/material'
import { InboxOutlined, Mail, Close, Circle } from '@mui/icons-material'
import { getMessages, removeMessage as delMessage, updateMessage } from './../../services'



const MessagesBox = styled(Paper)`
   position: absolute;
   top: 40px;
   left: -320px;
   width: 360px;
   height: 552px;
   background-color: white;
   color: black;
   border-radius: 15px;
   transition: all .3s;
   overflow: hidden;
`
const TopMessagesBox = styled(Box)`
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: #4f46e5;
   color: white;
   border-radius: 15px 15px 0 0;
   padding: 20px;
`
const MessageCard = styled(Box)`
display: flex;
justify-content: space-between;
height: 115px;
padding-top: 10px;
border-bottom: 1px solid #dbdee1;
`
const WriterPhoto = styled(Box)`
   min-width: 40px;
   height: 40px;
   margin: 13px;
   border-radius: 50%
`
const MessageText = styled(Typography)`
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
   overflow: hidden;
`


function MessagesWindow() {

   const [showMessagesBox, setShowMessagesBox] = useState(false)
   const [messages, setMessages] = useState({})
   const [newMessages, setNewMessages] = useState(null)


   useEffect(() => {
      getMessages()
         .then(data => setMessages(data.reduce((acc, currentMessage) => ({
            ...acc,
            [currentMessage.id]: currentMessage
         }), {})))
   }, [setMessages])


   const removeMessage = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      const currentMessages = Object.values(messages).filter(message => message.id !== id)
      delMessage(id)
         .then(setMessages(currentMessages))
   }, [messages])


   const handleReadMessage = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      if (messages[id]) {
         updateMessage(id, { read: !messages[id].read })
            .then(updatedMessage =>
               setMessages(prevState => ({
                  ...prevState,
                  [id]: updatedMessage
               })))
      }
   }, [messages])


   const markAllAsRead = useCallback(e => {
      e.stopPropagation()
      Object.values(messages)
         .filter(message => message.read === false)
         .forEach(async (message) => {
            updateMessage(message.id, { read: true })
               .then(updatedMessage => setMessages(prevState => ({
                  ...prevState,
                  [message.id]: updatedMessage
               })))
         })
   }, [messages])


   useEffect(() => {
      const unReadMessages = Object.values(messages).filter(message => message.read === false)
      setNewMessages(unReadMessages.length)
   }, [messages])


   const openMessagesWindow = useCallback(() => setShowMessagesBox(!showMessagesBox), [showMessagesBox])


   const rootEl = useRef(null)
   useEffect(() => {
      const onClick = e => rootEl.current.contains(e.target) || setShowMessagesBox(false)
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
   }, [])


   return (
      <Box sx={{ position: 'relative' }} ref={rootEl}>
         <IconButton size="large" aria-label="search" color="inherit"
            onClick={openMessagesWindow}>
            <Badge badgeContent={newMessages} color="secondary">
               <InboxOutlined />
            </Badge>
         </IconButton>

         {showMessagesBox && (
            <MessagesBox elevation={4}>
               <TopMessagesBox>
                  <Typography fontSize={17}>Messages</Typography>
                  <Tooltip title={newMessages ? 'Mark all as read' : ''} >
                     <span>
                        <IconButton onClick={markAllAsRead} disabled={!newMessages}>
                           <Mail sx={newMessages ? { color: 'white' } : { color: 'gray' }} />
                        </IconButton>
                     </span>
                  </Tooltip>
               </TopMessagesBox>

               <Box sx={{ overflow: 'auto', height: '475px' }}>
                  {messages && Object.values(messages).map((message) => {
                     return (
                        <MessageCard MessageCard key={message.id} >
                           <WriterPhoto
                              component="img"
                              alt="Message Writer Photo"
                              src={message.avatar}
                           />
                           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
                              <Typography sx={{ fontWeight: '500' }}>{message.name}</Typography>
                              <MessageText>{message.text}</MessageText>
                              <Typography variant='body2' sx={{ color: 'gray' }}>
                                 {new Date(message.createdAt).toLocaleString()}
                              </Typography>
                           </Box>

                           <Box>
                              <Tooltip title={message.read ? 'Mark as unread' : 'Mark as read'} placement="left-end">
                                 <IconButton data-id={message.id} onClick={handleReadMessage}>
                                    <Circle color={message.read ? 'disabled' : 'primary'} sx={{ padding: '2px' }} />
                                 </IconButton>
                              </Tooltip>

                              <Tooltip title='Remove' placement="left-end">
                                 <IconButton data-id={message.id} onClick={removeMessage} >
                                    <Close />
                                 </IconButton>
                              </Tooltip>
                           </Box>
                        </MessageCard>
                     )
                  })}

               </Box>

            </MessagesBox>)
         }
      </Box >
   )
}

export default MessagesWindow
