import React from "react";
import { FaTimes, FaTag, FaMoneyBillWave, FaPercent, FaBarcode, FaInfoCircle } from "react-icons/fa";
import { ProductModel } from "./update-product";

interface ViewProductModalProps {
  isOpen: boolean;
  product: ProductModel | null;
  onClose: () => void;
}

export const ViewProductModal: React.FC<ViewProductModalProps> = ({
  isOpen,
  product,
  onClose,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-blue-700 transition-colors"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">
            Détails du produit
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Consultez les informations de ce produit
          </p>
        </div>

        {/* Product Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <DetailItem icon={<FaBarcode />} label="Code produit" value={product.code} />
          <DetailItem icon={<FaTag />} label="Nom du produit" value={product.name} />
          <DetailItem
            icon={<FaMoneyBillWave />}
            label="Prix"
            value={`${product.price.toFixed(2)} €`}
          />
          <DetailItem
            icon={<FaPercent />}
            label="TVA"
            value={`${product.tva.toFixed(2)} %`}
          />
          <DetailItem icon={<FaInfoCircle />} label="ID" value={product.id} />
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-150 shadow-md"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => (
  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-sm transition">
    <div className="flex items-center gap-2 text-blue-700 font-medium mb-1">
      {icon}
      <span>{label}</span>
    </div>
    <p className="text-gray-700 font-semibold truncate">{value || "—"}</p>
  </div>
);

export default ViewProductModal;
