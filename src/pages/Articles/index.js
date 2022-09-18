import React, { useState, useCallback, useContext, useRef } from 'react'
import { styled } from '@mui/material/styles'
import { Typography, Box, Paper, IconButton, Link, Button, Pagination } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { ToastContainer, toast } from 'react-toastify'
import { removeArticle, updateArticle } from '../../services'
import { Context } from '../../context-articles'
import SelectSorting from './SelectSorting'
import 'react-toastify/dist/ReactToastify.css'

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

export const ApplyEditToast = () => (
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

const Articles = () => {
   const { articles, setArticles } = useContext(Context)
   const [readMoreId, setReadMoreId] = useState(null)
   const [editMode, setEditMode] = useState('false')
   const [editModeId, setEditModeId] = useState(null)
   const [editArticleText, setEditArticleText] = useState('')
   const [currentPage, setCurrentPage] = useState(1)
   const [articlesPerPage] = useState(3)
   const editInputRef = useRef()

   const applyEditArticleAlert = useCallback(() => (
      toast.success('Article edit applied!')
   ), [])

   const handleReadMore = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      setReadMoreId(prevId => (prevId !== id) && id)
      setEditMode('false')
   }, [setReadMoreId])

   const handleEditArticle = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      const prevText = articles.find(article => article.id === id).text

      setEditModeId(id)
      setEditMode(prev => prev === 'true' ? 'false' : 'true')

      if (e.target.innerText === 'APPLY EDIT') {
         updateArticle(id, { text: editArticleText })
         applyEditArticleAlert()
      }
      if (e.target.innerText === 'CANCEL') {
         editInputRef.current.innerHTML = prevText
      }
   }, [editArticleText, applyEditArticleAlert, articles])

   const changeArticleText = useCallback(e => {
      setEditArticleText(e.target.innerText)
   }, [])

   const deleteArticle = useCallback(e => {
      e.stopPropagation()
      const id = e.currentTarget.dataset.id
      const filterArticles = articles.filter(article => article.id !== id)
      removeArticle(id)
         .then(setArticles(filterArticles))
   }, [articles, setArticles])

   //                               Paginate
   const COUNT_PAGE = Math.ceil(articles.length / articlesPerPage)
   const lastArticleIndex = currentPage * articlesPerPage
   const firstArticleIndex = lastArticleIndex - articlesPerPage
   const currentArticles = articles.slice(firstArticleIndex, lastArticleIndex)
   const setPage = useCallback((e, value) => setCurrentPage(value), [])

   return (
      <Box>
         <Typography
            variant='h3'
            sx={{ textAlign: 'center', paddingTop: '10px', marginBottom: 0 }}
            paragraph
         >
            "Articles"
         </Typography>

         <SelectSorting />

         {
            currentArticles.map(article => {
               return (
                  <ArticleBox
                     elevation={readMoreId === article.id ? 12 : 4}
                     key={article.id + article.title}
                     sx={article.important && { backgroundColor: '#d5f9d5' }}
                  >
                     <ArticleTitle variant='h6'>{article.title}</ArticleTitle>
                     <ArticleText
                        ref={editInputRef}
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
                              <Button
                                 variant="contained"
                                 data-id={article.id}
                                 onClick={handleEditArticle}
                              >
                                 Apply edit
                              </Button>
                              <Button
                                 variant="text"
                                 data-text={article.text}
                                 data-id={article.id}
                                 onClick={handleEditArticle}
                              >
                                 Cancel
                              </Button>
                           </EditBtnBox>
                        )
                     }

                     <ArticleAuthor>Article author: {article.author}</ArticleAuthor>

                     <ArticleFooter>
                        <Typography variant='caption'>
                           {new Date(article.createdAt).toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Link
                              sx={{ cursor: 'pointer' }}
                              data-id={article.id}
                              onClick={handleReadMore}
                           >
                              {readMoreId === article.id ? '<< READ LESS' : 'READ MORE >>'}
                           </Link>
                           <EditBlock sx={readMoreId === article.id && { visibility: 'visible' }}>
                              <IconButton
                                 data-id={article.id}
                                 sx={{ ml: '10px' }}
                                 onClick={handleEditArticle}
                              >
                                 <Edit />
                              </IconButton>
                              <IconButton
                                 data-id={article.id}
                                 onClick={deleteArticle}
                              >
                                 <Delete />
                              </IconButton>
                           </EditBlock>
                        </Box>
                     </ArticleFooter>
                  </ArticleBox>
               )
            })
         }

         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
               page={currentPage}
               onChange={setPage}
               count={COUNT_PAGE}
               defaultPage={1}
               variant="outlined"
               shape="rounded"
            />
         </Box>
         <ApplyEditToast />
      </Box >
   )
}

export default Articles
