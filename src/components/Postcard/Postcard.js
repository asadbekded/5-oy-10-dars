import { Modal } from "../Modal/Modal";
import { useContext, useRef, useState } from "react";
import { Input } from "../Input/Input";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export const PostCard = ({ item,  setPosts }) => {
   
   const [ editModal, setEditModal] = useState(false);
   const titleRef = useRef();
   const { token } = useContext(AuthContext)

   const handleEditPost = (evt) => {
      evt.preventDefault()
      // axios
      // .put("http://localhost:8080/posts/" + item.id, {
      //    title: titleRef.current.value,
      // })
      // .then(res => {
      //    if(res.status === 200){
      //       setEditModal(false)
      //    };
      // })
      // .catch(err => console.log(err))
      const headers = {
         'Content-Type': 'application/json',
         'Authorization': token,
       }
       
       axios.put("http://192.168.1.108:5000/todo/"+ item.id,{text : titleRef.current.value}, {
           headers: headers
         })
         .then((res) => {
           setEditModal(false)
         })
         .catch((error) => console.log(error))
   }

   const handleDel = () => {

      const headers = {
         'Content-Type': 'application/json',
         'Authorization': token,
       }
       
       axios.delete("http://192.168.1.108:5000/todo/"+ item.id, {
           headers: headers
         })
         .then((res) => {
           setEditModal(false)
         })
         .catch((error) => console.log(error))
   }

  return (
   <>
    <li className="d-flex align-items-center justify-content-between shadow p-3 mb-3">
     <h5 className="m-0">{item.todo_value}</h5>
     <button onClick={() => setEditModal(true)} className="btn btn-warning m-0">EDIT</button>
    </li> 

   {editModal && (<Modal  modal={editModal} setModal={setEditModal} title='Edit'>
   <form onSubmit={handleEditPost} className="mt-4">
      <Input ref={titleRef} defaultValue={item.todo_value} type="text" placeholder="Title"/>
      <button className="btn btn-primary">EDIT</button>
      <button type="button" onClick={handleDel} className="btn btn-danger ms-2">DEL</button>
   </form>
   </Modal>)}
   </>
  )
};