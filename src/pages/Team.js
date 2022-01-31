import React from 'react'
// import { Link } from 'react-router-dom'
import { Box, Typography, Grid, Paper, Button, ButtonGroup } from '@mui/material'
import { Mail, Call } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import avatar from '../assets/image/team_member.png'


const teamMembers = [
   {
      name: "Nadia Mcknight",
      position: "Project Director",
      avatar: avatar,
      id: "111"
   },
   {
      name: "Best Blackburn",
      position: "Senior Developer",
      avatar: avatar,
      id: "222"
   },
   {
      name: "Duncan Carver",
      position: "Marketing Manager",
      avatar: avatar,
      id: "333"
   },
   {
      name: "Martin Richards",
      position: "Junior Developer",
      avatar: avatar,
      id: "444"
   },
   {
      name: "Vickie Mosley",
      position: "Project Director",
      avatar: avatar,
      id: "555"
   },
   {
      name: "Misty Ramsey",
      position: "Senior Developer",
      avatar: avatar,
      id: "666"
   },
   {
      name: "Holt Manning",
      position: "Marketing Manager",
      avatar: avatar,
      id: "777"
   },
   {
      name: "Best Blackburn",
      position: "Junior Developer",
      avatar: avatar,
      id: "888"
   },
]

const MemberAvatar = styled(Box)`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 25px;
`
const CardImage = styled(Box)`
   width: 150px;
   height: 150px;
   margin: 0 30px;
   border-radius: 50%;
`
const Position = styled(Typography)`
   border-bottom: 1px solid #c4c4c4;
   color: #8289a6;
   padding-bottom: 25px;
`

// const CardLink = styled(Typography)`
//    display: inline-block;
//    color: black;
// `

const Team = () => {

   return (
      <Box>
         <Typography variant='h3' sx={{ textAlign: 'center', padding: '10px' }} paragraph>"Team"</Typography>
         <Grid container spacing={5}>

            {teamMembers.map(item => {
               return (
                  <Grid item key={item.id}>
                     <Paper elevation={4} sx={{ borderRadius: '20px' }}>

                        <MemberAvatar>
                           <CardImage component='img' alt="Some profile" src={item.avatar} />
                        </MemberAvatar>

                        <Typography component="h6" variant='h6' textAlign='center' >
                           {item.name}
                        </Typography>
                        <Position variant='subtitle1' textAlign='center'>
                           {item.position}
                        </Position>

                        <ButtonGroup variant="text" color='inherit' aria-label="text button group"
                           sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                           <Button sx={{ width: '50%', borderRadius: '0 0 0 20px', padding: "10px" }}>
                              <Mail sx={{ color: 'rgb(148 163 184)', mr: 1 }} />Email
                           </Button>
                           <Button sx={{ width: '50%', borderRadius: '0 0 20px 0' }}>
                              <Call sx={{ color: 'rgb(148 163 184)', mr: 1 }} />Call
                           </Button>
                        </ButtonGroup>

                        {/* <Box sx={{ display: 'flex' }}>
                           <Box sx={{ display: 'block', width: '50%', height: '100%', borderRight: '1px solid #c4c4c4', borderRadius: '0 0 0 20px' }}>
                              <Link 
                                 to='hughes.brian@company.com'
                                 style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', padding: '15px' }}>
                                 <Mail sx={{ color: 'rgb(148 163 184)', mr: 1 }} />
                                 <CardLink>Email</CardLink>
                              </Link>
                           </Box>

                           <Box sx={{ display: 'block', width: '50%', borderRadius: '0 0 20px 0' }}>
                              <Link
                                 to="#"
                                 style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', padding: '15px' }}>
                                 <Call sx={{ color: 'rgb(148 163 184)', mr: 1 }} />
                                 <CardLink>Call</CardLink>
                              </Link>
                           </Box>
                        </Box> */}

                     </Paper>
                  </Grid>
               )
            })}

         </Grid>
      </Box >
   )
}

export default Team
