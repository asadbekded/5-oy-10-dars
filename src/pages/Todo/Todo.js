import { Modal } from "../../components/Modal/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "../../components/Input/Input";
import  axios  from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { PostCard } from "../../components/Postcard/Postcard";

export const Todo = () => {
  
  const titleRef = useRef();
  const { token } = useContext(AuthContext)
  const [ modal, setModal ] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() =>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    
    axios.get("http://192.168.1.108:5000/todo", {
        headers: headers
      })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
      })
 }, [posts]);

 const handleAddPost = (evt) => {
    evt.preventDefault()
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }
    
    axios.post("http://192.168.1.108:5000/todo", {text : titleRef.current.value} , {
        headers: headers
      })
      .then((res) => {
        setModal(false)
      })
      .catch((error) => {
      })
 }



  return (
    <div className="container">
      <button onClick={() => setModal(true)} className="btn btn-primary mt-3">+ Create Todo</button>

      {
         posts.length ? <ul className="p-0 m-0 mt-4">
         {
            posts.map((el) =>(
               <PostCard key={el.id}  setPosts={setPosts} item={el} />
            ))
         }
         </ul>: <h2>Loading...</h2>
      }

      {modal && (<Modal modal={modal} setModal={setModal} title='Add'>
         <form onSubmit={handleAddPost} className="mt-4">
            <Input ref={titleRef} type="text" placeholder="Title"/>
            <button className="btn btn-primary">POST</button>
         </form>
      </Modal>)}
    </div>
  )
}
