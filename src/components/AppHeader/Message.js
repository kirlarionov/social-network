import React, { useCallback, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Close, Circle } from '@mui/icons-material'
import { Box, Typography, IconButton, Tooltip } from '@mui/material'
import { removeMessage as delMessage, updateMessage } from './../../services'
import { Context } from '../../context-messages'

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

const Message = ({ message }) => {
   const { messages, setMessages } = useContext(Context)

   const removeMessage = useCallback(e => {
      e.stopPropagation()
      const currentMessages = messages.filter(curMessage => curMessage.id !== message.id)
      delMessage(message.id)
         .then(setMessages(currentMessages))
   }, [message.id, messages, setMessages])

   const handleReadMessage = useCallback(e => {
      e.stopPropagation()
      updateMessage(message.id, { read: !message.read })
         .then(updatedMessage =>
            setMessages(prevMessagesState => [...prevMessagesState].map(prevMessage => {
               if (prevMessage.id === message.id) return updatedMessage
               else return prevMessage
            })))
   }, [setMessages, message])

   return (
      <MessageCard MessageCard >
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
               <IconButton onClick={handleReadMessage}>
                  <Circle color={message.read ? 'disabled' : 'primary'} sx={{ padding: '2px' }} />
               </IconButton>
            </Tooltip>

            <Tooltip title='Remove' placement="left-end">
               <IconButton onClick={removeMessage} >
                  <Close />
               </IconButton>
            </Tooltip>
         </Box>
      </MessageCard>
   )
}

export default Message