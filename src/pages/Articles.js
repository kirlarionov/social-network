import React, { useState, useCallback, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Box, Paper, IconButton, Link, Button } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { removeArticle, updateArticle } from '../services'
import { Context } from '../context'


const ArticleBox = styled(Paper)`
   position: relative;
   padding: 15px 15px 10px 15px; 
   margin-bottom: 20px;
`
const ArticleTitle = styled(Typography)`
   margin-bottom: 10px;
   ::first-letter {
      text-transform: uppercase;
   }
`
const ArticleText = styled(Typography)`
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: ${prop => prop.open};
   overflow: hidden;
   transition: all 0.5s;
`
const EditBtnBox = styled(Box)`
   position: absolute;
   bottom: 44px;
   left: 42%;
`
const ArticleAuthor = styled(Typography)`
   font-style: italic;
   font-size: 13px;
   margin-top: 5px;
`
const ArticleFooter = styled(Box)`
   display: flex;
   justify-content: space-between;
   align-items: center;
`
const EditBlock = styled(Box)`
   visibility: hidden;
`

function Articles() {

   const [readMoreId, setReadMoreId] = useState(null)
   const [editMode, setEditMode] = useState('false')
   const [editModeId, setEditModeId] = useState(null)
   const [editArticleText, setEditArticleText] = useState('')


   const { articles, setArticles } = useContext(Context)

   const applyEditArticleAlert = useCallback(() => toast.success('Article edit applied!'), [])
   const ApplyEditToast = () => (
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

   const handleReadMore = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      setReadMoreId(prevId => (prevId !== id) && id)
      setEditMode('false')
   }, [setReadMoreId])

   //! Доработать кнопку 'CANCEL'
   const handleEditArticle = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      setEditModeId(id)
      setEditMode(prev => prev === 'true' ? 'false' : 'true')
      if (e.target.innerText === 'APPLY EDIT') {
         updateArticle(id, { text: editArticleText })
         applyEditArticleAlert()
      }
      // else if (e.target.innerText === 'CANCEL') {
      // const prevText = e.currentTarget.dataset.text
      // setArticles(prevState => {
      //    const updateArticle = { ...prevState[id], text: prevText }
      //    return {
      //       ...prevState,
      //       [id]: updateArticle
      //    }
      // })
      // }
   }, [editArticleText, applyEditArticleAlert])


   const changeArticleText = useCallback(e => setEditArticleText(e.target.innerText), [])


   const deleteArticle = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      const currentArticles = Object.values(articles).filter(article => article.id !== id)
      removeArticle(id)
         .then(setArticles(currentArticles))
   }, [articles, setArticles])


   const visibleEditBlock = { visibility: 'visible' }
   const editModeStyle = {
      border: '2px solid blue',
      padding: '5px',
      '::before': {
         content: '"EDIT MODE"',
         position: 'absolute',
         top: '39px',
         right: '15px',
         color: 'white',
         backgroundColor: 'blue',
         fontSize: '10px',
         lineHeight: '14px',
         padding: '0 4px',
         borderRadius: '5px 5px 0 0'
      }
   }


   return (
      <Box>
         <Typography variant='h3' sx={{ textAlign: 'center', padding: '10px' }} paragraph>"Articles"</Typography>

         {Object.values(articles).map((article, index) => {
            return (
               <ArticleBox
                  elevation={readMoreId === article.id ? 12 : 4}
                  key={article.id * index}
                  sx={article.important && { backgroundColor: '#ffe3d7' }}
               >
                  <ArticleTitle variant='h6'>{article.title}</ArticleTitle>
                  <ArticleText
                     open={readMoreId === article.id ? 'inherit' : 1}
                     sx={(editMode === 'true' && editModeId === article.id) && editModeStyle}
                     contentEditable={(readMoreId === article.id) && editMode}
                     suppressContentEditableWarning='true'
                     onBlur={changeArticleText}
                  >
                     {article.text}
                  </ArticleText>
                  {
                     (editMode === 'true' && editModeId === article.id) && (
                        <EditBtnBox>
                           <Button variant="contained" onClick={handleEditArticle} data-id={article.id}>
                              Apply edit
                           </Button>
                           <Button variant="text"
                              onClick={handleEditArticle}
                              data-text={article.text} data-id={article.id}>
                              Cancel
                           </Button>
                        </EditBtnBox>)
                  }
                  <ArticleAuthor>Article author: {article.author}</ArticleAuthor>

                  <ArticleFooter>
                     <Typography variant='caption'>{new Date(article.createdAt).toLocaleString()}</Typography>
                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link
                           sx={{ cursor: 'pointer' }}
                           data-id={article.id}
                           onClick={handleReadMore}
                        >
                           {readMoreId === article.id ? '<< READ LESS' : 'READ MORE >>'}
                        </Link>
                        <EditBlock sx={readMoreId === article.id && visibleEditBlock}>
                           <IconButton onClick={handleEditArticle} data-id={article.id} sx={{ ml: '10px' }}>
                              <Edit />
                           </IconButton>
                           <IconButton onClick={deleteArticle} data-id={article.id}>
                              <Delete />
                           </IconButton>
                        </EditBlock>

                     </Box>
                  </ArticleFooter>

               </ArticleBox>
            )
         })}
         <ApplyEditToast />
      </Box >
   )
}

export default Articles
