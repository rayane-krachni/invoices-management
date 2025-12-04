import React, { useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PDFViewer } from "@react-pdf/renderer";
import { InvoicePDF } from "./invoicePDF";

interface ViewInvoiceModalProps {
  isOpen: boolean;
  invoice: any | null;
  onClose: () => void;
}

const ViewInvoiceModal: React.FC<ViewInvoiceModalProps> = ({ isOpen, invoice, onClose }) => {
  if (!isOpen || !invoice) return null;

  const [hideLogo, setHideLogo] = useState(false);

  // Memoize PDF document to prevent unnecessary re-renders
  const pdfDocument = useMemo(
    () => <InvoicePDF invoice={invoice} hideLogo={hideLogo} />,
    [invoice, hideLogo]
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">
          Détails de la facture
        </h2>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="hideLogo"
            checked={hideLogo}
            onChange={(e) => setHideLogo(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="hideLogo" className="text-gray-700">
            Masquer le logo
          </label>
        </div>

        <div style={{ width: "100%", height: "80vh" }}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            {pdfDocument}
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
