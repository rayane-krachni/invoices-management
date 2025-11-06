import React from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { ClientModel } from "./update-client";

interface ViewClientModalProps {
  isOpen: boolean;
  client: ClientModel | null;
  onClose: () => void;
}

export const ViewClientModal: React.FC<ViewClientModalProps> = ({
  isOpen,
  client,
  onClose,
}) => {
  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl transition"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Header Section */}
        <div className="flex flex-col items-center mb-2">
          <FaUserCircle className="text-purple-600 text-6xl mb-2" />
          <h2 className="text-3xl font-bold text-purple-700 mb-1">Détails du Client</h2>
          <p className="text-gray-500 text-sm">Informations enregistrées dans le système</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(client)
            .filter(([key]) => key !== "id" && key !== "createdAt" && key !== "updatedAt")
            .map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="text-gray-800 text-base font-medium">
                  {value || <span className="text-gray-400 italic">Non spécifié</span>}
                </p>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-purple-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewClientModal;
