import { useContext, useRef } from "react";
import { Input } from "../Input/Input";
import  axios  from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {

  const { setToken } = useContext(AuthContext)

  const navigate = useNavigate()

  const firstRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleFormSub = (evt) => {
    evt.preventDefault();

    axios.post('http://192.168.1.108:5000/user/register', {
      user_name: firstRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    })
    .then((res) => {
      if(res.status === 201) {
        setToken(res.data.token)
        navigate('/')
      }
    })
    .catch((err) => console.log(err))
  };

  return (
    <div className="w-50 mx-auto shadow p-5 mt-5">
      <h1 className="text-center text-primary">Register</h1>
      <p className="mt-4">Do you have account? <Link to='/login'>Sign in</Link></p>
      <form onSubmit={handleFormSub} method="post">
        <Input ref={firstRef} type="text"  placeholder="Name"/>
        <Input ref={phoneRef} type="tel" placeholder="Phone"/>
        <Input ref={emailRef} type="email" placeholder="Email"/>
        <Input ref={passwordRef} type="password" placeholder="Password"/>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
