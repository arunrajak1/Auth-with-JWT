import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  let token =''
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitChange = async (e) => {
    e.preventDefault();
    
    try {
      await axios
        .post("http://127.0.0.1:5000/login", { name, email })
        .then((response) => {
          token=response.data.token
          if(token && token.length){
            localStorage.setItem('token',token)
            console.log("Login Successful");
            navigate('/',{
              state:{
                name,
                email
            }})
          }
        })
        .catch(() => console.log("Invalid Login"));
       
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-300 to-blue-500">
      <div className="flex flex-col items-center justify-center bg-white shadow-md px-4 sm:px-6 md:px-8 lg:10 py-8 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 font-serif">
          Login To Your Account
        </h2>

        <div className="mt-10">
          <form>
            <div className="flex flex-col items-start mb-4">
              <label
                htmlFor="name"
                className="block text-sm mb-1 ml-1 font-serif"
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                id="name"
                placeholder="Enter Full Name"
                className="rounded-lg w-full px-4 py-2 border focus:outline-none focus:ring"
                onChange={handleNameChange}
              ></input>
            </div>
            <div className="flex flex-col mb-6 items-start">
              <label
                htmlFor="email"
                className="block text-sm mb-1 ml-1 font-serif"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                placeholder="Your Email"
                className="rounded-lg w-full px-4 py-2 border focus:outline-none focus:ring"
                onChange={handleEmailChange}
              ></input>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                className="rounded-lg border hover:bg-sky-600 bg-sky-400 px-4 py-2 text-white font-serif"
                onClick={handleSubmitChange}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
