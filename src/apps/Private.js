import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Todo } from "../pages/Todo/Todo";

export const Private = () => {
   return (
     <>
       <Header/>
     
     <Routes>
      <Route path="/" element={<div className="container mt-3"><h3>Welcom to the Home page</h3></div>}/>
      <Route path="/todo" element={<Todo/>}/>
     </Routes>
     </>
   )
 }