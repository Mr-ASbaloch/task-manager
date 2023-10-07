import React from "react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/Config";
import { data } from "autoprefixer";
import { Table } from "antd";
import { GrUpdate } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import Navbar from "../../Navbar/Navbar";

const ReadData = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(tasks);

  return (
    // <table key={task.id}>
    //   <th>{task.id}</th>
    //   <tr>{task.data.price}</tr>

    // </table>

    <>
      <Navbar />
      <h1 className="text-center mt-5 md:text-4xl text-purple-800">
        Your Books Collection{" "}
      </h1>
      <div className="flex">
        <table className="border  rounded-md capitalize  bg-slate-100 shadow-md mx-auto mt-8">
          <tr className="text-blue-700 shadow-sm  p-2">
            <th className="p-2 border-r ">Title</th>

            <th className="p-2 border-r ">descripton</th>
            <th className="p-2 border-r ">author</th>
            <th className="p-2 border-r ">price $</th>
            <th className="p-2 border-r ">edition</th>
            <th className="p-2 border-r ">Update</th>
            <th className="p-2 border-r ">Delete</th>
          </tr>
          {tasks.map((task, index) => {
            return (
              <tr key={task.id}>
                <>
                  <td className="p-2 border-r  border-b">{task.data.title}</td>
                  <td className="p-2 border-r  border-b">
                    {task.data.description}
                  </td>
                  <td className="p-2 border-r  border-b">{task.data.author}</td>
                  <td className="p-2 border-r  border-b">{task.data.price} </td>
                  <td className="p-2 border-r  border-b">
                    {task.data.edition}
                  </td>
                  <td className="p-2 border-r   border-b">
                    <GrUpdate />
                  </td>
                  <td className="p-2 border-r  border-b">
                    <FiDelete />
                  </td>
                </>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ReadData;
