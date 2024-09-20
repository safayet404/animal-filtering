"use client"
import axios from 'axios';


export const ImageUpload = async(image) => {
  const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=938b7f4101dd037b7192d669197b9aa7`,
      formData
    );
    const photo_url = data.data.display_url;
  
    return photo_url;
};
