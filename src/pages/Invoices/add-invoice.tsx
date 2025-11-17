import React, { useMemo, useState, useEffect } from "react";
import { FaTimes, FaTrash, FaSearch } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { loadClientsServerFn } from "@/server/client-fn";
import { loadFournisseursServerFn } from "@/server/fourniseur-fn";
import { loadProductsServerFn } from "@/server/product-fn";
import { createInvoiceServerFn } from "@/server/invoices-fn";
import { NewInvoice, NewInvoiceItem } from "@/db/schema";
import { Divide } from "lucide-react";

export interface InvoiceLineItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
}

export interface InvoiceCreateModel {
  clientId: string;
  fournisseurId?: string;
  invoiceNumber?: string;
  invoiceType?: string;
  date: string;
  dueDate?: string;
  currency: string;
  items: InvoiceLineItem[];
  discountAmount?: number; // remise (montant)
  chauffeurName?: string;
  chauffeurPhone?: string;
  transportLicense?: string;
  paymentMode?: string;
}

const uid = (prefix = "") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
const TIMBRE_AMOUNT = 0.6;

/* ---------- Calculs ---------- */
const calculateLineTotal = (item: InvoiceLineItem) => {
  const base = item.quantity * item.unitPrice;
  const tax = item.taxRate ? (base * item.taxRate) / 100 : 0;
  return { base, tax, total: base + tax };
};

