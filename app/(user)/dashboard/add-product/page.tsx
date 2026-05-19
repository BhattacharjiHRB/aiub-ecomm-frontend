"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosPost } from "@/lib/axios";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "smartphones",
  "laptops",
  "electronics",
  "sneakers",
  "footwear",
  "clothing",
  "accessories",
  "other",
];

interface FormState {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}

const initialForm: FormState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
};

export default function AddProductPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(initialForm);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategory = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
    setErrors((prev) => ({ ...prev, category: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const combined = [...images, ...files].slice(0, 4); // max 4 images
    setImages(combined);

    const newPreviews = combined.map((f) => URL.createObjectURL(f));
    setPreviews(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      newErrors.stock = "Enter a valid stock quantity.";
    if (!form.category) newErrors.category = "Please select a category.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      images.forEach((img) => formData.append("images", img));

      await axiosPost.post("products", formData);

      toast.success("Product added successfully");
    } catch (e) {
      console.error(e);
      toast.error("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left — Main form */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Basic Info */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-800 mb-5">
              Basic Information
            </p>
            <div className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-gray-500">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Air Jordan Retro 4"
                  className={`bg-gray-50 border-gray-200 text-sm placeholder:text-gray-300 focus-visible:ring-blue-500 ${
                    errors.name ? "border-red-400" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-gray-500">
                  Description
                </Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                  rows={4}
                  className="bg-gray-50 border-gray-200 text-sm placeholder:text-gray-300 focus-visible:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-800 mb-5">
              Pricing & Inventory
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-gray-500">
                  Price (USD) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    $
                  </span>
                  <Input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`pl-7 bg-gray-50 border-gray-200 text-sm placeholder:text-gray-300 focus-visible:ring-blue-500 ${
                      errors.price ? "border-red-400" : ""
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500">{errors.price}</p>
                )}
              </div>

              {/* Stock */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-gray-500">
                  Stock Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className={`bg-gray-50 border-gray-200 text-sm placeholder:text-gray-300 focus-visible:ring-blue-500 ${
                    errors.stock ? "border-red-400" : ""
                  }`}
                />
                {errors.stock && (
                  <p className="text-xs text-red-500">{errors.stock}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Category + Images */}
        <div className="flex flex-col gap-6">
          {/* Category */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-800 mb-5">Category</p>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-gray-500">
                Select Category <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={handleCategory} value={form.category}>
                <SelectTrigger
                  className={`bg-gray-50 border-gray-200 text-sm focus:ring-blue-500 ${
                    errors.category ? "border-red-400" : ""
                  }`}
                >
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-xs text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <p className="text-sm font-medium text-gray-800 mb-1">
              Product Images
            </p>
            <p className="text-xs text-gray-400 mb-4">Up to 4 images</p>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={src}
                      alt={`preview-${i}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-100"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white border border-gray-200 rounded-full p-0.5 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload trigger */}
            {previews.length < 4 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:border-blue-400 hover:text-blue-400 transition-colors"
              >
                <ImagePlus size={20} />
                <span className="text-xs">Click to upload</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
            <Button
              variant="ghost"
              disabled={submitting}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
