import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { updateProductServerFn } from "@/server/product-fn";
import { Product } from "@/db/schema";

export interface ProductModel {
  id: string;
  code: string;
  name: string;
  price: number;
  tva: number;
}

interface UpdateProductModalProps {
  isOpen: boolean;
  product: ProductModel | null;
  onClose: () => void;
  onUpdate: (product: ProductModel) => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  isOpen,
  product,
  onClose,
  onUpdate,
}) => {
  const [model, setModel] = useState<ProductModel | null>(null);

  useEffect(() => {
    if (product) setModel(product);
  }, [product]);


const updateProductMutation = useMutation<
  ProductModel & { id: string },
  { success: true; product: ProductModel },
  Error
>({
  fn: (data) =>
    updateProductServerFn({
      data: {
        id: data.id,
        formData: {
          code: data.code,
          name: data.name,
          price: data.price,
          tva: data.tva,
        },
      },
    }).then((res) => ({
      success: res.success,
      product: {
        ...res.product,
        price: Number(res.product.price), // convert string to number
        tva: Number(res.product.tva),     // convert string to number
      },
    })),
  onSuccess: ({ data }) => {
    alert("Produit mis à jour avec succès!");
    onUpdate(data.product);
    onClose();
  },
  onFailure: ({ error }) => {
    alert("Échec de la mise à jour du produit: " + error.message);
  },
});




  const updateField = <K extends keyof ProductModel>(key: K, value: ProductModel[K]) =>
    setModel((m) => (m ? { ...m, [key]: value } : m));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model) {
       updateProductMutation.mutate(model);
    }
  };

  if (!isOpen || !model) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-purple-700">Mettre à jour le produit</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <label className="block font-medium">Prix *</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={model.price}
                onChange={(e) => updateField("price", Number(e.target.value))}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>

            <div>
              <label className="block font-medium">TVA (%) *</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={model.tva}
                onChange={(e) => updateField("tva", Number(e.target.value))}
                required
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <button
            type="submit"
         
            className="bg-purple-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-purple-700 w-full md:w-auto"
          >
            {updateProductMutation.status === "pending" ? "Mise à jour..." : "Mettre à jour le produit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
