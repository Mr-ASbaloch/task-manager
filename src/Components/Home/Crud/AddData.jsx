import React, { useState } from "react";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Config";
import { Form, Input } from "antd";

const initialState = { title: "", description: "", price: "" };
const AddData = () => {
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(state);

    let { title, description, price } = state;

    title = title.trim();
    description = description.trim();
    price = Number(price);

    if (title.length < 3) {
      window.toastify(`title ki length km hai`, "error");
      return;
    }
    if (description.length < 10) {
      window.toastify(`description ki length km hai`, "error");
      return;
    }
    if (!price || price < 0) {
      window.toastify(`price km hai`, "error");
      return;
    }
    setIsLoading(true);
    let productId = Math.random().toString(36).slice(2);
    let formData = { title, description, price, productId };

    try {
      await setDoc(doc(firestore, "products", productId), formData);
      console.log("Document written with ID: ", productId);
      window.toastify(`Document written with ID: ${productId}`, "success");
    } catch (e) {
      console.error("Error adding document: ", e);
      window.toastify(`Error adding document: ${e.message}`, "error");
    }

    setIsLoading(false);
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
        <Form
          onSubmit={handleSubmit}
          className="bg-gray-300 p-12 md:mx-auto md:flex  md:w-1/2 md:flex-wrap md:gap-5"
        >
          <Form.Item name="Title" label="Title" required>
            <Input
              className="md:w-full  mx-auto "
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="description" label="Description" required>
            <Input
              type="text"
              placeholder="description"
              name="description"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="author" label="Author" required>
            <Input
              type="text"
              className="form-control"
              placeholder="pardeep s sinha"
              name="author"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="edition" label="Edition" required>
            <Input
              type="text"
              className="form-control"
              placeholder="2nd ---*"
              name="edition"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item name="price" label="Price" required>
            <Input
              type="number"
              className="form-control"
              placeholder="price"
              name="price"
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddData;
