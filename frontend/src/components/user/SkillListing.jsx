import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SkillListing = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const getAllCategories = async () => {
    const res = await axios.get("/category/getallcategory");
    console.log(res.data);
    setCategories(res.data.data);
  };
  const getSubCategoryByCategoryId = async (id) => {
    try {
      const res = await axios.get(`/category/subcategory/${id}`);
      console.log("SubCategory response...", res.data);
      setSubCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  

  useEffect(() => {
    getAllCategories();
  }, []);

  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const userId = localStorage.getItem("id");
    data.userId = userId;
    const res = await axios.post("/skill/add", data);
    console.log(res.data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Skill Listing</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Skill Name</label>
          <input type="text" {...register("skillName")} />
        </div>
        <div>
          <label>Select Category</label>
          <select
            {...register("categoryId")}
            onChange={(event) => {
              getSubCategoryByCategoryId(event.target.value);
            }}
          >
            <option>SELECT CATEGORY</option>
            {categories?.map((category) => {
              return <option key={category._id} value={category._id}>{category.name}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Select SubCategory</label>
          <select {...register("subCategoryId")}>
            <option>SELECT SUBCATEGORY</option>
            {subCategories?.map((subCategory) => {
              return <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>;
            })}
          </select>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SkillListing;