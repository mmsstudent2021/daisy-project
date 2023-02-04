import axios from "axios";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiLogin = async () => {
    const { data } = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
    });
    setIsLoading(false);
    const userData = {
      name: `${data?.firstName} ${data?.lastName}`,
      email: data?.email,
      token: data?.token,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log(userData);
    navigate("/")
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await apiLogin();
  };

  return (
    <div className="container mx-auto">
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={loginHandler} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  placeholder="user name"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary ${isLoading && "btn-disabled"}`}
                >
                  {isLoading ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
