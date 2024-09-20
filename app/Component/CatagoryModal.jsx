import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CatagoryModal = () => {
  const [catagory, setCatagory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const data = {
        name : catagory
      }
      await axios
        .post("https://animal-filtering-backend.vercel.app/api/category/create-category", data)
        .then((res) => {
          console.log(res.data);
          toast.success("New Category added successfully");
          setCatagory("")
        })



        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to add category");
    }
  };

  return (
    <dialog id="my_modal_1" className="modal  max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="modal-box bg-white flex flex-col gap-3">
        <h3 className="mb-2 text-lg text-black">Add Category</h3>
        <input
          type="text"
          value={catagory}
          onChange={(e) => setCatagory(e.target.value)}
          placeholder="Name"
          className="input w-full bg-[#e3e1e1] text-black py-4 px-5"
          required
          style={{ outline: "none" }}
        />
        <button
          type="submit"
          className="btn btn-active bg-black text-white text-lg font-normal"
        >
          Save
        </button>
      </form>

      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default CatagoryModal;