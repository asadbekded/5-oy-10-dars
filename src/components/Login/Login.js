import { useContext, useRef } from "react";
import { Input } from "../Input/Input";
import  axios  from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleFormSub = (evt) => {
    evt.preventDefault();

    axios.post('http://192.168.1.108:5000/user/login', {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
    .then((res) => {
      if(res.status === 200) {
        setToken(res.data.token)
        navigate('/')
      }
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Login</h1>
      <p className="mt-4">Do you not have account? <Link to='/register'>Sign up</Link></p>
      <form onSubmit={handleFormSub} method="post">
        <Input ref={emailRef} type="email" placeholder="Email"/>
        <Input ref={passwordRef} type="password" placeholder="Password"/>
        <button type="submit" className="btn btn-primary">Submit</button>
     </form>
    </div>
  )
}
