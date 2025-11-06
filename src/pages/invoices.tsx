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
import { FaEye, FaFileInvoice, FaTrash } from "react-icons/fa";
import { AddInvoiceModal } from "./Invoices/add-invoice";
import { deleteInvoiceServerFn, loadInvoicesServerFn } from "@/server/invoices-fn";
import { set } from "zod";
import ViewInvoiceModal from "./Invoices/view-invoice";
import { toast } from "sonner";

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
}

const InvoicesPage: React.FC = () => {
    const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
    const [viewInvoiceModal, setViewInvoiceModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState<InvoiceModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const data = await loadInvoicesServerFn();
            console.log("Fetched invoices:", data);
            const normalizedInvoices = data.map((inv: any, index: number) => ({
                id: inv.invoice.id,
                invoiceNumber: (index + 1).toString(),
                invoiceType: inv.invoice.invoiceType ?? "Facture",
                client: inv.client ?? { fullName: "Unknown" },
                fournisseur: inv.fournisseur ?? { fullName: "Unknown" },
                date: inv.invoice.updatedAt ? new Date(inv.invoice.createdAt).toLocaleDateString() : "No date",
                paymentMode: inv.invoice.paymentMode ?? "Cash",
                totalHT: inv.invoice.totalHT?.toString() ?? "0",
                totalTVA: inv.invoice.totalTVA?.toString() ?? "0",
                totalTTC: inv.invoice.totalTTC?.toString() ?? "0",
                discountAmount: inv.discountAmount?.toString() ?? "0",
                chauffeurName: inv.invoice?.chauffeurName ?? "",
                chauffeurPhone: inv.invoice?.chauffeurPhone ?? "",
                transportLicense: inv.invoice?.transportLicense ?? "",
                items: inv.items ?? [],
            }));
            setInvoices(normalizedInvoices);
        } catch (err) {
            console.error("Failed to fetch invoices", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette facture ?");
        if (!confirmDelete) return;

        setDeletingId(id);
        try {
            const result = await deleteInvoiceServerFn({
                data: { id }, // ✅ Correct syntax
            });

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


    const handleView = (invoice: any) => {
        console.log("Voir la facture :", invoice);
        setSelectedInvoice(invoice);
        setViewInvoiceModal(true);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-xl font-bold">Liste des factures</h1>

                <div className="flex flex-row gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Rechercher une facture..."
                        className="border placeholder:text-xs rounded px-3 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <Button
                        variant="outline"
                        className="w-full md:w-auto py-3 font-bold bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2"
                        onClick={() => setOpenInvoiceModal(true)}
                    >
                        <FaFileInvoice /> Créer une facture
                    </Button>
                </div>
            </div>

            {loading ? (
                <p>Chargement des factures...</p>
            ) : (
                <Table className="border rounded-lg overflow-hidden shadow-md">
                    <TableHeader className="bg-purple-50">
                        <TableRow>
                            <TableHead>ID</TableHead>
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
                        {invoices.map((inv, index) => (
                            <TableRow key={inv.id} className="hover:bg-purple-50 transition-colors">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{inv.date}</TableCell>
                                <TableCell>{inv.invoiceType}</TableCell>
                                <TableCell>{inv.client.fullName}</TableCell>
                                <TableCell>{inv.fournisseur.fullName}</TableCell>
                                <TableCell>{inv.items.length}</TableCell>
                                <TableCell>{inv.totalHT}</TableCell>
                                <TableCell>{inv.totalTVA}</TableCell>
                                <TableCell>{inv.totalTTC}</TableCell>
                                <TableCell>{inv.discountAmount}</TableCell>
                                <TableCell>{inv.chauffeurName}</TableCell>
                                <TableCell>{inv.chauffeurPhone}</TableCell>
                                <TableCell>{inv.transportLicense}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => handleView(inv)}>
                                            <FaEye />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(inv.id)}>
                                            <FaTrash />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <AddInvoiceModal
                isOpen={openInvoiceModal}
                onClose={() => {
                    setOpenInvoiceModal(false);
                    fetchInvoices(); // Refresh after creating a new invoice
                }}
            />
            {selectedInvoice && (
                <ViewInvoiceModal
                    isOpen={viewInvoiceModal}
                    invoice={selectedInvoice}
                    onClose={() => setViewInvoiceModal(false)}
                />
            )}
        </div>
    );
};

export default InvoicesPage;
