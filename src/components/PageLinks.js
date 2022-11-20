import React from "react"
import { NavLink } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Box } from "@mui/material"

const PageLink = styled(NavLink)`
   font-size: 20px;
   color: #29899b;
   margin-right: 10px;
   padding: 5px 8px;
   border: 1px solid #c5e4ea;
   border-bottom: 0;
   border-radius: 15px 15px 0 0;
   &:hover {
      background-color: #e4f8f9;
      transition: all 0.3s;
   }
   &.active {
      background-color: #e4f8f9;
   }
`
const Line = styled(Box)`
   width: 100%;
   margin-top: 2px;
   height: 1px;
   background-color: #49b3c7;
`

const PageLinks = () => (
   <>
      <Box>
         <PageLink to="/social-network">Home</PageLink>
         <PageLink to="/social-network/articles">Articles</PageLink>
         <PageLink to="/social-network/team">Team</PageLink>
      </Box>
      <Line />
   </>
)

export default PageLinks
