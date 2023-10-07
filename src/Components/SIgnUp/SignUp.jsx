import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../../Firebase/Config";
import { addDoc, collection } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Input } from "antd";
const SignUp = () => {
  const navigate =useNavigate()
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const hideError = () => {
    setErrors(null);
  };
  //   const navigate = useNavigate();
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const initialCartValue = 0;
        console.log(user);

        // ...
        addDoc(collection(db, "users"), {
          name: name,
          email: email,
          password: password,
          mobile: mobile,
          uid: user.uid,
        }).then(() => {
          // message.success("Successfull registered")
          toast.success("Successfully Registered", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(()=>{
            navigate('/login')
          },2000)
          setName("");
          setEmail("");
          setPassword("");
          setMobile("");
      
        });
      })
      .catch((error) => {
        if (error.message == "Firebase: Error (auth/invalid-email).") {
          setErrors("please fill all fields");
        }
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          setErrors("User already exist");
        }
      });

    //  register process
  };
  const GoogleRegister = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The simegned-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

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
              {/* <div>
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/012/389/549/small/gold-luxury-emblem-template-design-overlapping-elements-islamic-motif-golden-knot-geometric-pattern-flower-mandala-in-arabic-style-logo-isolated-on-a-black-background-illustration-vector.jpg"
                  className="w-32  rounded-full mx-auto"
                />
              </div> */}
              <div className="mt-12 flex flex-col items-center">
                <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
                <div className="w-full flex-1 mt-8">
                  <div className="flex flex-col items-center">
                    {/* <button
                      onClick={GoogleRegister}
                      className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
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
                      <span className="ml-4">Sign Up with Google</span>
                    </button> */}
                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                      <div className="bg-transparent p-1 rounded-full">
                        <span className="ml-4">Sign Up with </span>
                      </div>

                      <button
                        type="button"
                        className=" h-9 flex items-center w-9 rounded-full mx-5 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-100 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        {/* <!-- Facebook --> */}
                        <FcGoogle
                          size={25}
                          className="mx-auto "
                          onClick={GoogleRegister}
                        />
                      </button>
                    </button>
                  </div>
                  <div className="my-12 border-b text-center">
                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                      Or sign up with e-mail
                    </div>
                  </div>
                  {/* error message  */}
                  {errors && (
                    <>
                      <p
                        onClick={hideError}
                        className="text-red-600  flex items-center justify-between cursor-pointer bg-red-100 text-center p-2 rounded-lg mb-3"
                      >
                        {errors}
                        <RxCross1 />
                      </p>
                    </>
                  )}
                  <Form onSubmitCapture={register} className="mx-auto max-w-xs">
                    <input
                    required
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                    required
                      className="w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="number"
                      required
                      placeholder="+92-**********0"
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <Form.Item required={true} name={"password"}   hasFeedback rules={[
                        { required: true, message: "please enter password" },
                        { min: 6 },
                      ]}>
                        <Input.Password
                          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <button  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
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
                      <span className="ml-3">Sign Up</span>
                    </button>
                    <p className="mt-6 text-xs text-gray-600 text-center">
                      I have already signed up
                      <a
                       onClick={()=>{
                        navigate('/login')
                       }}
                        className="border-b border-gray-500 mx-5 border-dotted"
                      >
                        Login
                      </a>
                    </p>
                  </Form>
                </div>
              </div>
            </div>
            <div className="flex-1  text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://rurutek.com/jio/assets/img/login-animate.gif")',
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SignUp;
