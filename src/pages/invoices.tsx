import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaFileInvoice, FaTrash } from "react-icons/fa";
import { AddInvoiceModal } from "./Invoices/add-invoice";
import {
  deleteInvoiceServerFn,
  loadInvoicesServerFn,
} from "@/server/invoices-fn";
import ViewInvoiceModal from "./Invoices/view-invoice";
import { toast } from "sonner";
import UpadateInvoiceModal from "./Invoices/update-invoice";

export interface InvoiceModel {
  id: string;
  invoiceNumber: string;
  invoiceType: string;
  client: any;
  fournisseur: any;
  date: string;
  paymentMode: string;
  totalHT: string;
  totalTVA: string;
  totalTTC: string;
  discountAmount: string;
  chauffeurName: string;
  chauffeurPhone: string;
  transportLicense: string;
  items: any[];
  creation: string;
  delivery: string;
  useSalePrice: boolean

}

const InvoicesPage: React.FC = () => {
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [viewInvoiceModal, setViewInvoiceModal] = useState(false);
  const [updateInvoiceModal, setOpenUpdateInvoiceModal] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModel | null>(null);
  const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await loadInvoicesServerFn();
      console.log("data", data)
      const normalizedInvoices = data.map((inv: any, index: number) => ({
        id: inv.invoice.id,
        invoiceNumber: inv.invoice.invoiceNumber,
        invoiceType: inv.invoice.invoiceType ?? "Facture",
        client: inv.client ?? { fullName: "Inconnu" },
        fournisseur: inv.fournisseur ?? { fullName: "Inconnu" },
        date: inv.invoice.createdAt
          ? new Date(inv.invoice.createdAt).toLocaleDateString()
          : "Aucune date",
        paymentMode: inv.invoice.paymentMode ?? "Espèces",
        totalHT: inv.invoice.totalHT?.toString() ?? "0",
        totalTVA: inv.invoice.totalTVA?.toString() ?? "0",
        totalTTC: inv.invoice.totalTTC?.toString() ?? "0",
        discountAmount: inv.discountAmount?.toString() ?? "0",
        chauffeurName: inv.invoice?.chauffeurName ?? "",
        chauffeurPhone: inv.invoice?.chauffeurPhone ?? "",
        transportLicense: inv.invoice?.transportLicense ?? "",
        items: inv.items ?? [],
        creation: inv.invoice.creation,
        delivery: inv.invoice.delivery,
        useSalePrice: inv.invoice.useSalePrice ?? false

      }));
      setInvoices(normalizedInvoices);
      setFilteredInvoices(normalizedInvoices);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedInvoice: InvoiceModel) => {
    console.log("Updated Invoice:", updatedInvoice);

    setInvoices((prev) =>
      prev.map((f) => (f.id === updatedInvoice.id ? updatedInvoice : f))
    );
  };
  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInvoices(invoices);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredInvoices(
        invoices.filter(
          (inv) =>
            inv.client.fullName.toLowerCase().includes(lower) ||
            inv.fournisseur.fullName.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, invoices]);

  const handleEdit = (inv: InvoiceModel) => {

    setSelectedInvoice(inv);
    setOpenUpdateInvoiceModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette facture ?"
    );
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const result = await deleteInvoiceServerFn({ data: { id } });
      if (result.success) {
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        toast.success("Facture supprimée avec succès !");
      } else {
        toast.error("Impossible de supprimer la facture.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression de la facture.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (invoice: InvoiceModel) => {
    setSelectedInvoice(invoice);
    setViewInvoiceModal(true);
  };

  return (
    <div className="flex flex-col gap-5 px-3 md:px-6 py-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          🧾 Liste des factures
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher par client ou fournisseur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
          <Button
            variant="outline"
            className="w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => setOpenInvoiceModal(true)}
          >
            <FaFileInvoice /> Créer
          </Button>
        </div>
      </div>

      {/* Table Wrapper (responsive scroll) */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-x-auto">
        {loading ? (
          <p className="text-center py-8 text-gray-500">
            Chargement des factures...
          </p>
        ) : filteredInvoices.length === 0 ? (
          <p className="text-center py-8 text-gray-500">
            Aucune facture trouvée.
          </p>
        ) : (
          <div className="min-w-[900px] md:min-w-full">
            <Table className="text-xs md:text-sm">
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead>Numero</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Total HT</TableHead>
                  <TableHead>Total TVA</TableHead>
                  <TableHead>Total TTC</TableHead>
                  <TableHead>Remise</TableHead>
                  <TableHead>Chauffeur</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Plaque</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((inv, index) => {
                  const client = typeof inv.client === "string" ? JSON.parse(inv.client) : inv.client;
                  const fournisseur = typeof inv.fournisseur === "string" ? JSON.parse(inv.fournisseur) : inv.fournisseur;

                  return (
                    <TableRow
                      key={inv.id}
                      className="hover:bg-blue-50 transition-colors"
                    >
                      <TableCell>{inv.invoiceNumber}</TableCell>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>{inv.invoiceType}</TableCell>
                      <TableCell>{client.fullName ?? client.name}</TableCell>
                      <TableCell>{fournisseur.fullName ?? fournisseur.name}</TableCell> <TableCell>{inv.items.length}</TableCell>
                      <TableCell>{inv.totalHT}</TableCell>
                      <TableCell>{inv.totalTVA}</TableCell>
                      <TableCell>{inv.totalTTC}</TableCell>
                      <TableCell>{inv.discountAmount}</TableCell>
                      <TableCell>{inv.chauffeurName}</TableCell>
                      <TableCell>{inv.chauffeurPhone}</TableCell>
                      <TableCell>{inv.transportLicense}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-100"
                            onClick={() => handleEdit(inv)}
                          >
                            <FaEdit className="text-blue-600" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(inv)}
                          >
                            <FaEye />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deletingId === inv.id}
                            onClick={() => handleDelete(inv.id)}
                          >
                            <FaTrash />
                          </Button>

                        </div>
                      </TableCell>
                    </TableRow>
                  )


                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddInvoiceModal
        isOpen={openInvoiceModal}
        onClose={() => {
          setOpenInvoiceModal(false);
          fetchInvoices();
        }}
      />
      {selectedInvoice && (
        <ViewInvoiceModal
          isOpen={viewInvoiceModal}
          invoice={selectedInvoice}
          onClose={() => setViewInvoiceModal(false)}
        />
      )}

      {(selectedInvoice && updateInvoiceModal) && (
        <UpadateInvoiceModal
          isOpen={updateInvoiceModal}
          invoice={selectedInvoice}

          onClose={() => setOpenUpdateInvoiceModal(false)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default InvoicesPage;
