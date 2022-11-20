import React, { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { Box, CssBaseline } from "@mui/material"
import AppHeader from "./components/AppHeader"
import LeftSidebar from "./components/LeftSidebar"
import MainContentHeader from "./components/MainContentHeader"
import PageLinks from "./components/PageLinks"
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import Team from "./pages/Team"
import { ArticleProvider } from "./context-articles"
import { MessagesProvider } from "./context-messages"

const DRAWER_WIDTH = 280

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
   ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${DRAWER_WIDTH}px`,
      ...(open && {
         transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
         }),
         marginLeft: 0,
      }),
   })
)

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(0, 1),
   ...theme.mixins.toolbar,
   justifyContent: "flex-end",
}))

const App = () => {
   const [open, setOpen] = useState(true)
   const handleDrawerOpen = () => setOpen(!open)

   return (
      <ArticleProvider>
         <MessagesProvider>
            <Box sx={{ display: "flex" }}>
               <CssBaseline />

               <AppHeader open={open} handleDrawerOpen={handleDrawerOpen} />
               <LeftSidebar open={open} DrawerHeader={DrawerHeader} />
               <Main open={open}>
                  <DrawerHeader />
                  <MainContentHeader />
                  <PageLinks />
                  <Routes>
                     <Route path="/social-network/" element={<Home />} />
                     <Route
                        path="/social-network/articles"
                        element={<Articles />}
                     />
                     <Route path="/social-network/team" element={<Team />} />
                  </Routes>
               </Main>
            </Box>
         </MessagesProvider>
      </ArticleProvider>
   )
}

export default App