const calculateInvoiceTotals = (invoice: InvoiceCreateModel) => {
  const lines = invoice.items.map(calculateLineTotal);
  const totalHT = lines.reduce((s, l) => s + l.base, 0);
  const totalTVA = lines.reduce((s, l) => s + l.tax, 0);
  const discount = invoice.discountAmount ?? 0;
  const timbre = 0;
  const totalTTC = Math.max(0, totalHT + totalTVA + timbre - discount);
  return { totalHT, totalTVA, discount, timbre, totalTTC };
};

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({ isOpen, onClose }) => {
  const [model, setModel] = useState<InvoiceCreateModel>({
    clientId: "",
    fournisseurId: "",
    invoiceNumber: "",
    invoiceType: "",
    date: new Date().toISOString().slice(0, 10),
    currency: "DZD",
    items: [],
    discountAmount: 0,
    paymentMode: "Cheque"
  });

  const [clients, setClients] = useState<{ id: string; fullName: string }[]>([]);
  const [fournisseurs, setFournisseurs] = useState<{ id: string; fullName: string }[]>([]);
  const [products, setProducts] = useState<{ id: string; description: string; unitPrice: number; taxRate?: number }[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [fournisseurSearch, setFournisseurSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const totals = useMemo(() => calculateInvoiceTotals(model), [model]);

  const updateField = <K extends keyof InvoiceCreateModel>(key: K, value: InvoiceCreateModel[K]) =>
    setModel((m) => ({ ...m, [key]: value }));

  const addItem = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setModel((m) => ({
      ...m,
      items: [
        ...m.items,
        {
          id: uid("itm_"),
          productId: product.id,
          description: product.description,
          quantity: 1,
          unitPrice: product.unitPrice,
          taxRate: product.taxRate ?? 0,
        },
      ],
    }));
  };

  const updateItemQuantity = (id: string, quantity: number) =>
    setModel((m) => ({
      ...m,
      items: m.items.map((it) => (it.id === id ? { ...it, quantity } : it)),
    }));

  const removeItem = (id: string) =>
    setModel((m) => ({ ...m, items: m.items.filter((it) => it.id !== id) }));

  /* ---------- Mutation création facture ---------- */
  const createInvoiceMutation = useMutation({
    fn: async (data: InvoiceCreateModel) => {
      const totalsCalc = calculateInvoiceTotals(data);

      const invoiceData: NewInvoice = {
        clientId: data.clientId,
        fournisseurId: data.fournisseurId || "",
        invoiceNumber: data.invoiceNumber?.trim() || `FACT-${Date.now()}`,
        invoiceType: data.invoiceType ?? "Facture",
        paymentMode: "DZD",
        totalHT: totalsCalc.totalHT.toFixed(2),
        totalTVA: totalsCalc.totalTVA.toFixed(2),
        totalTTC: totalsCalc.totalTTC.toFixed(2),
        discountAmount: (totalsCalc.discount ?? 0).toFixed(2),
        chauffeurName: data.chauffeurName ?? "",
        chauffeurPhone: data.chauffeurPhone ?? "",
        transportLicense: data.transportLicense ?? "",
      };

      const itemsData: Omit<NewInvoiceItem, "invoiceId">[] = data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate?.toString() ?? "0",
      }));

      return createInvoiceServerFn({ data: { ...invoiceData, items: itemsData } });
    },
    onSuccess: () => {
      alert("Facture créée avec succès !");
      onClose();
    },
    onFailure: (ctx) => {
      console.error("Erreur création facture:", ctx.error?.message ?? ctx);
    },
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const clientsData = await loadClientsServerFn();
        setClients(clientsData.map((c: any) => ({ id: c.id, fullName: c.fullName })));

        const fournisseursData = await loadFournisseursServerFn();
        setFournisseurs(fournisseursData.map((f: any) => ({ id: f.id, fullName: f.fullName })));

        const productsData = await loadProductsServerFn();
        setProducts(
          productsData.map((p: any) => ({
            id: p.id,
            description: p.name ?? p.code ?? "Produit inconnu",
            unitPrice: Number(p.price) ?? 0,
            taxRate: Number(p.tva) ?? 0,
          }))
        );
      } catch (err) {
        console.error("Erreur chargement données:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!isOpen) return null;

  const filteredClients = clients.filter((c) =>
    c.fullName.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const filteredFournisseurs = fournisseurs.filter((f) =>
    f.fullName.toLowerCase().includes(fournisseurSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Créer une facture</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createInvoiceMutation.mutate(model);
            }}
            className="space-y-5"
          >             <h1 className="text-blue-600 font-bold text-2Xl">Details du facture</h1>
            <div className="border border-2"/>
            {/* Invoice metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


              {/* <div>
                <label className="block font-medium">Mode de paiment</label>
                <select
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={model.paymentMode}
                  onChange={(e) => updateField("paymentMode", e.target.value)}
                >
                  <option value="">Sélectionner le mode de paiement</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Other">Other</option>
                </select>
              </div> */}
            </div>

            {/* Client & Fournisseur with search */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div >
                <label className="block font-medium">Type de facture</label>
                <select
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={model.invoiceType}
                  onChange={(e) => updateField("invoiceType", e.target.value)}
                >
                  <option value="">Sélectionner le type</option>
                  <option value="Facture">Facture</option>
                  <option value="Facture Proforma">Facture Proforma</option>
                  <option value="Bon de Livraison">Bon de Livraison</option>
                  <option value="Bon de Transfert">Bon de Transfert</option>
                </select>
              </div>
             <div >
                <label className="block font-medium">Client</label>
                <div className="relative">
                  <FaSearch className="absolute left-2 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un client..."
                    className="pl-8 border rounded w-full py-1 text-sm mb-2"
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                  />
                </div>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={model.clientId}
                  onChange={(e) => updateField("clientId", e.target.value)}
                  required
                >
                  <option value="">Sélectionner un client</option>
                  {filteredClients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div >
                <label className="block font-medium">Fournisseur</label>
                <div className="relative">
                  <FaSearch className="absolute left-2 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un fournisseur..."
                    className="pl-8 border rounded w-full py-1 text-sm mb-2"
                    value={fournisseurSearch}
                    onChange={(e) => setFournisseurSearch(e.target.value)}
                  />
                </div>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={model.fournisseurId}
                  onChange={(e) => updateField("fournisseurId", e.target.value)}
                >
                  <option value="">Sélectionner un fournisseur</option>
                  {filteredFournisseurs.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.fullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h1 className="text-blue-600 font-bold text-2Xl">Chauffeur & Transport</h1>
            <div className="border border-2"/>

            {/* Chauffeur & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium">Nom du chauffeur</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1"
                  placeholder="Entrer le nom de chauffeur"
                  value={model.chauffeurName || ""}
                  onChange={(e) => updateField("chauffeurName", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Téléphone du chauffeur</label>
                <input
                  type="tel"
                   placeholder="Entrer le numero de chauffeur"
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={model.chauffeurPhone || ""}
                  onChange={(e) => updateField("chauffeurPhone", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium">Plaque du transport</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-2 py-1"
                  value={model.transportLicense || ""}
                  placeholder="Entrer la plaque de transport"
                  onChange={(e) => updateField("transportLicense", e.target.value)}
                />
              </div>
            </div>

             <h1 className="text-blue-600 font-bold text-2Xl">Produits</h1>
            <div className="border border-2"/>

            {/* Articles */}
            <fieldset className="border rounded p-4">
              <legend className="font-semibold text-blue-700">Articles</legend>

              <div className="mb-3">
                <select
                  className="border rounded px-2 py-1 w-full"
                  onChange={(e) => {
                    addItem(e.target.value);
                    (e.target as HTMLSelectElement).value = "";
                  }}
                  defaultValue=""
                >
                  <option value="">Ajouter un article</option>
                  {products.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.description} — {i.unitPrice.toFixed(2)} {model.currency} (TVA {i.taxRate ?? 0}%)
                    </option>
                  ))}
                </select>
              </div>

              {model.items.length === 0 && <p className="text-sm text-gray-500">Aucun article ajouté.</p>}

              {model.items.map((it) => (
                <div key={it.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 items-center mb-2">
                  <input value={it.description} disabled className="border rounded px-2 py-1 w-full bg-gray-100" />
                  <input
                    type="number"
                    min={0}
                    value={it.quantity}
                    onChange={(e) => updateItemQuantity(it.id, Number(e.target.value))}
                    className="border rounded px-2 py-1"
                  />
                  <input value={it.unitPrice.toFixed(2)} disabled className="border rounded px-2 py-1 bg-gray-100" />
                  <input value={it.taxRate?.toFixed(2) ?? "0"} disabled className="border rounded px-2 py-1 bg-gray-100" />
                  <button type="button" onClick={() => removeItem(it.id)} className="text-red-600 hover:text-red-800 text-lg">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </fieldset>

            {/* Discount + Totals */}
            <div className="flex flex-col justify-end items-end">


              <div className="flex flex-row justify-between gap-3  text-right space-y-1">
                <p><strong>Total Net HT:</strong> {totals.totalHT.toFixed(2)} {model.currency}</p>
                <p><strong>Total TVA:</strong> {totals.totalTVA.toFixed(2)} {model.currency}</p>
                
              </div>

              <div className="flex flex-row justify-between gap-3 text-right space-y-1">
              
                <p className="font-bold text-lg text-blue-700">
                  <strong>Total TTC:</strong> {totals.totalTTC.toFixed(2)} {model.currency}
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createInvoiceMutation.status === "pending"}
                className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700"
              >

                {createInvoiceMutation.status === "pending" ? "Création..." : "Créer la facture"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddInvoiceModal;
