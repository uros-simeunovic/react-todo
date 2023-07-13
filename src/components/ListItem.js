import axios from "axios";
import { Modal } from "./Modal";
import { useState } from "react";

export const ListItem = ({ task, setItemList }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/todos/${id}`);
    const response = await axios.get("http://localhost:8080/todos");
    const jsonData = response.data;
    setItemList(jsonData);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Temporary solution, mysql timezone problem
  let time = task.time.split(":");
  time = parseInt(time[0]) + 2 + ":" + time[1] + ":" + time[2];

  return (
    <div className="item-wrapper">
      <h2 className="title">{task.title}</h2>
      <div className="date-time">
        <div>{time}</div>
        <div>{task.date}</div>
      </div>{" "}
      <div className="btn-wrapper">
        <button className="update-btn" onClick={handleOpenModal}>
          <svg
            className="update-icon"
            fill="#ffffff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 420.827 420.827"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M210.29,0C156,0,104.43,20.693,65.077,58.269C25.859,95.715,2.794,146.022,0.134,199.921 c-0.135,2.734,0.857,5.404,2.744,7.388c1.889,1.983,4.507,3.105,7.244,3.105h45.211c5.275,0,9.644-4.098,9.979-9.362 c4.871-76.214,68.553-135.914,144.979-135.914c80.105,0,145.275,65.171,145.275,145.276c0,80.105-65.17,145.276-145.275,145.276 c-18.109,0-35.772-3.287-52.501-9.771l17.366-15.425c2.686-2.354,3.912-5.964,3.217-9.468c-0.696-3.506-3.209-6.371-6.592-7.521 l-113-32.552c-3.387-1.149-7.122-0.407-9.81,1.948c-2.686,2.354-3.913,5.963-3.218,9.467L69.71,403.157 c0.696,3.505,3.209,6.372,6.591,7.521c3.383,1.147,7.122,0.408,9.81-1.946l18.599-16.298 c31.946,18.574,68.456,28.394,105.581,28.394c116.021,0,210.414-94.392,210.414-210.414C420.705,94.391,326.312,0,210.29,0z"></path>{" "}
                  <path d="M195.112,237.9h118.5c2.757,0,5-2.242,5-5v-30c0-2.757-2.243-5-5-5h-83.5v-91c0-2.757-2.243-5-5-5h-30 c-2.757,0-5,2.243-5,5v126C190.112,235.658,192.355,237.9,195.112,237.9z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </button>
        <Modal
          task={task}
          isOpen={modalOpen}
          onClose={handleCloseModal}
          id={task.id}
          setItemList={setItemList}
        />
        <button className="delete-btn" onClick={() => deleteItem(task.id)}>
          &times;
        </button>
      </div>
    </div>
  );
};
