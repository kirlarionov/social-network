import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomButtonProvider = styled(Button)`
   font-family: "Roboto","Helvetica","Arial",sans-serif;
   letter-spacing: 0.02857em;
   text-transform: uppercase;
   border-radius: 20px;
   background-color: #4f46e5;
   margin-right: 16px;
`

const CustomButton = ({ children, ...style }) => (
   <CustomButtonProvider {...style}>
      {children}
   </CustomButtonProvider>
)

export default CustomButton