import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { Product, NewProduct } from "@/db/schema";
import { createProductServerFn } from "@/server/product-fn";
import { toast } from "sonner";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

// ✅ Define ProductCreateModel by omitting auto-generated fields
type ProductCreateModel = Omit<NewProduct, "id" | "createdAt" | "updatedAt">;

export const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose ,onCreate}) => {
  const [model, setModel] = useState<ProductCreateModel>({
    code: "",
    name: "",
    price: "0",
    tva: "0",
  });

  // ✅ Mutation hook for product creation
  const createProductMutation = useMutation<
    ProductCreateModel,
    { success: true; product: Product },
    Error
  >({
    fn: async (data) => {
      const result = await createProductServerFn({ data }); // Call server function
      return result;
    },
    onSuccess: ({ data }) => {
      toast.success("Produit créé avec succès !");
      console.log("Created product:", data.product);
      onCreate();
      onClose();
    },
    onFailure: ({ error }) => {
      toast.error("Échec de la création du produit : ");
    },
  });

  const updateField = <K extends keyof ProductCreateModel>(
    key: K,
    value: ProductCreateModel[K]
  ) => setModel((m) => ({ ...m, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProductMutation.mutate(model);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Créer un produit</h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Code */}
            <div>
              <label className="block font-medium">Code produit *</label>
              <input
                type="text"
                value={model.code}
                onChange={(e) => updateField("code", e.target.value)}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block font-medium">Nom du produit *</label>
              <input
                type="text"
                value={model.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium">Prix *</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={model.price}
                onChange={(e) => updateField("price", e.target.value)}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            {/* TVA */}
            <div>
              <label className="block font-medium">TVA (%) *</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={model.tva}
                onChange={(e) => updateField("tva", e.target.value)}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={createProductMutation.status === "pending"}
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto"
          >
            {createProductMutation.status === "pending"
              ? "Création..."
              : "Créer le produit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
