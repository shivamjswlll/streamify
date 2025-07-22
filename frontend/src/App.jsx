import React from 'react'
import {Routes,Route} from "react-router";
import HomePage from "./pages/Homapage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import toast , {Toaster} from "react-hot-toast";

const App = () => {
  return (
    <div className="h-screen"data-theme = "coffee"> 
    <button onClick={()=> toast.success("Hello World")}>Toast</button>
    <Routes>
        <Route path = "/" element={<HomePage/>}/>
        <Route path = "/signup" element={<SignUpPage/>}/>
        <Route path = "/login" element={<LoginPage/>}/>
        <Route path = "/notification" element={<NotificationPage/>}/>
        <Route path = "/call" element={<CallPage/>}/>
        <Route path = "/chat" element={<ChatPage/>}/>
        <Route path = "/onboarding" element={< OnboardingPage/>}/>
    </Routes>
    <Toaster position="top-center"/>
    </div>
  )
}

export default App