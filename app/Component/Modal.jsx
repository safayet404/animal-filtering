import React, { useEffect, useState } from "react";
import { ImageUpload } from "../Custom Hooks/ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";

const Modal = () => {
  const [animalName, setAnimalName] = useState("");
  const [fileName, setFileName] = useState("Image");
  const [file, setFile] = useState(null);
  const [allCategoryOptions, setAllCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/category/all-category")
      .then((response) => {
        setAllCategoryOptions(response?.data);
      })
      .catch((error) => {
        console.error("there was an error !", error);
      });
  }, []);
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0]);
    }
  };

  const handleLabelClick = (event) => {
    event.stopPropagation();
    document.getElementById("file").click();
  };

  const handleDivClick = () => {
    document.getElementById("file").click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const photo_url = await ImageUpload(file);

      const data = {
      name: animalName, 
      category: selectedCategory,
      photo_url,
      };
      await axios
        .post("https://animal-filtering-backend.vercel.app/api/animal/create-animal", data)
        .then((res) => {
  
          toast.success("New animal added successfully");
          setAnimalName("")
          setSelectedCategory("")
          setFileName("Image")
         
        })


        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="modal-box bg-white flex flex-col gap-3">
          <h3 className="mb-2 text-lg text-black">Add Animal</h3>

          <input
            type="text"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            placeholder="Animal Name (Unique)"
            className="input w-full bg-[#e3e1e1] text-black py-4 px-5"
            required
            style={{ outline: "none" }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select w-full bg-[#e3e1e1] text-black py-4 px-5"
            required
          >
            <option value="">Select Category</option>
            {allCategoryOptions.length > 0 ? (
              allCategoryOptions.map((category) => (
                <option key={category._id || category.id} value={category.name}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>

          <div
            className="input w-full relative bg-[#e3e1e1] flex items-center justify-between cursor-pointer py-4 px-5 pr-2"
            onClick={handleDivClick}
          >
            <span className="text-black">{fileName}</span>

            <label
              htmlFor="file"
              className="text-sm bg-[#CCCCCC] px-2 py-[6px] rounded-lg text-black cursor-pointer"
              onClick={handleLabelClick}
            >
              Upload
            </label>

            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-active bg-black text-white text-lg font-normal"
          >
            Create Animal
          </button>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Modal;
