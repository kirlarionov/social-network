import React, { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton, Badge, Paper, Tooltip } from '@mui/material'
import { InboxOutlined, Mail } from '@mui/icons-material'
import { Context as MessagesContext } from '../../context-messages'
import { updateMessage } from './../../services'
import Message from "./Message";

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

const MessagesWindow = () => {
   const { messages, setMessages, newMessages, setNewMessages } = useContext(MessagesContext)
   const [showMessagesBox, setShowMessagesBox] = useState(false)

   const rootEl = useRef(null)

   const markAllAsRead = useCallback(e => {
      e.stopPropagation()
      messages.filter(message => !message.read)
         .forEach(async (message) => {
            updateMessage(message.id, { read: true })
               .then(updatedMessage => setMessages(prevState => {
                  return [...prevState].map(prevMessage => {
                     if (prevMessage.id === message.id) return updatedMessage
                     else return prevMessage
                  })
               }))
         })
   }, [messages, setMessages])

   useEffect(() => {
      const unReadMessages = messages.filter(message => !message.read)
      setNewMessages(unReadMessages.length)
   }, [messages, setMessages, setNewMessages])

   const openMessagesWindow = useCallback(() => (
      setShowMessagesBox(!showMessagesBox)
   ), [showMessagesBox])

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
         {
            showMessagesBox && (
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
                     {
                        messages && messages.map((message) => {
                           return (
                              <Message
                                 message={message}
                                 messages={messages}
                                 setMessages={setMessages}
                                 key={message.id + message.createdAt}
                              />
                           )
                        })
                     }
                  </Box>
               </MessagesBox>
            )
         }
      </Box >
   )
}

export default MessagesWindow
