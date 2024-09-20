"use client";
import Image from "next/image";
import Modal from "./Component/Modal";
import CatagoryModal from "./Component/CatagoryModal";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allAnimals, setAllAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://animal-filtering-backend.vercel.app/api/category/all-category")
      .then((response) => {
        setCategoryOptions(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false); 
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://animal-filtering-backend.vercel.app/api/animal/all-animal")
      .then((response) => {
        setAllAnimals(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setLoading(false);
      });
  }, []);

  const filterAnimalsByCategory = () => {
    if (selectedCategory === "All") {
      return allAnimals;
    } else {
      return allAnimals.filter((animal) =>
        Array.isArray(animal.category)
          ? animal.category.includes(selectedCategory)
          : animal.category === selectedCategory
      );
    }
  };

  return (
    <main className="container mx-auto p-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:justify-between items-start mt-20">
        <div className="flex gap-3 flex-wrap lg:col-span-2 sm:justify-start justify-center">
          <button
            className={`capitalize btn btn-outline rounded-full py-4 px-5 ${
              selectedCategory === "All"
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categoryOptions &&
            categoryOptions.length > 0 &&
            categoryOptions.map((data) => (
              <button
                key={data._id}
                className={`capitalize btn btn-outline rounded-full py-4 px-5 ${
                  selectedCategory === data.name
                    ? "border-green-500 text-green-500"
                    : "border-red-500 text-red-500"
                }`}
                onClick={() => setSelectedCategory(data.name)}
              >
                {data.name}
              </button>
            ))}
        </div>

        <div className="flex gap-2 flex-wrap justify-center sm:ustify-end">
          <button
            className="btn btn-outline rounded-full text-white border-white py-4 px-5"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Add animal
          </button>
          <Modal />
          <button
            className="btn btn-outline rounded-full text-white border-white py-4 px-5"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Add category
          </button>
          <CatagoryModal />
        </div>
      </div>

    
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid  grid-cols-2  md:grid-cols-4 lg:grid-cols-6 gap-6 justify-between items-center mt-10">
          {filterAnimalsByCategory().map((data) => (
            <div key={data.name} className="h-full">
              <div className="bg-[#050505] border rounded-lg border-[#141414] h-5/6 p-4 flex gap-3 justify-center items-center">
                <Image
                  src={data.photo_url}
                  width={100}
                  height={200}
                  alt={data.name}
                  layout="intrinsic"
                />
              </div>
              <p className="text-center mt-2">{data.name}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
