"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [images, setImages] = useState<FileList | null>(null);

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image Change
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  // Submit Form
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append(
        "description",
        formData.description
      );
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);

      // Multiple Images
      if (images) {
        for (let i = 0; i < images.length; i++) {
          data.append("images", images[i]);
        }
      }

      const res = await axios.post(
        "http://localhost:3000/products",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("Product Added Successfully");

      // Reset
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });

      setImages(null);
    } catch (error) {
      console.log(error);
      alert("Failed To Add Product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8">
      <div className="mx-auto max-w-3xl">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Add Product
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Product Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <Input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <Textarea
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              {/* Price + Stock */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Price
                  </label>

                  <Input
                    type="number"
                    name="price"
                    placeholder="999"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Stock
                  </label>

                  <Input
                    type="number"
                    name="stock"
                    placeholder="100"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <Input
                  type="text"
                  name="category"
                  placeholder="Sneakers"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Images */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Images
                </label>

                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </div>

              {/* Preview */}
              {images && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from(images).map(
                    (image, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-xl border"
                      >
                        <img
                          src={URL.createObjectURL(
                            image
                          )}
                          alt="preview"
                          className="h-28 w-full object-cover"
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-black text-white hover:bg-black/90"
              >
                {loading
                  ? "Adding Product..."
                  : "Add Product"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}