import { Form, Input } from "antd";
import React from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, provider, auth } from "../../Firebase/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate()
  //   const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // message.success("login Successfully");
        toast.success("Successfully LoggedIN", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // message.error("invalid email or password");
        toast.error("invalid email or password", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(()=>{
          navigate('/')
        }, 2000)
      });
  };
  const logInGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setTimeout(() => {
          navigate("/");
        });
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <div>
      <>
        {/* source:https://codepen.io/owaiswiz/pen/jOPvEPB */}
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
              <div>
                <img
                  //   src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
                  src="https://cdnl.iconscout.com/lottie/premium/thumb/account-access-5611687-4682462.gif"
                  className="w-[20%]  rounded-full mx-auto"
                />
              </div>
              <div className="mt-12 flex flex-col items-center">
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">
                    <button
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                      onClick={logInGoogle}
                    >
                      <div className="bg-white p-2 rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">Sign In with Google</span>
                    </button>
                  </div>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign In with Cartesian E-mail
                    </div>
                  </div>
                  <Form onSubmitCapture={logIn} className="mx-auto max-w-xs">
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      required
                      placeholder="Email"
                    />

                    <Form.Item
                      name="password"
                      hasFeedback
                      rules={[
                        { required: true, message: "please enter password" },
                        { min: 6 },
                      ]}
                    >
                      <Input.Password
                      required
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>

                    <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-">Sign In</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      Don't have an account ?
                      <a
                      
                        className="border-b border-gray-500 border-dotted"
                        onClick={()=>{
                          navigate("/signup")
                        }}
                      >
                        Register
                      </a>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
            {/* <div className="flex-1 bg-green-100 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://codemyui.com/wp-content/uploads/2016/01/owl-login-form-replica-from-readme-io_.gif")',
                }}
              ></div>
            </div> */}
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
