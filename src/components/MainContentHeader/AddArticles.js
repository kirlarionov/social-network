import React, { useState, useRef, useEffect, useCallback, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Button, Paper, TextField, FormControlLabel, Switch } from '@mui/material'
import { Mail } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { addArticle } from '../../services'
import { Context } from '../../context-articles'
import CustomButton from '../CustomButton'

const MessageBlock = styled(Paper)`
   position: absolute;
   top: 40px;
   left: -210px;
   width: 500px;
   color: black;
   border-radius: 15px;
   transition: all .3s;
   overflow: hidden;
   z-index: 999;
`
const ErrorMessage = styled(Typography)`
   position: absolute;
   color: red;
   top: 60px;
   left: 80px;
`

function AddArticles() {
   const { setArticles } = useContext(Context)
   const [showAddArticleBox, setShowAddArticleBox] = useState(false)
   const [articleTitle, setArticleTitle] = useState('')
   const [articleText, setArticleText] = useState('')
   const [articleAuthor, setArticleAuthor] = useState('')
   const [emptyTextField, setEmptyTextField] = useState(false)
   const rootEl = useRef(null)

   const handleChangeArticle = event => setArticleText(event.target.value)
   const handleChangeArticleTitle = event => setArticleTitle(event.target.value)
   const handleChangeArticleAuthor = event => setArticleAuthor(event.target.value)

   const openSendArticleWindow = useCallback(() => (
      setShowAddArticleBox(!showAddArticleBox)
   ), [showAddArticleBox])

   const successAddArticleAlert = useCallback(() => (
      toast.success('Article added successfully!')
   ), [])

   const Toast = () => (
      <ToastContainer
         position="bottom-right"
         autoClose={3000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme='colored'
      />
   )

   const submitHandler = useCallback(event => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const { important, ...data } = Object.fromEntries(formData)

      if (articleTitle && articleText && articleAuthor) {
         addArticle({ ...data, important: important === 'important', createdAt: new Date() })
            .then(artical => setArticles(prevState => [artical, ...prevState]))
            .then(() => {
               setArticleText('')
               setArticleTitle('')
               setArticleAuthor('')
               setShowAddArticleBox(false)
               successAddArticleAlert()
            })
      } else {
         setEmptyTextField(true)
         setTimeout(() => setEmptyTextField(false), 3000)
      }
   }, [setShowAddArticleBox, articleTitle, articleText, articleAuthor, setArticles, successAddArticleAlert])

   useEffect(() => {
      const onClick = e => rootEl.current.contains(e.target) || setShowAddArticleBox(false)
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
   }, [setShowAddArticleBox])

   return (
      <Box sx={{ position: 'relative' }} ref={rootEl}>
         <CustomButton
            onClick={openSendArticleWindow}
            variant="contained"
         >
            <Mail sx={{ width: '18px', height: '18px', mr: 1 }} />
            <Typography variant='text'>Add article</Typography>
         </CustomButton>

         {
            showAddArticleBox && (
               <MessageBlock elevation={4}>
                  <Box sx={{ backgroundColor: '#4f46e5', p: '15px', color: 'white' }}>
                     <Typography fontSize={17}>Add article</Typography>
                  </Box>
                  {
                     emptyTextField && <ErrorMessage>ATTENTION: all fields must be filled</ErrorMessage>
                  }
                  <Box
                     component='form'
                     onSubmit={submitHandler}
                     noValidate
                     autoComplete="off"
                  >
                     <Box sx={{ p: '15px' }}>
                        <TextField
                           name='author'
                           value={articleAuthor}
                           onChange={handleChangeArticleAuthor}
                           type='text'
                           id="input-with-sx"
                           label="Your name"
                           variant="standard"
                           sx={{ width: '100%' }}
                        />
                        <TextField
                           name='title'
                           value={articleTitle}
                           onChange={handleChangeArticleTitle}
                           type='text'
                           id="input-with-sx"
                           label="Article title"
                           variant="standard"
                           sx={{ width: '100%' }}
                        />
                        <TextField
                           name='text'
                           type='text'
                           id="standard-multiline-flexible"
                           label="Your article text..."
                           multiline
                           maxRows={6}
                           value={articleText}
                           onChange={handleChangeArticle}
                           variant="outlined"
                           sx={{ width: '100%', mt: '20px' }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: '10px 0 0' }}>
                           <FormControlLabel
                              name='important'
                              value="important"
                              control={<Switch color="primary" />}
                              label="Mark as important:"
                              labelPlacement="start"
                           />
                           <Button
                              type='submit'
                              variant="contained"
                              endIcon={<SendIcon />}
                           >
                              Send
                           </Button>
                        </Box>
                     </Box>
                  </Box>
               </MessageBlock>
            )
         }
         <Toast />
      </Box >
   )
}

export default AddArticles
