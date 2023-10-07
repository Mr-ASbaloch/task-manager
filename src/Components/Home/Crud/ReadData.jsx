import React from "react";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

import { db } from "../../../Firebase/Config";
import { data } from "autoprefixer";
import { Modal, Table } from "antd";
import { GrUpdate } from "react-icons/gr";
import { FiDelete } from "react-icons/fi";
import Navbar from "../../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadData = () => {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

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


  const handleEditClick = (task) => {
    setEditedTask(task);
    setVisible(true);
  };
  const handleEditOk = async () => {
    if (editedTask) {
      const taskDocRef = doc(db, "tasks", editedTask.id);
      try {
        await updateDoc(taskDocRef, {
          title: editedTask.data.title,
          description: editedTask.data.description,
        });
        setVisible(false);
        // Refresh the data or update state as needed
      } catch (err) {
        alert(err);
      }
    }
  };

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
                  <td
                    className="p-2 border-r   border-b"
                    onClick={() => handleEditClick(task)}
                  >
                    <GrUpdate />
                  </td>
                  <td
                    className="p-2 border-r  border-b"
                    onClick={async () => {
                      const taskDocRef = doc(db, "tasks", task.id);
                      try {
                        await deleteDoc(taskDocRef);
                        toast.success("Deleted Successfully ", {
                          position: "top-right",
                          autoClose: 1000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      } catch (err) {
                        alert(err);
                      }
                    }}
                  >
                    <FiDelete />
                  </td>
                </>
              </tr>
            );
          })}
        </table>
      </div>
      <Modal
        title="Edit Task"
        visible={visible}
        onOk={handleEditOk}
        onCancel={() => setVisible(false)}
      >
        {editedTask && (
          <div>
            <div>Title: {editedTask.data.title}</div>
            <div>Description: {editedTask.data.description}</div>
            {/* Add input fields or form elements here for editing */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReadData;
