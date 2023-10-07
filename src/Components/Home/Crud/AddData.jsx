import React, { useState } from "react";
import { collection, addDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../Firebase/Config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        completed: false,
        price: price,
        author: author,
        edition: edition,
        time:Timestamp.now(),
        created: Timestamp.now(),
      });
      toast.success(` the Book ${title} "Successfully Added"`, {
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
        navigate("/view");
      }, 2000);
      // onClose()
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <h1 className="text-center  text-xl md:text-4xl text-pink-600 mt-2">
        Books Management{" "}
      </h1>
      <div className="flex flex-col ">
        <div>
          <img
            src="https://i.pinimg.com/originals/5b/f0/a3/5bf0a3e0601d35349c5451fa52138ea6.gif"
            alt=""
            className="w-[150px] mx-auto rounded-full"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80")',
          }}
          className=" mx-5 rounded-lg  p-12 md:mx-auto md:flex  md:w-1/2 md:flex-wrap md:gap-5"
        >
          <input
            type="text"
            placeholder="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required={true}
            className="p-2 w-full md:w-2/5 rounded-md my-1 text-blue-500 mb-2 outline-none focus:border-dashed"
          />
          <input
            type="text"
            placeholder="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required={true}
            className="p-2  w-full md:w-2/5 rounded-md my-1 text-blue-500 mb-2 outline-none focus:border-dashed"
          />
          <input
            type="text"
            placeholder="author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required={true}
            className="p-2 w-full md:w-2/5 rounded-md my-1 text-blue-500 mb-2 outline-none focus:border-dashed"
          />
          <input
            type="text"
            placeholder="edition"
            onChange={(e) => {
              setEdition(e.target.value);
            }}
            required={true}
            className="p-2 w-full md:w-2/5 rounded-md my-1 text-blue-500 mb-2 outline-none focus:border-dashed"
          />
          <input
            type="number"
            placeholder="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            required={true}
            className="p-2 w-full md:w-2/5 rounded-md my-1 text-blue-500 mb-2 outline-none focus:border-dashed"
          />

      
            <button
              type="submit"
              className="bg-pink-500 p-1 w-full md:w-4/5 md:mx-auto  md:p-2 md:block  rounded-md text-white text-xl"
            >
              Add Book
            </button>
            <button
              onClick={() => {
                navigate("/view");
              }}
              className="bg-blue-500 p-1 w-full md:w-4/5 md:mx-auto  md:p-2 md:block  rounded-md text-white text-xl"
            >
              View Record
            </button>
     
        </form>
      </div>
    </div>
  );
};

export default AddData;
