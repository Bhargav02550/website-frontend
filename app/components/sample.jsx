"use client"
import { useState } from "react";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    pricePerKg: "",
    stock: "",
    status: "pending",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:8000/createProduct", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setMessage("Product created successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name: <input name="name" onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Category: <input name="category" onChange={handleChange} />
        </label>
        <br /><br />
        <label>
          Price per Kg: <input type="number" name="pricePerKg" onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Stock: <input type="number" name="stock" onChange={handleChange} required />
        </label>
        <br /><br />
        <label>
          Status:
          <select name="status" onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br /><br />
        <label>
          Product Image: <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
        </label>
        <br /><br />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
