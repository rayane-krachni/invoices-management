import { jsx, jsxs } from 'react/jsx-runtime';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { B as Button, C as Card, a as CardTitle, b as CardDescription, c as CardContent, d as cn } from './card-Cug-GqfU.mjs';
import { Toaster, toast } from 'sonner';
import { FaFileInvoice, FaClock, FaUsers, FaBuilding, FaProductHunt, FaEdit, FaEye, FaTrash, FaPlus, FaTimes, FaSearch, FaUserCircle, FaBarcode, FaTag, FaMoneyBillWave, FaPercent, FaInfoCircle } from 'react-icons/fa';
import { c as createSsrRpc } from './createSsrRpc-B7i2AQJQ.mjs';
import { d as db, f as fournisseurs, c as clients, i as invoices, p as products, a as invoiceItems } from './invoices-DHv8h55N.mjs';
import { eq } from 'drizzle-orm';
import { l as loadFournisseursServerFn, d as deleteFournisseurServerFn, g as generateRandomPhone, c as createFournisseurServerFn, u as updateFournisseurServerFn } from './fourniseur-fn-X4MWgdCf.mjs';
import { a as createServerFn } from '../virtual/entry.mjs';
import { PDFViewer, Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import { QueryClientProvider, QueryClient, useMutation as useMutation$1 } from '@tanstack/react-query';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'drizzle-orm/postgres-js';
import 'postgres';
import 'drizzle-orm/pg-core';
import 'zod';
import '@t3-oss/env-core';
import 'dotenv';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const logo = "/assets/logo-CN1RRHsN.jpeg";
function GlobalCard({
  children,
  title,
  description,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-cener items-center text-center", children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex justify-cener items-center text-3xl uppercase fon-bold", children: [
        /* @__PURE__ */ jsx("img", { width: 100, src: logo }),
        title
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { className: "w-full mx-auto", children: description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children })
  ] }) });
}
function MainLayout({ children, footer }) {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-svh flex-col items-start justify-start gap-6 bg-muted p-6 md:p-10", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-full flex-col gap-6", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    children,
    footer
  ] }) });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function useMutation(opts) {
  const [submittedAt, setSubmittedAt] = useState();
  const [variables, setVariables] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState("idle");
  const mutate = useCallback(
    async (variables2) => {
      setStatus("pending");
      setSubmittedAt(Date.now());
      setVariables(variables2);
      try {
        const data2 = await opts.fn(variables2);
        await opts.onSuccess?.({ data: data2 });
        setStatus("success");
        setError(void 0);
        setData(data2);
        return data2;
      } catch (err) {
        await opts.onFailure?.({ error: err });
        setStatus("error");
        setError(err);
      }
    },
    [opts.fn]
  );
  return {
    status,
    variables,
    submittedAt,
    mutate,
    error,
    data
  };
}
const createClientServerFn_createServerFn_handler = createSsrRpc("03960d6fd89b35fe9547af9de06a203cd25e2b4ca3e6a687ee664efca51f147c");
const createClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createClientServerFn_createServerFn_handler, async ({
  data
}) => {
  const clientData = {
    fullName: data.fullName,
    address: data.address,
    willaya: data.willaya,
    phone: generateRandomPhone(),
    activity: data.activity ?? "",
    art: data.art ?? "",
    nis: data.nis ?? "",
    nif: data.nif ?? "",
    rc: data.rc ?? ""
  };
  const [client] = await db.insert(clients).values(clientData).returning();
  return {
    success: true,
    client
  };
});
const loadClientsServerFn_createServerFn_handler = createSsrRpc("3350d09b92c1792aeccfa21992cd3061ac1250e4d15f30fbab96fbc07394db42");
const loadClientsServerFn = createServerFn({
  method: "GET"
}).handler(loadClientsServerFn_createServerFn_handler, async () => {
  const clientsList = await db.select().from(clients);
  return clientsList;
});
const updateClientServerFn_createServerFn_handler = createSsrRpc("50e4b59fe268685ff6bd59fa4f0d6f6733bbd8f9ff291ac95d940ac816161a00");
const updateClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateClientServerFn_createServerFn_handler, async ({
  data
}) => {
  const [client] = await db.update(clients).set(data.formData).where(eq(clients.id, data.id)).returning();
  return {
    success: true,
    client
  };
});
const deleteClientServerFn_createServerFn_handler = createSsrRpc("ab3996f6727fdd28ce1c2ddafefde0ed34b6ed2cbc7ee630d619ffc303805ea2");
const deleteClientServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteClientServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(clients).where(eq(clients.id, data.id));
  return {
    success: true
  };
});
const createProductServerFn_createServerFn_handler = createSsrRpc("4fa3baa45d7869be16c69f8d40246854d09d44738e699baa3286f584afc1ed5c");
const createProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createProductServerFn_createServerFn_handler, async ({
  data
}) => {
  const [product] = await db.insert(products).values(data).returning();
  return {
    success: true,
    product
  };
});
const loadProductsServerFn_createServerFn_handler = createSsrRpc("903184262bb2f823944dd56806106f91be7d7f32591bdcd1c5a6fb35ec2b0905");
const loadProductsServerFn = createServerFn({
  method: "GET"
}).handler(loadProductsServerFn_createServerFn_handler, async () => {
  const list = await db.select().from(products);
  return list;
});
const updateProductServerFn_createServerFn_handler = createSsrRpc("a3cfa06170e89eb25c05a6127a10c81fa8e4a04311b2df77c5b3c3929afe462c");
const updateProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateProductServerFn_createServerFn_handler, async ({
  data
}) => {
  const [product] = await db.update(products).set(data.formData).where(eq(products.id, data.id)).returning();
  return {
    success: true,
    product
  };
});
const deleteProductServerFn_createServerFn_handler = createSsrRpc("c1b5b7df71fce89fb3da837cb3c58e3542831ac803ff32a9cacdbcc3e60afa63");
const deleteProductServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteProductServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(products).where(eq(products.id, data.id));
  return {
    success: true
  };
});
const createInvoiceServerFn_createServerFn_handler = createSsrRpc("314aafe3c67b13ba2756744c451fde4d04b64f9fab9da6d47eb411383be27f9e");
const createInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  const {
    items,
    ...invoiceData
  } = data;
  const invoiceInsert = {
    ...invoiceData,
    paymentMode: invoiceData.paymentMode ?? "Cash",
    discountAmount: invoiceData.discountAmount ?? 0,
    chauffeurName: invoiceData.chauffeurName ?? "",
    chauffeurPhone: invoiceData.chauffeurPhone ?? "",
    transportLicense: invoiceData.transportLicense ?? "",
    totalHT: invoiceData.totalHT,
    totalTVA: invoiceData.totalTVA,
    totalTTC: invoiceData.totalTTC
  };
  const [invoice] = await db.insert(invoices).values(invoiceInsert).returning();
  const itemsInsert = items.map((item) => ({
    invoiceId: invoice.id,
    productId: item.productId,
    quantity: item.quantity ?? 1,
    unitPrice: item.unitPrice,
    taxRate: item.taxRate ?? 0
  }));
  const insertedItems = await db.insert(invoiceItems).values(itemsInsert).returning();
  return {
    success: true,
    invoice,
    items: insertedItems
  };
});
const loadInvoicesServerFn_createServerFn_handler = createSsrRpc("6ac854ca9a9ac93187741d9fdd48a679c392ca33ae469ad3375841518329fdc2");
const loadInvoicesServerFn = createServerFn({
  method: "GET"
}).handler(loadInvoicesServerFn_createServerFn_handler, async () => {
  const list = await db.select({
    invoice: invoices,
    client: clients,
    fournisseur: fournisseurs
  }).from(invoices).leftJoin(clients, eq(clients.id, invoices.clientId)).leftJoin(fournisseurs, eq(fournisseurs.id, invoices.fournisseurId));
  const result = await Promise.all(list.map(async (inv) => {
    const items = await db.select({
      item: invoiceItems,
      product: products
    }).from(invoiceItems).leftJoin(products, eq(products.id, invoiceItems.productId)).where(eq(invoiceItems.invoiceId, inv.invoice.id));
    return {
      ...inv,
      items
    };
  }));
  return result;
});
const updateInvoiceServerFn_createServerFn_handler = createSsrRpc("403f7bbe169b49b8d629b3f78fb87a038591bb4d12113487728047b3273f0610");
const updateInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  const {
    id,
    formData
  } = data;
  const {
    items,
    ...invoiceData
  } = formData;
  const [invoice] = await db.update(invoices).set(invoiceData).where(eq(invoices.id, id)).returning();
  if (items && items.length > 0) {
    await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    const insertedItems = await db.insert(invoiceItems).values(items.map((item) => ({
      invoiceId: id,
      productId: item.productId,
      quantity: item.quantity ?? 1,
      unitPrice: item.unitPrice.toString(),
      taxRate: item.taxRate?.toString() ?? "0"
    }))).returning();
    return {
      success: true,
      invoice,
      items: insertedItems
    };
  }
  return {
    success: true,
    invoice,
    items: []
  };
});
const deleteInvoiceServerFn_createServerFn_handler = createSsrRpc("d56cb0c945c4889ec7422fe5a78b1e7b799f29a4f93345404554b61f7a9b907c");
const deleteInvoiceServerFn = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteInvoiceServerFn_createServerFn_handler, async ({
  data
}) => {
  await db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, data.id));
  await db.delete(invoices).where(eq(invoices.id, data.id));
  return {
    success: true
  };
});
const uid$1 = (prefix = "") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
const calculateLineTotal$1 = (item) => {
  const base = item.quantity * item.unitPrice;
  const tax = item.taxRate ? base * item.taxRate / 100 : 0;
  return { base, tax, total: base + tax };
};
const calculateInvoiceTotals$1 = (invoice) => {
  const lines = invoice.items.map(calculateLineTotal$1);
  const totalHT = lines.reduce((s, l) => s + l.base, 0);
  const totalTVA = lines.reduce((s, l) => s + l.tax, 0);
  const discount = invoice.discountAmount ?? 0;
  const timbre = 0;
  const totalTTC = Math.max(0, totalHT + totalTVA + timbre - discount);
  return { totalHT, totalTVA, discount, timbre, totalTTC };
};
const AddInvoiceModal = ({ isOpen, onClose }) => {
  const [model, setModel] = useState({
    clientId: "",
    fournisseurId: "",
    clientName: "",
    fournisseurName: "",
    invoiceNumber: "",
    invoiceType: "",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    currency: "DZD",
    items: [],
    discountAmount: 0,
    paymentMode: "Cheque",
    creation: "",
    delivery: ""
  });
  const [clients2, setClients] = useState([]);
  const [fournisseurs2, setFournisseurs] = useState([]);
  const [products2, setProducts] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [fournisseurSearch, setFournisseurSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const totals = useMemo(() => calculateInvoiceTotals$1(model), [model]);
  const updateField = (key, value) => setModel((m) => ({ ...m, [key]: value }));
  const addItem = (productId) => {
    const product = products2.find((p) => p.id === productId);
    if (!product) return;
    setModel((m) => ({
      ...m,
      items: [
        ...m.items,
        {
          id: uid$1("itm_"),
          productId: product.id,
          description: product.description,
          quantity: 1,
          unitPrice: product.unitPrice,
          taxRate: product.taxRate ?? 0
        }
      ]
    }));
  };
  const updateItemQuantity = (id, quantity) => setModel((m) => ({
    ...m,
    items: m.items.map((it) => it.id === id ? { ...it, quantity } : it)
  }));
  const removeItem = (id) => setModel((m) => ({ ...m, items: m.items.filter((it) => it.id !== id) }));
  const createInvoiceMutation = useMutation({
    fn: async (data) => {
      const totalsCalc = calculateInvoiceTotals$1(data);
      const invoiceData = {
        clientId: data.clientId,
        fournisseurId: data.fournisseurId || "",
        invoiceNumber: data.invoiceNumber?.trim() || `FACT-${Date.now()}`,
        invoiceType: data.invoiceType ?? "Facture",
        paymentMode: data.paymentMode ?? "cheque",
        totalHT: totalsCalc.totalHT.toFixed(2),
        totalTVA: totalsCalc.totalTVA.toFixed(2),
        totalTTC: totalsCalc.totalTTC.toFixed(2),
        discountAmount: (totalsCalc.discount ?? 0).toFixed(2),
        chauffeurName: data.chauffeurName ?? "",
        chauffeurPhone: data.chauffeurPhone ?? "",
        transportLicense: data.transportLicense ?? "",
        creation: data.creation,
        delivery: data.delivery
      };
      const itemsData = data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate?.toString() ?? "0"
      }));
      return createInvoiceServerFn({ data: { ...invoiceData, items: itemsData } });
    },
    onSuccess: () => {
      alert("Facture cr\xE9\xE9e avec succ\xE8s !");
      onClose();
    },
    onFailure: (ctx) => {
      console.error("Erreur cr\xE9ation facture:", ctx.error?.message ?? ctx);
    }
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const clientsData = await loadClientsServerFn();
        setClients(clientsData.map((c) => ({ id: c.id, fullName: c.fullName })));
        const fournisseursData = await loadFournisseursServerFn();
        setFournisseurs(fournisseursData.map((f) => ({ id: f.id, fullName: f.fullName })));
        const productsData = await loadProductsServerFn();
        setProducts(
          productsData.map((p) => ({
            id: p.id,
            description: p.name ?? p.code ?? "Produit inconnu",
            unitPrice: Number(p.price) ?? 0,
            taxRate: Number(p.tva) ?? 0
          }))
        );
      } catch (err) {
        console.error("Erreur chargement donn\xE9es:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (!isOpen) return null;
  const filteredClients = clients2.filter(
    (c) => c.fullName.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const filteredFournisseurs = fournisseurs2.filter(
    (f) => f.fullName.toLowerCase().includes(fournisseurSearch.toLowerCase())
  );
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx("button", { className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl", onClick: onClose, children: /* @__PURE__ */ jsx(FaTimes, {}) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Cr\xE9er une facture" }),
    loading ? /* @__PURE__ */ jsx("p", { children: "Chargement..." }) : /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          createInvoiceMutation.mutate(model);
        },
        className: "space-y-5",
        children: [
          "             ",
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Details du facture" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Num de facture" }),
            /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Entrer le num de facture",
                className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                value: model.invoiceNumber,
                onChange: (e) => updateField("invoiceNumber", e.target.value)
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Mode de paiment" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.paymentMode,
                  onChange: (e) => updateField("paymentMode", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner le mode de paiement" }),
                    /* @__PURE__ */ jsx("option", { value: "virement", children: "Virement" }),
                    /* @__PURE__ */ jsx("option", { value: "Cheque", children: "Ch\xE8que" }),
                    /* @__PURE__ */ jsx("option", { value: "esp\xE8ces", children: "Esp\xE8ces" }),
                    /* @__PURE__ */ jsx("option", { value: "a_term", children: "\xC0 terme" }),
                    /* @__PURE__ */ jsx("option", { value: "a_term_3", children: "\xC0 terme (3 mois)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Date de creation" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Entrer la date de creation dd/mm/yyyy",
                  className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                  value: model.creation,
                  onChange: (e) => updateField("creation", e.target.value)
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Date de livraison" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Entrer la date de livraison dd/mm/yyyy",
                  className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                  value: model.delivery,
                  onChange: (e) => updateField("delivery", e.target.value)
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Type de facture" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.invoiceType,
                  onChange: (e) => updateField("invoiceType", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner le type" }),
                    /* @__PURE__ */ jsx("option", { value: "Facture", children: "Facture" }),
                    /* @__PURE__ */ jsx("option", { value: "Facture Proforma", children: "Facture Proforma" }),
                    /* @__PURE__ */ jsx("option", { value: "Bon de Livraison", children: "Bon de Livraison" }),
                    /* @__PURE__ */ jsx("option", { value: "Bon de Transfert", children: "Bon de Transfert" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Client" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-2 top-3 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Rechercher un client...",
                    className: "pl-8 border rounded w-full py-1 text-sm mb-2",
                    value: clientSearch,
                    onChange: (e) => setClientSearch(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border rounded px-2 py-1",
                  value: model.clientId,
                  onChange: (e) => updateField("clientId", e.target.value),
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner un client" }),
                    filteredClients.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.fullName }, c.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Fournisseur" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-2 top-3 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Rechercher un fournisseur...",
                    className: "pl-8 border rounded w-full py-1 text-sm mb-2",
                    value: fournisseurSearch,
                    onChange: (e) => setFournisseurSearch(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border rounded px-2 py-1",
                  value: model.fournisseurId,
                  onChange: (e) => updateField("fournisseurId", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner un fournisseur" }),
                    filteredFournisseurs.map((f) => /* @__PURE__ */ jsx("option", { value: f.id, children: f.fullName }, f.id))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Chauffeur & Transport" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom du chauffeur" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  placeholder: "Entrer le nom de chauffeur",
                  value: model.chauffeurName || "",
                  onChange: (e) => updateField("chauffeurName", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "T\xE9l\xE9phone du chauffeur" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  placeholder: "Entrer le numero de chauffeur",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.chauffeurPhone || "",
                  onChange: (e) => updateField("chauffeurPhone", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Plaque du transport" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.transportLicense || "",
                  placeholder: "Entrer la plaque de transport",
                  onChange: (e) => updateField("transportLicense", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Produits" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsxs("fieldset", { className: "border rounded p-4", children: [
            /* @__PURE__ */ jsx("legend", { className: "font-semibold text-blue-700", children: "Articles" }),
            /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border rounded px-2 py-1 w-full",
                onChange: (e) => {
                  addItem(e.target.value);
                  e.target.value = "";
                },
                defaultValue: "",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Ajouter un article" }),
                  products2.map((i) => /* @__PURE__ */ jsxs("option", { value: i.id, children: [
                    i.description,
                    " \u2014 ",
                    i.unitPrice.toFixed(2),
                    " ",
                    model.currency,
                    " (TVA ",
                    i.taxRate ?? 0,
                    "%)"
                  ] }, i.id))
                ]
              }
            ) }),
            model.items.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Aucun article ajout\xE9." }),
            model.items.map((it) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 items-center mb-2", children: [
              /* @__PURE__ */ jsx("input", { value: it.description, disabled: true, className: "border rounded px-2 py-1 w-full bg-gray-100" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: 0,
                  value: it.quantity,
                  onChange: (e) => updateItemQuantity(it.id, Number(e.target.value)),
                  className: "border rounded px-2 py-1"
                }
              ),
              /* @__PURE__ */ jsx("input", { value: it.unitPrice.toFixed(2), disabled: true, className: "border rounded px-2 py-1 bg-gray-100" }),
              /* @__PURE__ */ jsx("input", { value: it.taxRate?.toFixed(2) ?? "0", disabled: true, className: "border rounded px-2 py-1 bg-gray-100" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeItem(it.id), className: "text-red-600 hover:text-red-800 text-lg", children: /* @__PURE__ */ jsx(FaTrash, {}) })
            ] }, it.id))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between gap-3  text-right space-y-1", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Total Net HT:" }),
                " ",
                totals.totalHT.toFixed(2),
                " ",
                model.currency
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Total TVA:" }),
                " ",
                totals.totalTVA.toFixed(2),
                " ",
                model.currency
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-between gap-3 text-right space-y-1", children: /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg text-blue-700", children: [
              /* @__PURE__ */ jsx("strong", { children: "Total TTC:" }),
              " ",
              totals.totalTTC.toFixed(2),
              " ",
              model.currency
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: createInvoiceMutation.status === "pending",
              className: "bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700",
              children: createInvoiceMutation.status === "pending" ? "Cr\xE9ation..." : "Cr\xE9er la facture"
            }
          ) })
        ]
      }
    )
  ] }) });
};
const logoBase64 = logo;
const UNITS = [
  "z\xE9ro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf"
];
const TEENS = [
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
  "dix-sept",
  "dix-huit",
  "dix-neuf"
];
const TENS = [
  "",
  "",
  "vingt",
  "trente",
  "quarante",
  "cinquante",
  "soixante",
  "soixante",
  "quatre-vingt",
  "quatre-vingt"
];
function numberBelow100(n) {
  if (n < 10) return UNITS[n];
  if (n < 20) return TEENS[n - 10];
  const ten = Math.floor(n / 10);
  let unit = n % 10;
  let base = TENS[ten];
  if (ten === 7 || ten === 9) {
    unit += 10;
  }
  if (unit === 0) return base;
  if (unit === 1 && ten !== 8) return base + "-et-un";
  return base + "-" + numberBelow100(unit);
}
function numberBelow1000(n) {
  if (n < 100) return numberBelow100(n);
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  let result = "";
  if (hundreds === 1) result = "cent";
  else result = UNITS[hundreds] + " cent";
  if (rest === 0) return result;
  return result + " " + numberBelow100(rest);
}
function numberToFrench(n) {
  if (n < 1e3) return numberBelow1000(n);
  if (n < 1e6) {
    const thousands = Math.floor(n / 1e3);
    const rest = n % 1e3;
    const thousandWord = thousands === 1 ? "mille" : numberBelow1000(thousands) + " mille";
    return rest === 0 ? thousandWord : thousandWord + " " + numberBelow1000(rest);
  }
  if (n < 1e9) {
    const millions = Math.floor(n / 1e6);
    const rest = n % 1e6;
    const millionWord = millions === 1 ? "un million" : numberBelow1000(millions) + " millions";
    return rest === 0 ? millionWord : millionWord + " " + numberToFrench(rest);
  }
  return n.toString();
}
function amountToFrenchWords(amount) {
  const num = Number(amount) || 0;
  const integerPart = Math.floor(num);
  const decimalPart = Math.round((num - integerPart) * 100);
  if (decimalPart === 0)
    return `${numberToFrench(integerPart)} dinars alg\xE9riens`;
  return `${numberToFrench(integerPart)} dinars et ${numberToFrench(decimalPart)} centimes`;
}
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    padding: 30,
    backgroundColor: "#ffffff"
  },
  // Header Section
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#4A5568"
  },
  logoSection: {
    flexDirection: "column"
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2D3748"
  },
  companyTagline: {
    fontSize: 9,
    color: "#000000ff",
    marginTop: 2
  },
  companyTaglinebold: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000000ff",
    marginTop: 2
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  qrText: {
    fontSize: 6,
    color: "#CBD5E0"
  },
  // Title
  documentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#2D3748"
  },
  // Info Bar
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F7FAFC",
    padding: 10,
    marginBottom: 5,
    borderLeftWidth: 3,
    borderLeftColor: "#4A5568"
  },
  infoItem: {
    flexDirection: "column"
  },
  infoLabel: {
    fontSize: 7,
    color: "#1d1e1eff",
    textTransform: "uppercase",
    marginBottom: 2
  },
  infoValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#000000ff"
  },
  statusBadge: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 8,
    fontWeight: "bold"
  },
  // Parties Section
  partiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  partyBox: {
    width: "48%",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 5
  },
  partyTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#030303ff",
    marginBottom: 8,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E0"
  },
  partyRow: {
    flexDirection: "row",
    marginBottom: 4
  },
  partyLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#000000ff",
    width: "35%"
  },
  partyValue: {
    fontSize: 8,
    color: "#000000ff",
    width: "65%"
  },
  // Delivery Info
  deliveryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EDF2F7",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5
  },
  deliveryItem: {
    flexDirection: "column"
  },
  deliveryLabel: {
    fontSize: 9,
    color: "#000000ff",
    fontWeight: "bold"
  },
  deliveryValue: {
    fontSize: 10,
    fontWeight: "normal",
    color: "#3b3b3bff"
  },
  // Section Title
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 5,
    marginBottom: 5,
    paddingBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  // Table
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 1,
    marginBottom: 1
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EDF2F7",
    color: "#FFFFFF"
  },
  tableHeaderCell: {
    padding: 3,
    fontSize: 8,
    fontWeight: "bold",
    color: "#0b0b0bff",
    textTransform: "uppercase",
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0"
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  tableCell: {
    padding: 2,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0"
  },
  // Column widths
  colCode: { width: "10%" },
  colProduct: { width: "30%" },
  colDescription: { width: "25%" },
  colQty: { width: "10%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "center" },
  colTax: { width: "10%", textAlign: "center" },
  colTotalHT: { width: "20%", textAlign: "center", borderRightWidth: 0 },
  // Totals Section
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 4
  },
  totalsBox: {
    width: "45%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden"
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0"
  },
  totalLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#4A5568"
  },
  totalValue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#2D3748"
  },
  totalFinalRow: {
    backgroundColor: "#EDF2F7",
    borderBottomWidth: 0
  },
  totalFinalLabel: {
    color: "#000000ff",
    fontSize: 9,
    fontWeight: "bold"
  },
  totalFinalValue: {
    color: "#000000ff",
    fontSize: 9,
    fontWeight: "bold"
  },
  totalWords: {
    padding: 5,
    textAlign: "center",
    fontSize: 8,
    fontStyle: "italic",
    color: "#000000ff"
  },
  // Notes Section
  notesSection: {
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 5,
    padding: 12,
    marginTop: 15
  },
  notesTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#92400E",
    marginBottom: 6
  },
  notesContent: {
    fontSize: 8,
    color: "#78350F",
    lineHeight: 1.4
  },
  // Signature Section
  signatureSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  signatureBox: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#CBD5E0",
    borderStyle: "dashed",
    padding: 12,
    borderRadius: 5,
    minHeight: 70,
    alignItems: "center"
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: 15
  },
  letterTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#4A5568"
  },
  signatureLine: {
    width: "80%",
    borderTopWidth: 1,
    borderTopColor: "#2D3748",
    paddingTop: 5,
    textAlign: "center"
  },
  signatureDate: {
    fontSize: 7,
    color: "#718096"
  },
  // Footer
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center"
  },
  footerText: {
    fontSize: 7,
    color: "#718096",
    textAlign: "center",
    marginBottom: 2
  },
  footerBold: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#4A5568",
    marginBottom: 2
  }
});
const getPaymentMode = (mode) => {
  switch (mode) {
    case "virement":
      return "Virement";
    case "Cheque":
      return "Ch\xE8que";
    case "esp\xE8ces":
      return "Esp\xE8ces";
    case "a_term":
      return "\xC0 terme";
    case "a_term_3":
      return "\xC0 terme (3 mois)";
    default:
      return "Ch\xE8que";
  }
};
const InvoicePDF = ({ invoice, hideLogo }) => {
  return /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsxs(View, { style: styles.headerContainer, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.logoSection, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.companyName, children: invoice.fournisseur?.fullName || "Nom de l'entreprise" }),
        /* @__PURE__ */ jsx(Text, { style: styles.companyTagline, children: invoice.fournisseur?.activity || "Commerce de d\xE9tail" }),
        /* @__PURE__ */ jsxs(Text, { style: styles.companyTaglinebold, children: [
          "Au CAPITAL SOCIAL DE  ",
          invoice.fournisseur?.capital
        ] })
      ] }),
      /* @__PURE__ */ jsx(View, { children: /* @__PURE__ */ jsx(
        Image,
        {
          src: !hideLogo ? logoBase64 : "",
          style: { width: 80, height: 80, objectFit: "cover" }
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Text, { style: styles.documentTitle, children: invoice.invoiceType || "BON DE LIVRAISON" }),
    /* @__PURE__ */ jsxs(View, { style: styles.infoBar, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.infoItem, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.infoLabel, children: "Num\xE9ro de Facture" }),
        /* @__PURE__ */ jsx(Text, { style: styles.infoValue, children: invoice.invoiceNumber })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.infoItem, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.infoLabel, children: "Date de Facture" }),
        /* @__PURE__ */ jsx(Text, { style: styles.infoValue, children: invoice.creation })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.infoItem, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.infoLabel, children: "Date de Livraison" }),
        /* @__PURE__ */ jsx(Text, { style: styles.infoValue, children: invoice.delivery })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.infoItem, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.infoLabel, children: "Mode de Paiement" }),
        /* @__PURE__ */ jsx(Text, { style: styles.infoValue, children: getPaymentMode(invoice.paymentMode) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: styles.partiesContainer, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.partyBox, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.partyTitle, children: "FOURNISSEUR" }),
        [
          ["Nom", invoice.fournisseur?.fullName],
          ["Activit\xE9", invoice.fournisseur?.activity],
          ["Adresse", invoice.fournisseur?.address],
          ["Art", invoice.fournisseur?.art],
          ["NIS", invoice.fournisseur?.nis],
          ["NIF", invoice.fournisseur?.nif],
          ["RC", invoice.fournisseur?.rc]
        ].map(([label, value]) => /* @__PURE__ */ jsxs(View, { style: styles.partyRow, children: [
          /* @__PURE__ */ jsxs(Text, { style: styles.partyLabel, children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsx(Text, { style: styles.partyValue, children: value || "N/A" })
        ] }, label))
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.partyBox, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.partyTitle, children: "CLIENT" }),
        [
          ["Nom", invoice.client?.fullName],
          ["Activit\xE9", invoice.client?.activity],
          ["Adresse", invoice.client?.address],
          // ['Téléphone', invoice.client?.phone],
          ["Art", invoice.client?.art],
          ["NIS", invoice.client?.nis],
          ["NIF", invoice.client?.nif],
          ["RC", invoice.client?.rc]
        ].map(([label, value]) => /* @__PURE__ */ jsxs(View, { style: styles.partyRow, children: [
          /* @__PURE__ */ jsxs(Text, { style: styles.partyLabel, children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsx(Text, { style: styles.partyValue, children: value || "N/A" })
        ] }, label))
      ] })
    ] }),
    (invoice.invoiceType === "BON DE LIVRAISON" || invoice.invoiceType === "Bon de Transfert") && /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "D\xC9TAILS DE LA LIVRAISON" }),
    (invoice.invoiceType === "BON DE LIVRAISON" || invoice.invoiceType === "Bon de Transfert") && /* @__PURE__ */ jsxs(View, { style: styles.deliveryInfo, children: [
      /* @__PURE__ */ jsxs(View, { style: [styles.deliveryItem, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }], children: [
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryLabel, children: "Chauffeur:" }),
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryValue, children: invoice.chauffeurName || "-" })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: [styles.deliveryItem, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }], children: [
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryLabel, children: "T\xE9l\xE9phone:" }),
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryValue, children: invoice.chauffeurPhone || "-" })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: [styles.deliveryItem, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }], children: [
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryLabel, children: "Matricule:" }),
        /* @__PURE__ */ jsx(Text, { style: styles.deliveryValue, children: invoice.transportLicense || "-" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "D\xC9TAILS DE LA FACTURE" }),
    /* @__PURE__ */ jsxs(View, { style: { height: "auto", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ jsxs(View, { style: styles.table, children: [
        /* @__PURE__ */ jsxs(View, { style: styles.tableHeader, children: [
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colCode], children: "Code" }),
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colProduct], children: "Produit" }),
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colQty], children: "Qt\xE9" }),
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colPrice], children: "Prix Unit." }),
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colTax], children: "TVA (%)" }),
          /* @__PURE__ */ jsx(Text, { style: [styles.tableHeaderCell, styles.colTotalHT], children: "Total HT" })
        ] }),
        invoice.items?.map((item, index) => {
          const quantity = Number(item.item?.quantity || 0);
          const unitPrice = Number(item.unitPrice || item.product?.price || 0);
          const taxRate = Number(item.taxRate || item.product?.tva || 0);
          const totalHT = unitPrice * quantity;
          return /* @__PURE__ */ jsxs(View, { style: styles.tableRow, children: [
            /* @__PURE__ */ jsx(Text, { style: [styles.tableCell, styles.colCode], children: item.product?.code || `PROD-${index + 1}` }),
            /* @__PURE__ */ jsx(Text, { style: [styles.tableCell, styles.colProduct], children: item.product?.name || "Article" }),
            /* @__PURE__ */ jsx(Text, { style: [styles.tableCell, styles.colQty], children: quantity }),
            /* @__PURE__ */ jsxs(Text, { style: [styles.tableCell, styles.colPrice], children: [
              unitPrice.toFixed(2),
              " DA"
            ] }),
            /* @__PURE__ */ jsx(Text, { style: [styles.tableCell, styles.colTax], children: taxRate.toFixed(2) }),
            /* @__PURE__ */ jsxs(Text, { style: [styles.tableCell, styles.colTotalHT], children: [
              totalHT.toFixed(2),
              " DA"
            ] })
          ] }, item.id || index);
        })
      ] }),
      /* @__PURE__ */ jsx(View, { style: styles.totalsContainer, children: /* @__PURE__ */ jsxs(View, { style: styles.totalsBox, children: [
        /* @__PURE__ */ jsxs(View, { style: styles.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.totalLabel, children: "Total HT" }),
          /* @__PURE__ */ jsxs(Text, { style: styles.totalValue, children: [
            invoice.totalHT || "0.00",
            " DA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: styles.totalRow, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.totalLabel, children: "Total TVA" }),
          /* @__PURE__ */ jsxs(Text, { style: styles.totalValue, children: [
            invoice.totalTVA || "0.00",
            " DA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(View, { style: [styles.totalRow, styles.totalFinalRow], children: [
          /* @__PURE__ */ jsx(Text, { style: styles.totalFinalLabel, children: "TOTAL TTC" }),
          /* @__PURE__ */ jsxs(Text, { style: styles.totalFinalValue, children: [
            invoice.totalTTC,
            " DA"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(View, { style: styles.signatureSection, children: [
        /* @__PURE__ */ jsxs(View, { style: styles.totalWords, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.letterTitle, children: "Total en lettre" }),
          /* @__PURE__ */ jsxs(Text, { children: [
            amountToFrenchWords(invoice.totalTTC),
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsx(View, { children: /* @__PURE__ */ jsx(Text, { style: styles.signatureTitle, children: "Signature" }) })
      ] })
    ] })
  ] }) });
};
const ViewInvoiceModal = ({ isOpen, invoice, onClose }) => {
  if (!isOpen || !invoice) return null;
  const [hideLogo, setHideLogo] = useState(false);
  const pdfDocument = useMemo(
    () => /* @__PURE__ */ jsx(InvoicePDF, { invoice, hideLogo }),
    [invoice, hideLogo]
  );
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "D\xE9tails de la facture" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          id: "hideLogo",
          checked: hideLogo,
          onChange: (e) => setHideLogo(e.target.checked),
          className: "mr-2"
        }
      ),
      /* @__PURE__ */ jsx("label", { htmlFor: "hideLogo", className: "text-gray-700", children: "Masquer le logo" })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "80vh" }, children: /* @__PURE__ */ jsx(PDFViewer, { style: { width: "100%", height: "100%" }, children: pdfDocument }) })
  ] }) });
};
const uid = (prefix = "") => `${prefix}${Math.random().toString(36).slice(2, 9)}`;
const calculateLineTotal = (item) => {
  const base = item.quantity * item.unitPrice;
  const tax = item.taxRate ? base * item.taxRate / 100 : 0;
  return { base, tax, total: base + tax };
};
const calculateInvoiceTotals = (invoice) => {
  const lines = invoice.items.map(calculateLineTotal);
  const totalHT = lines.reduce((s, l) => s + l.base, 0);
  const totalTVA = lines.reduce((s, l) => s + l.tax, 0);
  const discount = invoice.discountAmount ?? 0;
  const timbre = 0;
  const totalTTC = Math.max(0, totalHT + totalTVA + timbre - discount);
  return { totalHT, totalTVA, discount, timbre, totalTTC };
};
const UpadateInvoiceModal = ({ invoice, isOpen, onClose, onUpdate }) => {
  const [model, setModel] = useState({
    clientId: "",
    fournisseurId: "",
    clientName: "",
    fournisseurName: "",
    invoiceNumber: "",
    invoiceType: "",
    date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    currency: "DZD",
    items: [],
    discountAmount: 0,
    paymentMode: "Cheque",
    creation: "",
    delivery: ""
  });
  const [clients2, setClients] = useState([]);
  const [fournisseurs2, setFournisseurs] = useState([]);
  const [products2, setProducts] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [fournisseurSearch, setFournisseurSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const totals = useMemo(() => calculateInvoiceTotals(model), [model]);
  const updateField = (key, value) => setModel((m) => ({ ...m, [key]: value }));
  const addItem = (productId) => {
    const product = products2.find((p) => p.id === productId);
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
          taxRate: product.taxRate ?? 0
        }
      ]
    }));
  };
  const updateItemQuantity = (id, quantity) => setModel((m) => ({
    ...m,
    items: m.items.map((it) => it.id === id ? { ...it, quantity } : it)
  }));
  const removeItem = (id) => setModel((m) => ({ ...m, items: m.items.filter((it) => it.id !== id) }));
  const updateInvoiceMutation = useMutation({
    fn: async (data) => {
      const totalsCalc = calculateInvoiceTotals(data);
      const invoiceData = {
        id: invoice.id,
        clientId: data.clientId,
        fournisseurId: data.fournisseurId || "",
        invoiceNumber: data.invoiceNumber?.trim() || `FACT-${Date.now()}`,
        invoiceType: data.invoiceType ?? "Facture",
        paymentMode: data.paymentMode ?? "cheque",
        totalHT: totalsCalc.totalHT.toFixed(2),
        totalTVA: totalsCalc.totalTVA.toFixed(2),
        totalTTC: totalsCalc.totalTTC.toFixed(2),
        discountAmount: (totalsCalc.discount ?? 0).toFixed(2),
        chauffeurName: data.chauffeurName ?? "",
        chauffeurPhone: data.chauffeurPhone ?? "",
        transportLicense: data.transportLicense ?? "",
        creation: data.creation,
        delivery: data.delivery
      };
      const itemsData = data.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate?.toString() ?? "0"
      }));
      return updateInvoiceServerFn({
        data: {
          id: invoice.id,
          formData: {
            ...invoiceData,
            items: itemsData
            // this is okay because we destructure it in the server fn
          }
        }
      }).then((res) => ({
        invoice: {
          id: res.invoice.id,
          invoiceNumber: res.invoice.invoiceNumber,
          invoiceType: res.invoice.invoiceType,
          client: res.invoice.clientId,
          fournisseur: res.invoice.fournisseurId,
          date: res.invoice.createdAt.toISOString(),
          paymentMode: res.invoice.paymentMode ?? "",
          totalHT: res.invoice.totalHT,
          totalTVA: res.invoice.totalTVA,
          totalTTC: res.invoice.totalTTC,
          discountAmount: "0",
          chauffeurName: res.invoice.chauffeurName ?? "",
          chauffeurPhone: res.invoice.chauffeurPhone ?? "",
          transportLicense: res.invoice.transportLicense ?? "",
          items: res.items,
          creation: res.invoice.creation ?? "",
          delivery: res.invoice.delivery ?? ""
        }
      }));
    },
    onSuccess: ({ data }) => {
      const totalsCalc = calculateInvoiceTotals(model);
      const itemsData = model.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate?.toString() ?? "0"
      }));
      onUpdate({
        id: data.invoice.id,
        invoiceNumber: model.invoiceNumber ?? "",
        invoiceType: model.invoiceType ?? "",
        client: JSON.stringify({ id: model.clientId, name: model.clientName }),
        fournisseur: JSON.stringify({ id: model.fournisseurId, name: model.fournisseurName }),
        date: model.date,
        paymentMode: model.paymentMode ?? "",
        totalHT: totalsCalc.totalHT.toFixed(2),
        totalTVA: totalsCalc.totalTVA.toFixed(2),
        totalTTC: totalsCalc.totalTTC.toFixed(2),
        discountAmount: "0",
        chauffeurName: model.chauffeurName ?? "",
        chauffeurPhone: model.chauffeurPhone ?? "",
        transportLicense: model.transportLicense ?? "",
        items: itemsData,
        creation: model.creation ?? "",
        delivery: model.delivery ?? ""
      });
      onClose();
    },
    onFailure: (ctx) => {
      console.error("Erreur cr\xE9ation facture:", ctx.error?.message ?? ctx);
    }
  });
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const clientsData = await loadClientsServerFn();
        setClients(clientsData.map((c) => ({ id: c.id, fullName: c.fullName })));
        const fournisseursData = await loadFournisseursServerFn();
        setFournisseurs(fournisseursData.map((f) => ({ id: f.id, fullName: f.fullName })));
        const productsData = await loadProductsServerFn();
        setProducts(
          productsData.map((p) => ({
            id: p.id,
            description: p.name ?? p.code ?? "Produit inconnu",
            unitPrice: Number(p.price) ?? 0,
            taxRate: Number(p.tva) ?? 0
          }))
        );
      } catch (err) {
        console.error("Erreur chargement donn\xE9es:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    console.log("-----invoice", invoice.client.id);
    const client = typeof invoice.client === "string" ? JSON.parse(invoice.client) : invoice.client;
    const fournisseur = typeof invoice.fournisseur === "string" ? JSON.parse(invoice.fournisseur) : invoice.fournisseur;
    setModel({
      clientName: invoice.client?.fullName || client.name,
      fournisseurName: invoice.fournisseur?.fullName || fournisseur.name,
      clientId: invoice.client?.id || client.id,
      fournisseurId: invoice.fournisseur?.id || fournisseur.id,
      invoiceNumber: invoice.invoiceNumber || "",
      invoiceType: invoice.invoiceType || "",
      date: invoice.date ? invoice.date.split("/").reverse().join("-") : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      currency: invoice.paymentMode || "DZD",
      items: invoice.items?.map((item) => ({
        id: uid("itm_"),
        productId: item.productId || item.product?.id,
        description: item.description || item.product?.name || "Produit inconnu",
        quantity: Number(item.quantity || item.item?.quantity || 1),
        unitPrice: Number(item.unitPrice || item.item?.unitPrice || 0),
        taxRate: Number(item.taxRate || item.item?.taxRate || 0)
      })) || [],
      discountAmount: Number(invoice.discountAmount) || 0,
      paymentMode: invoice.paymentMode || "Cheque",
      chauffeurName: invoice.chauffeurName || "",
      chauffeurPhone: invoice.chauffeurPhone || "",
      transportLicense: invoice.transportLicense || "",
      creation: invoice.creation,
      delivery: invoice.delivery
    });
  }, []);
  if (!isOpen) return null;
  const filteredClients = clients2.filter(
    (c) => c.fullName.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const filteredFournisseurs = fournisseurs2.filter(
    (f) => f.fullName.toLowerCase().includes(fournisseurSearch.toLowerCase())
  );
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx("button", { className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl", onClick: onClose, children: /* @__PURE__ */ jsx(FaTimes, {}) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Cr\xE9er une facture" }),
    loading ? /* @__PURE__ */ jsx("p", { children: "Chargement..." }) : /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          updateInvoiceMutation.mutate(model);
        },
        className: "space-y-5",
        children: [
          "             ",
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Details du facture" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Num de facture" }),
            /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Entrer le num de facture",
                className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                value: model.invoiceNumber,
                onChange: (e) => updateField("invoiceNumber", e.target.value)
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Mode de paiment" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.paymentMode,
                  onChange: (e) => updateField("paymentMode", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner le mode de paiement" }),
                    /* @__PURE__ */ jsx("option", { value: "virement", children: "Virement" }),
                    /* @__PURE__ */ jsx("option", { value: "Cheque", children: "Ch\xE8que" }),
                    /* @__PURE__ */ jsx("option", { value: "esp\xE8ces", children: "Esp\xE8ces" }),
                    /* @__PURE__ */ jsx("option", { value: "a_term", children: "\xC0 terme" }),
                    /* @__PURE__ */ jsx("option", { value: "a_term_3", children: "\xC0 terme (3 mois)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Date de creation" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Entrer la date de creation dd/mm/yyyy",
                  className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                  value: model.creation,
                  onChange: (e) => updateField("creation", e.target.value)
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Date de livraison" }),
              /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Entrer la date de livraison dd/mm/yyyy",
                  className: "pl-2 border rounded w-full py-1 text-sm mb-2",
                  value: model.delivery,
                  onChange: (e) => updateField("delivery", e.target.value)
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Type de facture" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.invoiceType,
                  onChange: (e) => updateField("invoiceType", e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner le type" }),
                    /* @__PURE__ */ jsx("option", { value: "Facture", children: "Facture" }),
                    /* @__PURE__ */ jsx("option", { value: "Facture Proforma", children: "Facture Proforma" }),
                    /* @__PURE__ */ jsx("option", { value: "Bon de Livraison", children: "Bon de Livraison" }),
                    /* @__PURE__ */ jsx("option", { value: "Bon de Transfert", children: "Bon de Transfert" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Client" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-2 top-3 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Rechercher un client...",
                    className: "pl-8 border rounded w-full py-1 text-sm mb-2",
                    value: clientSearch,
                    onChange: (e) => setClientSearch(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border rounded px-2 py-1",
                  value: model.clientId ? JSON.stringify({ id: model.clientId, name: model.clientName }) : "",
                  onChange: (e) => {
                    const { id, name } = JSON.parse(e.target.value);
                    updateField("clientId", id);
                    updateField("clientName", name);
                  },
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner un client" }),
                    filteredClients.map((c) => /* @__PURE__ */ jsx("option", { value: JSON.stringify({ id: c.id, name: c.fullName }), children: c.fullName }, c.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Fournisseur" }),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(FaSearch, { className: "absolute left-2 top-3 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Rechercher un fournisseur...",
                    className: "pl-8 border rounded w-full py-1 text-sm mb-2",
                    value: fournisseurSearch,
                    onChange: (e) => setFournisseurSearch(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "w-full border rounded px-2 py-1",
                  value: model.fournisseurId ? JSON.stringify({ id: model.fournisseurId, name: model.fournisseurName }) : "",
                  onChange: (e) => {
                    const { id, name } = JSON.parse(e.target.value);
                    updateField("fournisseurId", id);
                    updateField("fournisseurName", name);
                  },
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: "S\xE9lectionner un fournisseur" }),
                    filteredFournisseurs.map((f) => /* @__PURE__ */ jsx("option", { value: JSON.stringify({ id: f.id, name: f.fullName }), children: f.fullName }, f.id))
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Chauffeur & Transport" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom du chauffeur" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  placeholder: "Entrer le nom de chauffeur",
                  value: model.chauffeurName || "",
                  onChange: (e) => updateField("chauffeurName", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "T\xE9l\xE9phone du chauffeur" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  placeholder: "Entrer le numero de chauffeur",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.chauffeurPhone || "",
                  onChange: (e) => updateField("chauffeurPhone", e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Plaque du transport" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  className: "mt-1 w-full border rounded px-2 py-1",
                  value: model.transportLicense || "",
                  placeholder: "Entrer la plaque de transport",
                  onChange: (e) => updateField("transportLicense", e.target.value)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-blue-600 font-bold text-2Xl", children: "Produits" }),
          /* @__PURE__ */ jsx("div", { className: "border border-2" }),
          /* @__PURE__ */ jsxs("fieldset", { className: "border rounded p-4", children: [
            /* @__PURE__ */ jsx("legend", { className: "font-semibold text-blue-700", children: "Articles" }),
            /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs(
              "select",
              {
                className: "border rounded px-2 py-1 w-full",
                onChange: (e) => {
                  addItem(e.target.value);
                  e.target.value = "";
                },
                defaultValue: "",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Ajouter un article" }),
                  products2.map((i) => /* @__PURE__ */ jsxs("option", { value: i.id, children: [
                    i.description,
                    " \u2014 ",
                    i.unitPrice.toFixed(2),
                    " ",
                    model.currency,
                    " (TVA ",
                    i.taxRate ?? 0,
                    "%)"
                  ] }, i.id))
                ]
              }
            ) }),
            model.items.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Aucun article ajout\xE9." }),
            model.items.map((it) => /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 items-center mb-2", children: [
              /* @__PURE__ */ jsx("input", { value: it.description, disabled: true, className: "border rounded px-2 py-1 w-full bg-gray-100" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  min: 0,
                  value: it.quantity,
                  onChange: (e) => updateItemQuantity(it.id, Number(e.target.value)),
                  className: "border rounded px-2 py-1"
                }
              ),
              /* @__PURE__ */ jsx("input", { value: it.unitPrice.toFixed(2), disabled: true, className: "border rounded px-2 py-1 bg-gray-100" }),
              /* @__PURE__ */ jsx("input", { value: it.taxRate?.toFixed(2) ?? "0", disabled: true, className: "border rounded px-2 py-1 bg-gray-100" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeItem(it.id), className: "text-red-600 hover:text-red-800 text-lg", children: /* @__PURE__ */ jsx(FaTrash, {}) })
            ] }, it.id))
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end items-end", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between gap-3  text-right space-y-1", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Total Net HT:" }),
                " ",
                totals.totalHT.toFixed(2),
                " "
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Total TVA:" }),
                " ",
                totals.totalTVA.toFixed(2),
                " "
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-between gap-3 text-right space-y-1", children: /* @__PURE__ */ jsxs("p", { className: "font-bold text-lg text-blue-700", children: [
              /* @__PURE__ */ jsx("strong", { children: "Total TTC:" }),
              " ",
              totals.totalTTC.toFixed(2)
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: updateInvoiceMutation.status === "pending",
              className: "bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700",
              children: updateInvoiceMutation.status === "pending" ? "Modification..." : "Modifier la facture"
            }
          ) })
        ]
      }
    )
  ] }) });
};
const InvoicesPage = () => {
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [viewInvoiceModal, setViewInvoiceModal] = useState(false);
  const [updateInvoiceModal, setOpenUpdateInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices2, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const data = await loadInvoicesServerFn();
      console.log("data", data);
      const normalizedInvoices = data.map((inv, index) => ({
        id: inv.invoice.id,
        invoiceNumber: inv.invoice.invoiceNumber,
        invoiceType: inv.invoice.invoiceType ?? "Facture",
        client: inv.client ?? { fullName: "Inconnu" },
        fournisseur: inv.fournisseur ?? { fullName: "Inconnu" },
        date: inv.invoice.createdAt ? new Date(inv.invoice.createdAt).toLocaleDateString() : "Aucune date",
        paymentMode: inv.invoice.paymentMode ?? "Esp\xE8ces",
        totalHT: inv.invoice.totalHT?.toString() ?? "0",
        totalTVA: inv.invoice.totalTVA?.toString() ?? "0",
        totalTTC: inv.invoice.totalTTC?.toString() ?? "0",
        discountAmount: inv.discountAmount?.toString() ?? "0",
        chauffeurName: inv.invoice?.chauffeurName ?? "",
        chauffeurPhone: inv.invoice?.chauffeurPhone ?? "",
        transportLicense: inv.invoice?.transportLicense ?? "",
        items: inv.items ?? [],
        creation: inv.invoice.creation,
        delivery: inv.invoice.delivery
      }));
      setInvoices(normalizedInvoices);
      setFilteredInvoices(normalizedInvoices);
    } catch (err) {
      console.error("Failed to fetch invoices", err);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = (updatedInvoice) => {
    console.log("Updated Invoice:", updatedInvoice);
    setInvoices(
      (prev) => prev.map((f) => f.id === updatedInvoice.id ? updatedInvoice : f)
    );
  };
  useEffect(() => {
    fetchInvoices();
  }, []);
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredInvoices(invoices2);
    } else {
      const lower = searchTerm.toLowerCase();
      setFilteredInvoices(
        invoices2.filter(
          (inv) => inv.client.fullName.toLowerCase().includes(lower) || inv.fournisseur.fullName.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchTerm, invoices2]);
  const handleEdit = (inv) => {
    setSelectedInvoice(inv);
    setOpenUpdateInvoiceModal(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette facture ?"
    );
    if (!confirmDelete) return;
    setDeletingId(id);
    try {
      const result = await deleteInvoiceServerFn({ data: { id } });
      if (result.success) {
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
        toast.success("Facture supprim\xE9e avec succ\xE8s !");
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
  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setViewInvoiceModal(true);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 px-3 md:px-6 py-6 bg-gray-50 min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-2xl font-bold text-gray-800", children: "\u{1F9FE} Liste des factures" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full md:w-auto", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher par client ou fournisseur...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "border border-gray-300 rounded-md px-3 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2",
            onClick: () => setOpenInvoiceModal(true),
            children: [
              /* @__PURE__ */ jsx(FaFileInvoice, {}),
              " Cr\xE9er"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg border border-blue-100 overflow-x-auto", children: loading ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Chargement des factures..." }) : filteredInvoices.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Aucune facture trouv\xE9e." }) : /* @__PURE__ */ jsx("div", { className: "min-w-[900px] md:min-w-full", children: /* @__PURE__ */ jsxs(Table, { className: "text-xs md:text-sm", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-blue-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Numero" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Client" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Fournisseur" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Articles" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Total HT" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Total TVA" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Total TTC" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Remise" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Chauffeur" }),
        /* @__PURE__ */ jsx(TableHead, { children: "T\xE9l\xE9phone" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Plaque" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filteredInvoices.map((inv, index) => {
        const client = typeof inv.client === "string" ? JSON.parse(inv.client) : inv.client;
        const fournisseur = typeof inv.fournisseur === "string" ? JSON.parse(inv.fournisseur) : inv.fournisseur;
        return /* @__PURE__ */ jsxs(
          TableRow,
          {
            className: "hover:bg-blue-50 transition-colors",
            children: [
              /* @__PURE__ */ jsx(TableCell, { children: inv.invoiceNumber }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.date }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.invoiceType }),
              /* @__PURE__ */ jsx(TableCell, { children: client.fullName ?? client.name }),
              /* @__PURE__ */ jsx(TableCell, { children: fournisseur.fullName ?? fournisseur.name }),
              " ",
              /* @__PURE__ */ jsx(TableCell, { children: inv.items.length }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.totalHT }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.totalTVA }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.totalTTC }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.discountAmount }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.chauffeurName }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.chauffeurPhone }),
              /* @__PURE__ */ jsx(TableCell, { children: inv.transportLicense }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "hover:bg-blue-100",
                    onClick: () => handleEdit(inv),
                    children: /* @__PURE__ */ jsx(FaEdit, { className: "text-blue-600" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    onClick: () => handleView(inv),
                    children: /* @__PURE__ */ jsx(FaEye, {})
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "destructive",
                    disabled: deletingId === inv.id,
                    onClick: () => handleDelete(inv.id),
                    children: /* @__PURE__ */ jsx(FaTrash, {})
                  }
                )
              ] }) })
            ]
          },
          inv.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      AddInvoiceModal,
      {
        isOpen: openInvoiceModal,
        onClose: () => {
          setOpenInvoiceModal(false);
          fetchInvoices();
        }
      }
    ),
    selectedInvoice && /* @__PURE__ */ jsx(
      ViewInvoiceModal,
      {
        isOpen: viewInvoiceModal,
        invoice: selectedInvoice,
        onClose: () => setViewInvoiceModal(false)
      }
    ),
    selectedInvoice && updateInvoiceModal && /* @__PURE__ */ jsx(
      UpadateInvoiceModal,
      {
        isOpen: updateInvoiceModal,
        invoice: selectedInvoice,
        onClose: () => setOpenUpdateInvoiceModal(false),
        onUpdate: handleUpdate
      }
    )
  ] });
};
const WILAYAS$1 = [
  "01 Adrar",
  "02 Chlef",
  "03 Laghouat",
  "04 Oum El Bouaghi",
  "05 Batna",
  "06 B\xE9ja\xEFa",
  "07 Biskra",
  "08 B\xE9char",
  "09 Blida",
  "10 Bouira",
  "11 Tamanrasset",
  "12 T\xE9bessa",
  "13 Tlemcen",
  "14 Tiaret",
  "15 Tizi Ouzou",
  "16 Alger",
  "17 Djelfa",
  "18 Jijel",
  "19 S\xE9tif",
  "20 Sa\xEFda",
  "21 Skikda",
  "22 Sidi Bel Abb\xE8s",
  "23 Annaba",
  "24 Guelma",
  "25 Constantine",
  "26 M\xE9d\xE9a",
  "27 Mostaganem",
  "28 M\u2019Sila",
  "29 Mascara",
  "30 Ouargla",
  "31 Oran",
  "32 El Bayadh",
  "33 Illizi",
  "34 Bordj Bou Arreridj",
  "35 Boumerd\xE8s",
  "36 El Tarf",
  "37 Tindouf",
  "38 Tissemsilt",
  "39 El Oued",
  "40 Khenchela",
  "41 Souk Ahras",
  "42 Tipaza",
  "43 Mila",
  "44 A\xEFn Defla",
  "45 Na\xE2ma",
  "46 A\xEFn T\xE9mouchent",
  "47 Gharda\xEFa",
  "48 Relizane",
  "49 El M\u2019Ghair",
  "50 El Meniaa",
  "51 Ouled Djellal",
  "52 Bordj Badji Mokhtar",
  "53 B\xE9ni Abb\xE8s",
  "54 Timimoun"
];
const AddClientModal = ({ isOpen, onClose, onCreate }) => {
  const [model, setModel] = useState({
    fullName: "",
    address: "",
    willaya: "",
    phone: "",
    activity: "",
    art: "",
    nis: "",
    nif: "",
    rc: ""
  });
  const [errors, setErrors] = useState({});
  const createClientMutation = useMutation({
    fn: async (data) => {
      const result = await createClientServerFn({ data });
      return result;
    },
    onSuccess: ({ data }) => {
      alert("Client cr\xE9\xE9 avec succ\xE8s !");
      console.log("Created client:", data.client);
      onCreate();
      onClose();
    },
    onFailure: ({ error }) => {
      toast.error("Les informations du client sont invalides ou dupliqu\xE9es.");
    }
  });
  const updateField = (key, value) => setModel((m) => ({ ...m, [key]: value }));
  const validate = () => {
    const newErrors = {};
    if (!model.fullName.trim()) newErrors.fullName = "Le nom complet est requis.";
    if (!model.address.trim()) newErrors.address = "L\u2019adresse est requise.";
    if (!model.willaya.trim()) newErrors.willaya = "La wilaya est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createClientMutation.mutate(model);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Cr\xE9er un client" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom complet *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.fullName,
              onChange: (e) => updateField("fullName", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.fullName ? "border-red-500" : ""}`
            }
          ),
          errors.fullName && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.fullName })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Adresse *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.address,
              onChange: (e) => updateField("address", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.address ? "border-red-500" : ""}`
            }
          ),
          errors.address && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Wilaya *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: model.willaya,
              onChange: (e) => updateField("willaya", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.willaya ? "border-red-500" : ""}`,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- S\xE9lectionner une wilaya --" }),
                WILAYAS$1.map((w) => /* @__PURE__ */ jsx("option", { value: w, children: w }, w))
              ]
            }
          ),
          errors.willaya && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.willaya })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Activit\xE9" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.activity ?? "",
              onChange: (e) => updateField("activity", e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Art" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.art ?? "",
              onChange: (e) => updateField("art", e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "NIS" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.nis ?? "",
              onChange: (e) => updateField("nis", e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "NIF" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.nif ?? "",
              onChange: (e) => updateField("nif", e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "RC" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.rc ?? "",
              onChange: (e) => updateField("rc", e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: createClientMutation.status === "pending" ? "Cr\xE9ation..." : "Cr\xE9er le client"
        }
      )
    ] })
  ] }) });
};
const UpdateClientModal = ({
  isOpen,
  client,
  onClose,
  onUpdate
}) => {
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (client) {
      const { id, ...rest } = client;
      setModel(rest);
    }
  }, [client]);
  const updateClientMutation = useMutation({
    fn: (data) => updateClientServerFn({
      data: {
        id: data.id,
        formData: {
          fullName: data.fullName,
          address: data.address,
          willaya: data.willaya,
          activity: data.activity,
          art: data.art,
          nis: data.nis,
          nif: data.nif,
          rc: data.rc
        }
      }
    }),
    onSuccess: ({ data }) => {
      alert("Client mis \xE0 jour avec succ\xE8s!");
      onUpdate(data.client);
      onClose();
    },
    onFailure: ({ error }) => {
      alert("\xC9chec de la mise \xE0 jour du client: " + error.message);
    }
  });
  const updateField = (key, value) => setModel((m) => m ? { ...m, [key]: value } : m);
  const onSubmit = (e) => {
    e.preventDefault();
    if (model && client) {
      updateClientMutation.mutate({ id: client.id, ...model });
    }
  };
  if (!isOpen || !model) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Mettre \xE0 jour le client" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.keys(model).map((key) => key != "phone" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block font-medium", children: key }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: model[key] || "",
            onChange: (e) => updateField(key, e.target.value),
            className: "mt-1 w-full border rounded px-2 py-1"
          }
        )
      ] }, key)) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: updateClientMutation.status === "pending" ? "Mise \xE0 jour..." : "Mettre \xE0 jour le client"
        }
      )
    ] })
  ] }) });
};
const ViewClientModal = ({
  isOpen,
  client,
  onClose
}) => {
  if (!isOpen || !client) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl transition",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-2", children: [
      /* @__PURE__ */ jsx(FaUserCircle, { className: "text-blue-600 text-6xl mb-2" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-blue-700 mb-1", children: "D\xE9tails du Client" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Informations enregistr\xE9es dans le syst\xE8me" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Object.entries(client).filter(([key]) => key !== "id" && key !== "createdAt" && key !== "updatedAt").map(([key, value]) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1", children: key.charAt(0).toUpperCase() + key.slice(1) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-base font-medium", children: value || /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Non sp\xE9cifi\xE9" }) })
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition",
        children: "Fermer"
      }
    ) })
  ] }) });
};
function useLoadClients() {
  const sampleClients = [
    {
      fullName: "saloum abdelghani",
      address: "kaser el abtale",
      willaya: "seif",
      phone: "",
      activity: "commerce detail alimentation",
      art: "19520198060",
      nis: "201533190319-00",
      nif: "19520198060",
      rc: "seif"
    },
    {
      fullName: "KASIMI FAYCEL",
      address: "RUE 150-200 LOGEMENT B N\xB0 F",
      willaya: "BOUIRA",
      phone: "",
      activity: "GROS DES PRDT DES MINOTRIE",
      art: "10372371518",
      nis: "1901037900912180",
      nif: "10/00-1467948A20",
      rc: "199 010 370 091 232"
    },
    {
      fullName: "YOUSFI CHAKER 2",
      address: "LIEU DIT 1000 LOGTS IHDDADEN",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULANGERIE",
      art: "0 6016304982",
      nis: "21A5811651-00/16",
      nif: "0 6016304982",
      rc: "194 054 202 517 148"
    },
    {
      fullName: "GHOUAR BRAHAM",
      address: "TIRI CNE AKFADOU",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "0 6420101732",
      nis: "178 064 200 250 156",
      nif: "06/00-0961355A10",
      rc: "197806420025041"
    },
    {
      fullName: "GENDARMIA MOKHTAR",
      address: "PROM IMMOB 11 DECEMBRE",
      willaya: "SETIF",
      phone: "",
      activity: "ARTISAN BOULANGER",
      art: "19019184143",
      nis: "163193200070186 000 00",
      nif: "190139472",
      rc: "1963 1932 00071 45"
    },
    {
      fullName: "KRACHNI-LAHCEN",
      address: "CITE DE L AVENIR C22A13 SETIF",
      willaya: "SETIF",
      phone: "",
      activity: "TRASPORTEUR DE MARCHANDIS",
      art: "19/03-2322016D00",
      nis: "19/03-2322016D00",
      nif: "19/03-2322016D00",
      rc: "169 190 104 884 176 000"
    },
    {
      fullName: "SNC FRERES LAZREG",
      address: "A COTE DU CW 132 LIEU DE FAGHANE",
      willaya: "CHLEF",
      phone: "",
      activity: "FABRICATION DES ALIMENTS DE BETTAILS",
      art: "0 2090072701",
      nis: "02/02-0906114B09",
      nif: "0 2090072701",
      rc: "000 902 049 019 251"
    },
    {
      fullName: "GHOUT MOHAND SAID",
      address: "LIEU DIT BOUZERMANE PRP 155",
      willaya: "BEJAIA",
      phone: "",
      activity: "GROSSISTE",
      art: "0 6390240903",
      nis: "06/010981524A13",
      nif: "0 6390240903",
      rc: "199 106 390 184 909"
    },
    {
      fullName: "BENINI MAYOUF",
      address: "THAZTHAGHETH LOCAL N\xB0 02",
      willaya: "BOUIRA",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "10 172 171 748",
      nis: "194 054 201 618 136",
      nif: "24A1477916-00/10",
      rc: "199 504 420 161 821"
    },
    {
      fullName: "SELMANE MERZAK",
      address: "CITE 20 AOUT BOUDOUAOU",
      willaya: "BOUMERDES",
      phone: "",
      activity: "VENTE EN GROS DES PRODUITS MINOTERIE",
      art: "35025112581",
      nis: "1 840 918 025 811 120 000",
      nif: "35/00-3683931A21",
      rc: "198409180258127"
    },
    {
      fullName: "SNC KRACHNI ET frere",
      address: "ZAA n\xB011lot 04 n\xB064 Gudjel",
      willaya: "SETIF",
      phone: "",
      activity: "Commerce de detail de alimentation",
      art: "19170504324",
      nis: "01B0462719-00/19",
      nif: "19170504324",
      rc: "000 134046271983 19000"
    },
    {
      fullName: "ZEREG HASSENE",
      address: "37 RUE DE LA LIBERTE BEJAIA",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "0 6012002565",
      nis: "18A532338-01/06",
      nif: "0 6012002565",
      rc: "179 054 201 006 191"
    },
    {
      fullName: "OUANOUGHI SOUFYANE",
      address: "CITE 700 LOGTS PORTE 88",
      willaya: "MSILA",
      phone: "",
      activity: "MARCHE AMBULANT DALIMENT DE BETAIL",
      art: "28014011821",
      nis: "100280101710165",
      nif: "22D2889675-02/28",
      rc: "100028010171068"
    },
    {
      fullName: "BENIRGUED BRAHIM",
      address: "BOUZGUENE W TIZI OUZOU",
      willaya: "TIZI OUZOU",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "TIZI OUZOU",
      nis: "15/00-5519832A23",
      nif: "TIZI OUZOU",
      rc: "185340105553115 01 500"
    },
    {
      fullName: "RENANE OUASSIM",
      address: "RUE AREZKI LAURES AMIZOUR",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULOLANGER",
      art: "0 6020049122",
      nis: "06/00-5820887A24",
      nif: "0 6020049122",
      rc: "19905420228910 80 06"
    },
    {
      fullName: "LELLIH SAID",
      address: "BOUSSAADA - MSILA",
      willaya: "MSILA",
      phone: "",
      activity: "MARCHANT AMBILANT ALIMENTS BETAIL",
      art: "MSILA",
      nis: "28/00-2885153D20",
      nif: "MSILA",
      rc: "177281600188478"
    },
    {
      fullName: "GUEBLI SAMIR",
      address: "VILLAGE LAAZIB (TAGMA)",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "0 6512090064",
      nis: "185 180 103 186 106",
      nif: "23A5816947-00/06",
      rc: "188 518 010 316 633"
    },
    {
      fullName: "ATHMANI HOUSIN",
      address: "TAGHEZWIT",
      willaya: "BEJAIA",
      phone: "",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "0 6016205443",
      nis: "06/00-5821994A24",
      nif: "0 6016205443",
      rc: "194054203739137006 00"
    },
    {
      fullName: "MEBARKI DHIA EDDINE",
      address: "AIN OULMANE",
      willaya: "SETIF",
      phone: "100192800832178 01 901",
      activity: "MARCHAND MOBILE EN PRODUITS",
      art: "19/00-5346421D24",
      nis: "19/00-5346421D24",
      nif: "19/00-5346421D24",
      rc: "100192800832178 01 901"
    },
    {
      fullName: "SARL BAYOU",
      address: "FAGMENTATION LAZIB ET MAMER",
      willaya: "BEJAIA",
      phone: "00 1806018941204",
      activity: "commerce gros de produit",
      art: "0 6017706557",
      nis: "06/00-0189412B18",
      nif: "0 6017706557",
      rc: "00 1806018941204"
    },
    {
      fullName: "HOUSIN ATHMANI",
      address: "CETI TOUBAL",
      willaya: "BEJAIA",
      phone: "194054203739137006 00",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "0 6016205443",
      nis: "06/00-5821994A24",
      nif: "0 6016205443",
      rc: "194054203739137006 00"
    },
    {
      fullName: "ETS nait slimane mohand ameziane",
      address: "QUARTIERE SONATRACH AKBOU",
      willaya: "BEJAIA",
      phone: "196606250058919",
      activity: "DEPOSITAIRE EN SEMOULE FARINE ET",
      art: "0 6051702002",
      nis: "166062500589161",
      nif: "06/00-0911898A98",
      rc: "196606250058919"
    },
    {
      fullName: "SNC BISCUITERIE BELHOUL ET FRERES",
      address: "LDT DIBOUI ZONE D'ACTIVITE",
      willaya: "BEJAIA",
      phone: "1806260012951",
      activity: "BISCUITERIE PATISSERIE ET PRODUITS",
      art: "6260405106",
      nis: "00 1806018953322",
      nif: "06/00-0189533B18",
      rc: "1806260012951"
    },
    {
      fullName: "FOUAZ KIROUD",
      address: "OUED GHIR",
      willaya: "bejaia",
      phone: "19005420024718400 6 00",
      activity: "BOULANGERIE",
      art: "6512100102",
      nis: "09/00-582259A24",
      nif: "6512100102",
      rc: "19005420024718400 6 00"
    },
    {
      fullName: "MERIDJ MOURAD",
      address: "N\xB01 MECHTA TRASET FRRDJIOUA",
      willaya: "MILA",
      phone: "198143020325634",
      activity: "GROSSISTE",
      art: "43020996405",
      nis: "181430203256185",
      nif: "43/00-1649804A11",
      rc: "198143020325634"
    },
    {
      fullName: "EURL GLOBAL TRADE TASSILI",
      address: "RTE D'ALGER LOT 320 LOC A 06",
      willaya: "BLIDA",
      phone: "2409260005753",
      activity: "commerce gros de produit",
      art: "2000237552",
      nis: "2409081225836",
      nif: "09/00-0812258B24",
      rc: "2409260005753"
    },
    {
      fullName: "KHELFALLAH HICHEM",
      address: "CIT 20 AOUT 1955 SERIANA",
      willaya: "BATNA",
      phone: "198543020128041",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "5050405931",
      nis: "185430201280195 00 500",
      nif: "05/00-6115102A24",
      rc: "198543020128041"
    },
    {
      fullName: "BELHAYOUL MOUAADH",
      address: "DJEMAA BENI HBIBI JIJEL",
      willaya: "JIJEL",
      phone: "199918090115524",
      activity: "commerce detail de legumes sece",
      art: "18250478495",
      nis: "1991809011551750 18 00",
      nif: "18/00-2272749",
      rc: "199918090115524"
    },
    {
      fullName: "MOUSSA KHAROUBI",
      address: "LOT 117 LOTE GUIDJEL",
      willaya: "setif",
      phone: "199319010064921",
      activity: "commerce detail alimentation",
      art: "19170080410",
      nis: "1931901006491030 19 00",
      nif: "19/00-5716555A23",
      rc: "199319010064921"
    },
    {
      fullName: "kourichi fateh",
      address: "setif",
      willaya: "setif",
      phone: "180 190 106 941 169",
      activity: "coummerce en detail",
      art: "1901-2381-040",
      nis: "19/00-046114a05",
      nif: "1901-2381-040",
      rc: "180 190 106 941 169"
    },
    {
      fullName: "FAYSSAL BOUTELDJA",
      address: "AIN SEBT",
      willaya: "SETIF",
      phone: "1921949000721020 19 00",
      activity: "commerce detail alimentation general",
      art: "19491381006",
      nis: "19/00-5721058A24",
      nif: "19491381006",
      rc: "1921949000721020 19 00"
    },
    {
      fullName: "SENOUSSI FATIMA",
      address: "MECHTET OULED LITIM",
      willaya: "SETIF",
      phone: "296819290009817",
      activity: "commerce detail alimentation general",
      art: "19293236042",
      nis: "26819290009819900000",
      nif: "19/01-0416364A98",
      rc: "296819290009817"
    },
    {
      fullName: "DAAMOUCHE FAWZI",
      address: "CETI THAWRA HAMAM ESOKHNA",
      willaya: "SETIF",
      phone: "198905040214634",
      activity: "SEUPIRET",
      art: "19322685052",
      nis: "189050402146134 019 00",
      nif: "19/00-5720189A24",
      rc: "198905040214634"
    },
    {
      fullName: "CHERCHAFA SAMIR",
      address: "MECHTET EL HMAR AIN OLMAN",
      willaya: "SETIF",
      phone: "18119280311613100",
      activity: "SEUPIRET",
      art: "19287375981",
      nis: "19/00-5344577A23",
      nif: "19287375981",
      rc: "18119280311613100"
    },
    {
      fullName: "FADEL ADEL",
      address: "CITE 100LOGTS AIN OULMANE",
      willaya: "SETIF",
      phone: "18219280068413100000",
      activity: "marchand ambilant en alimentation",
      art: "1982192800684 19",
      nis: "19/00-5333340d20",
      nif: "1982192800684 19",
      rc: "18219280068413100000"
    },
    {
      fullName: "SARL MOUDJAMAE EL IKHOUA ZEREG",
      address: "EL SEFAR EN FACE TRANSFORMATEUR",
      willaya: "BATNA",
      phone: "2305022681809",
      activity: "commerce gros legumes secs",
      art: "5831053261",
      nis: "05/00-0226818/B/23",
      nif: "5831053261",
      rc: "2305022681809"
    },
    {
      fullName: "SADOUN LOTFI",
      address: "BAZER SEKRA",
      willaya: "SETIF",
      phone: "100019200055753",
      activity: "DLEGUMS SECS ET PRD DE MINOTERIU",
      art: "19310420267",
      nis: "10019200055713200000",
      nif: "24A1034661-00/19",
      rc: "100019200055753"
    },
    {
      fullName: "ARABI SALEM",
      address: "EL MASTOUR REGANE N\xB003",
      willaya: "ADRAR",
      phone: "163010101242464",
      activity: "commerce gros des produits",
      art: "1011113461",
      nis: "163010101242464",
      nif: "01/05-4411589A98",
      rc: "163010101242464"
    },
    {
      fullName: "BEN DJAAFER BRAIKA",
      address: "zawia lhchef n01 salli",
      willaya: "adrar",
      phone: "165011803432454",
      activity: "commerce de gros de alimontation",
      art: "1180001083",
      nis: "01/02 441156a98",
      nif: "1180001083",
      rc: "165011803432454"
    },
    {
      fullName: "BELHAJ IMAD EDDINE",
      address: "CETI CHARCHOR AIN OULMANE",
      willaya: "seif",
      phone: "10993070700427000 9",
      activity: "MARCHAND MOBILE EN PRODUITS",
      art: "19288613045",
      nis: "1931192800427168019 00",
      nif: "19/00-5346074D24",
      rc: "10993070700427000 9"
    },
    {
      fullName: "MOUHAMED OUKBA KOUNTA",
      address: "CETI KATAAE EL OUEDE",
      willaya: "TAMENRASET",
      phone: "798811010053819",
      activity: "commerce de gros de produit",
      art: "11010120128",
      nis: "176110100538474",
      nif: "11/00-1014305A03",
      rc: "798811010053819"
    },
    {
      fullName: "BOUSSAID YOUSEF",
      address: "CITE AMIR ABDLKADER N\xB017",
      willaya: "ADRAR",
      phone: "185011800250102",
      activity: "distrubiteur ambilant d'allimentation",
      art: "1040014307",
      nis: "198501180025047",
      nif: "01/19-4430401A15",
      rc: "185011800250102"
    },
    {
      fullName: "OULED ELBAKAI AHMED",
      address: "CITE HAWARI BOUMEDINE",
      willaya: "IN GEZZAM",
      phone: "194012500192165",
      activity: "DISTRIBUTION EN GROS DE PRODUITS",
      art: "11040002604",
      nis: "54/02-1023768A13",
      nif: "11040002604",
      rc: "194012500192165"
    },
    {
      fullName: "BENYAHIA MOHAMED LAMINE",
      address: "CETE CHARCHOURA AIN OULMANE",
      willaya: "SETIF",
      phone: "1011928012871430",
      activity: "MARCHE AMBULANT PRODUITS",
      art: "19288312890",
      nis: "19/00-5339227 D22",
      nif: "19288312890",
      rc: "1011928012871430"
    },
    {
      fullName: "MAKHLOUfI NOUREDDINE",
      address: "CITE 711 LOGTS AIN OULMENE",
      willaya: "SETIF",
      phone: "163193900140183",
      activity: "DISTRIBUTEUR ALIMRNTATION GENERALE",
      art: "19285572031",
      nis: "19/00 - 5323250 D 18",
      nif: "19285572031",
      rc: "163193900140183"
    },
    {
      fullName: "KHELIFA LARBI",
      address: "CITE96 LOGEMENT",
      willaya: "MILA",
      phone: "196 843 020 140 830",
      activity: "commerce detail de legumes sece",
      art: "43100982525",
      nis: "1684302014081270 43 02",
      nif: "15A1661875-02/43",
      rc: "196 843 020 140 830"
    },
    {
      fullName: "BOUJAMLINE KHIER",
      address: "cite abacha bt47 lot293",
      willaya: "SETIF",
      phone: "183 190 107 793 124",
      activity: "BOULANGERIE INDUSTRIELLE",
      art: "19012066305",
      nis: "12A0496956-01/19",
      nif: "19012066305",
      rc: "183 190 107 793 124"
    },
    {
      fullName: "HADJI SAID",
      address: "cite bizar ave abacha",
      willaya: "SETIF",
      phone: "198 405 010 327 440",
      activity: "boulangerie industrielle",
      art: "19012174021",
      nis: "184 050 103 274 167",
      nif: "17A1759916-19/00",
      rc: "198 405 010 327 440"
    },
    {
      fullName: "LATAFI HOCINE",
      address: "lantia rcd commune",
      willaya: "MILA",
      phone: "1000430200743 60",
      activity: "commerce gros allimentation",
      art: "43190982155",
      nis: "1004302007431810 43",
      nif: "24A1683917-00/43",
      rc: "1000430200743 60"
    },
    {
      fullName: "SAOUDI ATHEMAN",
      address: "lot275 n121 cmn tadjnant",
      willaya: "MILA",
      phone: "199 143 080 043 529",
      activity: "boulangerie",
      art: "43080616651",
      nis: "191 430 800 435 114",
      nif: "19a1672430-00/43",
      rc: "199 143 080 043 529"
    },
    {
      fullName: "BOUKHFOUL SALAH EDDINE ABDERAOUF",
      address: "EL hachachia cne mezloug",
      willaya: "setif",
      phone: "100411200302434",
      activity: "commerce gros legumes secs",
      art: "19 331 836 041",
      nis: "179 190 103 592 170",
      nif: "19/00-5324747 A18",
      rc: "100411200302434"
    },
    {
      fullName: "bouhoui amar",
      address: "village heniad cne adkar",
      willaya: "bejaia",
      phone: "197 006 240 000 844",
      activity: "boulangerie",
      art: "a/02/0932784",
      nis: "a/02/0932784",
      nif: "a/02/0932784",
      rc: "197 006 240 000 844"
    },
    {
      fullName: "bertouli hassene",
      address: "citee lalouche abd el hamid local oi kaous",
      willaya: "JIJEL",
      phone: "198 718 220 019 528",
      activity: "commerce de gros des legumes sproduit",
      art: "18148019011",
      nis: "18 712 820 019 511 300",
      nif: "18/01-2246322 a 11",
      rc: "198 718 220 019 528"
    },
    {
      fullName: "meguellati abdelhamed",
      address: "bouassaha bazzer sekrra",
      willaya: "setif",
      phone: "198 519 200 375 422",
      activity: "commerce gros p/moulin",
      art: "19 310 420 481",
      nis: "1 851 920 037 451 910",
      nif: "22a5714713-00/19",
      rc: "198 519 200 375 422"
    },
    {
      fullName: "lammari mouloud",
      address: "amizour",
      willaya: "BEJAIA",
      phone: "773747-70-03c-02-06",
      activity: "fellah",
      art: "773747-70-03c-02-06",
      nis: "773747-70-03c-02-06",
      nif: "773747-70-03c-02-06",
      rc: "773747-70-03c-02-06"
    },
    {
      fullName: "djaoud ali",
      address: "village beni ksla",
      willaya: "bejaia",
      phone: "194 742 370 000 148",
      activity: "boulangerie",
      art: "06000912084a98",
      nis: "06000912084a98",
      nif: "06000912084a98",
      rc: "194 742 370 000 148"
    },
    {
      fullName: "MERZOUK ABDELKADER",
      address: "ighzar zagaghane",
      willaya: "bouira",
      phone: "197 910 170 112 833",
      activity: "commerce gros legumes et des",
      art: "10172171276",
      nis: "10/00-1464754a18",
      nif: "10172171276",
      rc: "197 910 170 112 833"
    },
    {
      fullName: "HADJI NOUAR",
      address: "local n3 bat a gp 05",
      willaya: "BEJAIA",
      phone: "197 905 420 086 028",
      activity: "boulangerie",
      art: "6220902027",
      nis: "179 054 200 860 113 000",
      nif: "06a0630002",
      rc: "197 905 420 086 028"
    },
    {
      fullName: "HADJI MOUFDI",
      address: "rue baba aissa cne",
      willaya: "DEJAIA",
      phone: "189052900044 109",
      activity: "boulangerie industrielle",
      art: "0640007 1058",
      nis: "23a5816925-00/06",
      nif: "0640007 1058",
      rc: "189052900044 109"
    },
    {
      fullName: "benallaoua chabane",
      address: "doumane laifa youcef",
      willaya: "BEJAIA",
      phone: "174060200256171 0 0601",
      activity: "commerce gros des produits de minoterie",
      art: "6020262038",
      nis: "21a100990901 /06",
      nif: "6020262038",
      rc: "174060200256171 0 0601"
    },
    {
      fullName: "TOUMI MOHMED AMINE",
      address: "cite tamchite n24",
      willaya: "BATNA",
      phone: "1950501015641490 0503",
      activity: "commerce gros leguimes sec",
      art: "5150000606",
      nis: "05/03-1191411 a18",
      nif: "5150000606",
      rc: "1950501015641490 0503"
    },
    {
      fullName: "Chaouli Ammar",
      address: "cite ben djerma365",
      willaya: "DJeELFA",
      phone: "198 528 440 004 529",
      activity: "marchand ambulant dalimants de betail",
      art: "1701 75037 46",
      nis: "185 284 400 045 129",
      nif: "17/00-155 356 5D21",
      rc: "198 528 440 004 529"
    },
    {
      fullName: "MEBARKI SALIM",
      address: "hay el nacer",
      willaya: "TINDOUF",
      phone: "100 1928 0014 8197 000 00",
      activity: "commerce detail multiple",
      art: "37014001140",
      nis: "37/00-3218497a22",
      nif: "37014001140",
      rc: "100 1928 0014 8197 000 00"
    },
    {
      fullName: "SELOUM ABDEHAKIM",
      address: "fakara ouled ghali",
      willaya: "Tamenrasset",
      phone: "18 619 280 089 515 000 000",
      activity: "commerce multiple detail exercen zones",
      art: "11020002636",
      nis: "11/02-0510938a15",
      nif: "11020002636",
      rc: "18 619 280 089 515 000 000"
    },
    {
      fullName: "haddad ilyes",
      address: "cite an-nasr seriana",
      willaya: "batna",
      phone: "193050100238123005 00",
      activity: "commerce detail alimentation",
      art: "199 305 010 023 838",
      nis: "05/00-1164550a12",
      nif: "199 305 010 023 838",
      rc: "193050100238123005 00"
    },
    {
      fullName: "BOUNAB AHCENE",
      address: "chemini",
      willaya: "bejaia",
      phone: "1976 0629 0043 30",
      activity: "commerce gros alimentation",
      art: "6290053820",
      nis: "06/02-0967949a11",
      nif: "6290053820",
      rc: "1976 0629 0043 30"
    },
    {
      fullName: "Mellouki Ahmed",
      address: "hay el chahid n02",
      willaya: "ADRAR",
      phone: "7006 9029 00597 15",
      activity: "commerce gros liee a allimentation",
      art: "1011118330",
      nis: "105 590 800 003 603",
      nif: "01/01-4423103a10",
      rc: "7006 9029 00597 15"
    },
    {
      fullName: "bedjaoui mouadh",
      address: "cite711lots ain oulmene",
      willaya: "setif",
      phone: "100 192 800 115 161",
      activity: "marchand ambilant en alimentation",
      art: "19 288 601 854",
      nis: "20d 533 2398",
      nif: "19 288 601 854",
      rc: "100 192 800 115 161"
    },
    {
      fullName: "khellaf ahmed",
      address: "apc jijel",
      willaya: "jijel",
      phone: "198 418 010 259 722",
      activity: "commerce detail alimetation",
      art: "18017503143",
      nis: "18/00-2233529/06",
      nif: "18017503143",
      rc: "198 418 010 259 722"
    },
    {
      fullName: "Sid lamine ouled el bekai",
      address: "cite 600logts apc",
      willaya: "Tamenrassete",
      phone: "17 511 010 950 445 600 000",
      activity: "commerce de gros de produit",
      art: "110 101 24 693",
      nis: "11/03-101 4258 A 3",
      nif: "110 101 24 693",
      rc: "17 511 010 950 445 600 000"
    },
    {
      fullName: "Azzi abdssedak mohamed",
      address: "cite ktaa elwad ouest",
      willaya: "tamanrasset",
      phone: "18 311 080 105 315 200 000",
      activity: "comerce multiple Detail De produits",
      art: "11010134226",
      nis: "11/00-1033743a23",
      nif: "11010134226",
      rc: "18 311 080 105 315 200 000"
    },
    {
      fullName: "kherbache billel",
      address: "cite271lots part 49",
      willaya: "setif",
      phone: "189 190 101 919 134 019 00",
      activity: "production alimentation des animaux",
      art: "19 37 11 130 41",
      nis: "19/00-5345657/23",
      nif: "19 37 11 130 41",
      rc: "189 190 101 919 134 019 00"
    },
    {
      fullName: "HAMITOUCHE DJAMILA",
      address: "route de keddara lot",
      willaya: "bouira",
      phone: "276 101 301 860 116",
      activity: "commersce de detail de legumes secs",
      art: "1 000 514 911",
      nis: "10/00-22A1472056",
      nif: "1 000 514 911",
      rc: "276 101 301 860 116"
    },
    {
      fullName: "HEMAIZI MOUNIR",
      address: "tinoulaf el djadida",
      willaya: "ADRAR",
      phone: "1 987 1910 00249 26",
      activity: "distrubiteur ambilant d'allimentation",
      art: "010 400047 55",
      nis: "18 719 100 024 910 500 100",
      nif: "01/00-4419936a07",
      rc: "1 987 1910 00249 26"
    },
    {
      fullName: "daikach taky eddine",
      address: "local01 rue 1november",
      willaya: "msila",
      phone: "198 728 410 084 318",
      activity: "commerce detail de produit minoterie",
      art: "28410394420",
      nis: "187 284 100 843 199",
      nif: "28/03-1546917a17",
      rc: "198 728 410 084 318"
    },
    {
      fullName: "chellat said",
      address: "cite sanouber",
      willaya: "setif",
      phone: "196 192 801 583 155",
      activity: "destributeur ambulant",
      art: "19 280 988 001",
      nis: "177 192 801 336 188",
      nif: "19/00-53140275d15",
      rc: "196 192 801 583 155"
    },
    {
      fullName: "boussadia abdelaziz",
      address: "bir smara mechtet",
      willaya: "setif",
      phone: "1 9681 931 002 71 37",
      activity: "commerce gros produit minoterie",
      art: "05/A/0459 725 19/00",
      nis: "1 681 931 002 71 137",
      nif: "05/A/0459 725 19/00",
      rc: "1 9681 931 002 71 37"
    },
    {
      fullName: "ziadi issam",
      address: "rue hakate tahar",
      willaya: "seif",
      phone: "193 192 004 747 128 01 900",
      activity: "commerce detail produit minoterie",
      art: "19080117028",
      nis: "22a5716165-00/19",
      nif: "19080117028",
      rc: "193 192 004 747 128 01 900"
    },
    {
      fullName: "SALHI FARIDA",
      address: "cite fermatou",
      willaya: "SETIF",
      phone: "196819310027137",
      activity: "commersce de detail de lalimenttation",
      art: "2 975 1901 07429 20",
      nis: "275 190 107 429 118",
      nif: "09 A 0479899",
      rc: "196819310027137"
    },
    {
      fullName: "SARL PASTA WORD",
      address: "zone dactivite",
      willaya: "bejaia",
      phone: "0 009 0625 00258 50",
      activity: "production pate allimentaires",
      art: "6252499856",
      nis: "0009060186 321 15",
      nif: "06/00-0186321B09",
      rc: "0 009 0625 00258 50"
    },
    {
      fullName: "SARL PASTA WORD  --",
      address: "zone dactivite",
      willaya: "bejaia",
      phone: "0009062500258 50",
      activity: "commerce gros des legumes sec",
      art: "6252499856",
      nis: "0009060186 32 115",
      nif: "06/13-0186321B09",
      rc: "0009062500258 50"
    },
    {
      fullName: "Makhenfer ahmed",
      address: "centre ville",
      willaya: "Ain gazam",
      phone: "174 193 900 818 111 054 00",
      activity: "distrubiteur ambilant d'allimentation",
      art: "54010004328",
      nis: "54/00-1016726A07",
      nif: "54010004328",
      rc: "174 193 900 818 111 054 00"
    },
    {
      fullName: "BEN SAOUD ABDENOUR",
      address: "PART282LOGT",
      willaya: "SETIF",
      phone: "188 190 103 219 117",
      activity: "boulangerie Industrielle",
      art: "19261630051",
      nis: "19/00-5330797A19",
      nif: "19261630051",
      rc: "188 190 103 219 117"
    },
    {
      fullName: "GHELLEB YOUCEF",
      address: "lits24 n15ct moujahidin",
      willaya: "setif",
      phone: "1 988 119 020 131 330",
      activity: "gros legs secs prod/minoterie",
      art: "19020519208",
      nis: "18819020 1313173",
      nif: "57 12487/A/21",
      rc: "1 988 119 020 131 330"
    },
    {
      fullName: "ziadi issam",
      address: "cite harkete ettaher",
      willaya: "setif",
      phone: "19 319 200 474 712 800 000",
      activity: "commerc detail legumes secs",
      art: "19080117028",
      nis: "22A5716165-00/19",
      nif: "19080117028",
      rc: "19 319 200 474 712 800 000"
    },
    {
      fullName: "BEN SAIDI ZIANE",
      address: "Ain elmelh msila",
      willaya: "MSILA",
      phone: "18 328 410 035 716 800",
      activity: "FELLAH",
      art: "28410395145",
      nis: "421406",
      nif: "28410395145",
      rc: "18 328 410 035 716 800"
    },
    {
      fullName: "Boudissa mouhamed",
      address: "cite istiklal local1",
      willaya: "MSILA",
      phone: "1 993 2841 01287 19",
      activity: "commerce de gros des legumes",
      art: "28/00-2890123A22",
      nis: "19 328 410 128 714 600 000",
      nif: "28/00-2890123A22",
      rc: "1 993 2841 01287 19"
    },
    {
      fullName: "hadjres khaked",
      address: "cite 200 logt ain kbira",
      willaya: "seif",
      phone: "1 961 902 007 431 300 000",
      activity: "commerce gros de produit minoterie",
      art: "19020499081",
      nis: "19/005711065a20",
      nif: "19020499081",
      rc: "1 961 902 007 431 300 000"
    },
    {
      fullName: "SABAIE SAMIR",
      address: "CHIKH EL AIFA",
      willaya: "seif",
      phone: "176 190 104 208 162",
      activity: "boulangerie Industrielle",
      art: "1900449307 a 07",
      nis: "1900449307 a 07",
      nif: "1900449307 a 07",
      rc: "176 190 104 208 162"
    },
    {
      fullName: "Salhi houssam",
      address: "rue bahri el khir n03",
      willaya: "setif",
      phone: "1990 0542 03074 37",
      activity: "boulangerie industrielle",
      art: "19/00-5316562A16",
      nis: "19 005 420 307 416 100",
      nif: "19/00-5316562A16",
      rc: "1990 0542 03074 37"
    },
    {
      fullName: "ABID LARBI",
      address: "cite19juin1965comune",
      willaya: "setif",
      phone: "17719320040 119",
      activity: "commerce de gros des legumes",
      art: "19322598801",
      nis: "21A5712865-19/00",
      nif: "19322598801",
      rc: "17719320040 119"
    },
    {
      fullName: "BENHAMADI MOUNIR",
      address: "lotissement el tolma",
      willaya: "bba",
      phone: "1977 3402 0055 530",
      activity: "commerce detail alimentation",
      art: "34020316311",
      nis: "34/00-2322867a00",
      nif: "34020316311",
      rc: "1977 3402 0055 530"
    },
    {
      fullName: "ROUANE MOUHAMED",
      address: "AIN ERICH Msila",
      willaya: "Msila",
      phone: "199128410151 722",
      activity: "commercant ambiulant",
      art: "28440272265",
      nis: "191284101517 101",
      nif: "28/01-2887437D21",
      rc: "199128410151 722"
    },
    {
      fullName: "DJALIDI KHELIFA",
      address: "cite balouta n04",
      willaya: "alger",
      phone: "197 716 450 019 231",
      activity: "vente gros de legume sec",
      art: "16450460232",
      nis: "1 771 653 001 921 340",
      nif: "16/01-4911569a09",
      rc: "197 716 450 019 231"
    },
    {
      fullName: "MANSEUR Mounir",
      address: "cite adrrar ihaddaden",
      willaya: "bejaia",
      phone: "83060104828 121",
      activity: "fabrication de pates alimentaires",
      art: "6017701654",
      nis: "06/00 0956604a09",
      nif: "6017701654",
      rc: "83060104828 121"
    },
    {
      fullName: "LAMIRI AMIR",
      address: "cite 83 logts",
      willaya: "setif",
      phone: "196192801583 155",
      activity: "commerce detail dalimentation general",
      art: "19521024130",
      nis: "22A5341342",
      nif: "19521024130",
      rc: "196192801583 155"
    },
    {
      fullName: "ben seidi boulanouar",
      address: "ain l malh",
      willaya: "mssilla",
      phone: "19822841 0064131 00",
      activity: "commerce de detail des legumes secs",
      art: "28410393855",
      nis: "182284100641116 00",
      nif: "20a2884999-28/01",
      rc: "19822841 0064131 00"
    },
    {
      fullName: "fardjalah faycel",
      address: "djemila",
      willaya: "SETIF",
      phone: "1791921002141 48",
      activity: "boulangerie",
      art: "14A0507678-19/00",
      nis: "14A0507678-19/00",
      nif: "14A0507678-19/00",
      rc: "1791921002141 48"
    },
    {
      fullName: "EURL benhmida hocine",
      address: "tiner commune ouled",
      willaya: "setif",
      phone: "000319030813 951",
      activity: "biscuiterie",
      art: "19030017092",
      nis: "19/01 0085301b03",
      nif: "19030017092",
      rc: "000319030813 951"
    },
    {
      fullName: "KRACHNI lahcene",
      address: "cite abdalah chalah",
      willaya: "bba",
      phone: "1969190104884 19",
      activity: "commerce detail legumes sec",
      art: "34090613976",
      nis: "1691901048841760 34 02",
      nif: "34/02-2322016a00",
      rc: "1969190104884 19"
    },
    {
      fullName: "khelifi sami",
      address: "bir haddada",
      willaya: "setif",
      phone: "19880542 0235036",
      activity: "boulangerie Industrielle",
      art: "20A5710445",
      nis: "188 054 202 350 157",
      nif: "20A5710445",
      rc: "19880542 0235036"
    },
    {
      fullName: "MERAR AMAR",
      address: "ZONE INDUSTRIEL",
      willaya: "boumerdes",
      phone: "179 154 000 659 184",
      activity: "commerce gros de legume secs",
      art: "35080248265",
      nis: "14A0306655-00/35",
      nif: "35080248265",
      rc: "179 154 000 659 184"
    },
    {
      fullName: "chettah hacene",
      address: "zen toussan",
      willaya: "skikda",
      phone: "17121260 0102 110",
      activity: "commerce gros de produits minoterie",
      art: "21260525041",
      nis: "21/02-0717666A98",
      nif: "21260525041",
      rc: "17121260 0102 110"
    },
    {
      fullName: "BENKAHILA ISLEM",
      address: "locallN02 bir haddada",
      willaya: "SETIF",
      phone: "199 419010826820",
      activity: "commerce de gros des legumes",
      art: "19340169015",
      nis: "19419010826817700 000",
      nif: "21A5712263-00/19",
      rc: "199 419010826820"
    },
    {
      fullName: "DAOUD FARID",
      address: "ouled seghir",
      willaya: "SETIF",
      phone: "1987192 00169812",
      activity: "commerce en gros de",
      art: "19310120579",
      nis: "1 8719201698196",
      nif: "10A0485136-01/19",
      rc: "1987192 00169812"
    },
    {
      fullName: "OUSSACI MOKHTAR",
      address: "rue daoud salah",
      willaya: "setif",
      phone: "170 190 105 795 124",
      activity: "boulangerie Industrielle",
      art: "19/00-05076771a44",
      nis: "19/00-05076771a44",
      nif: "19/00-05076771a44",
      rc: "170 190 105 795 124"
    },
    {
      fullName: "mokrani merzak",
      address: "29rue kaddara lakhdaria",
      willaya: "bouira",
      phone: "167 101 300 492 108",
      activity: "commerce gros de",
      art: "10130668020",
      nis: "98a1413207",
      nif: "10130668020",
      rc: "167 101 300 492 108"
    },
    {
      fullName: "Okrifi Ahmed",
      address: "Ain lahdjal Msila",
      willaya: "MSILA",
      phone: "171 281 700 076 157",
      activity: "commercant ambiulant",
      art: "28170532331",
      nis: "28/00-2880250D18",
      nif: "28170532331",
      rc: "171 281 700 076 157"
    },
    {
      fullName: "OKRIFI HAKIM",
      address: "Ain lahdjal Msila",
      willaya: "Msila",
      phone: "176281700355430 0000",
      activity: "commercant ambiulant",
      art: "28170532461",
      nis: "28/00-2884067D20",
      nif: "28170532461",
      rc: "176281700355430 0000"
    },
    {
      fullName: "SARL BISTA PRODA",
      address: "place hathaaire",
      willaya: "bouira",
      phone: "91002834040 403",
      activity: "fabrication aliment de betail",
      art: "10/00-0283404 b09",
      nis: "10/00-0283404 b09",
      nif: "10/00-0283404 b09",
      rc: "91002834040 403"
    },
    {
      fullName: "agagna mohammed",
      address: "cite houwari boumadien",
      willaya: "djelfa",
      phone: "187170300029 1510700",
      activity: "boulangerie Industrielle",
      art: "17/00-1556427A23",
      nis: "17/00-1556427A23",
      nif: "17/00-1556427A23",
      rc: "187170300029 1510700"
    },
    {
      fullName: "MOHAMED MIBARKI",
      address: "cite okba iben nafaa",
      willaya: "djelfa",
      phone: "1991720004531200 17",
      activity: "commerce detail de legumes sece",
      art: "17/00-1554032A22",
      nis: "17/00-1554032A22",
      nif: "17/00-1554032A22",
      rc: "1991720004531200 17"
    },
    {
      fullName: "DJELIDI KHELIFA",
      address: "cite bellouta n04 staoueli",
      willaya: "ALGER",
      phone: "197716450019 231",
      activity: "vente engros legumes sec",
      art: "16450460232",
      nis: "177165300192 1340",
      nif: "16/01-491 1569A09",
      rc: "197716450019 231"
    },
    {
      fullName: "boukhechem sabir",
      address: "route nationale n43",
      willaya: "JIJEL",
      phone: "199 318 090 191 322",
      activity: "commerce de gros des legumes",
      art: "18090324985",
      nis: "1931 80901913152/18001",
      nif: "18/01-2264028A18",
      rc: "199 318 090 191 322"
    },
    {
      fullName: "BOUDISSA ABDELKADER",
      address: "APC ain elmelh",
      willaya: "MSILLA",
      phone: "17828410 0718111",
      activity: "marchand ambulant",
      art: "28410380330",
      nis: "28/02-2844586B08",
      nif: "28410380330",
      rc: "17828410 0718111"
    },
    {
      fullName: "belkaibeche hassen",
      address: "batail djbel thamer",
      willaya: "msila",
      phone: "183 282 003 167 194",
      activity: "marchand ambulant aliment betail",
      art: "28410393015",
      nis: "13d2864083-28/01",
      nif: "28410393015",
      rc: "183 282 003 167 194"
    },
    {
      fullName: "MEKHANFER BELGACEM",
      address: "el merdjat-ksar",
      willaya: "setif",
      phone: "1991 1928 01241 35",
      activity: "Counditionnement et emballage de",
      art: "19 521 102 011",
      nis: "191192801241 1230 1902",
      nif: "15A 0510 102-02/19",
      rc: "1991 1928 01241 35"
    },
    {
      fullName: "hirech ishak",
      address: "bazer sakhra elema",
      willaya: "setif",
      phone: "1961920037391009 00",
      activity: "commerce detail aliment betail",
      art: "19310400208",
      nis: "22a5716104 19/00",
      nif: "19310400208",
      rc: "1961920037391009 00"
    },
    {
      fullName: "BOUAKKAZ KHOUTHIR",
      address: "lot 101 lot gr tobal",
      willaya: "setif",
      phone: "19 919 200 153 218 200 000",
      activity: "commerce detail produit minoterie",
      art: "19081201102",
      nis: "19a5331117 19/00",
      nif: "19081201102",
      rc: "19 919 200 153 218 200 000"
    },
    {
      fullName: "LAGRAA AMER",
      address: "el zaouia sec 10",
      willaya: "setif",
      phone: "1851920009311 98",
      activity: "commerce detail des legume sec",
      art: "19310171311",
      nis: "15A0514039 19/04",
      nif: "19310171311",
      rc: "1851920009311 98"
    },
    {
      fullName: "makhloufi nabil",
      address: "lotissement 151 LGT",
      willaya: "setif",
      phone: "1980192801 31041",
      activity: "commerce de gros de denrees",
      art: "1928338021",
      nis: "1801928013 1010500000",
      nif: "19/00-4419973/A/07",
      rc: "1980192801 31041"
    },
    {
      fullName: "makhanfar belgassem",
      address: "cite miliani abdkrim",
      willaya: "setif",
      phone: "1911928012411 23 01901",
      activity: "commerce en gros alimentaion general",
      art: "19280255003",
      nis: "19/01-0510102a15",
      nif: "19280255003",
      rc: "1911928012411 23 01901"
    },
    {
      fullName: "silem yaakob",
      address: "10 cite hajab yahia",
      willaya: "om elbouaghi",
      phone: "199 904 0200 66 6420",
      activity: "commerce gros de leguimes sec",
      art: "4020826350",
      nis: "1990 4020 0664 1200 04",
      nif: "04/00-2070470 a23",
      rc: "199 904 0200 66 6420"
    },
    {
      fullName: "benchanaa nourredine",
      address: "hay eljomhouria",
      willaya: "galma",
      phone: "1981 24040071240",
      activity: "commerce detail alimentation",
      art: "24050030826",
      nis: "181 240 400 712 128",
      nif: "24/00-1925063A05",
      rc: "1981 24040071240"
    },
    {
      fullName: "lekhal mouloud",
      address: "lot 279 n 269",
      willaya: "mila",
      phone: "196343040035 439",
      activity: "commerce detail de legumes sece",
      art: "43040450271",
      nis: "99A1615842-00/43",
      nif: "43040450271",
      rc: "196343040035 439"
    },
    {
      fullName: "barkket fathi",
      address: "bourje ghdir",
      willaya: "bba",
      phone: "18 734 010 261 313 900 000",
      activity: "commerce detail de legumes sece",
      art: "34/00-2375738/A/21",
      nis: "34/00-2375738/A/21",
      nif: "34/00-2375738/A/21",
      rc: "18 734 010 261 313 900 000"
    },
    {
      fullName: "messaoudi abdelhamid",
      address: "loc n 02 zana",
      willaya: "batna",
      phone: "189 055 400 072 154",
      activity: "detail de legumes secs et produits",
      art: "5803802540",
      nis: "19a1196193-02/05",
      nif: "5803802540",
      rc: "189 055 400 072 154"
    },
    {
      fullName: "CHADLI abdelkader",
      address: "cite 16 avril apc sidi aissa",
      willaya: "MSILA",
      phone: "19 828 160 168 411 300 000",
      activity: "commerce anmbilant aliment betail",
      art: "28160766886",
      nis: "28/02-2887413d21",
      nif: "28160766886",
      rc: "19 828 160 168 411 300 000"
    },
    {
      fullName: "ben boudina ahmed",
      address: "quartier ahmed zabana",
      willaya: "msila",
      phone: "1977 28410051231",
      activity: "commerce de detail de legumes",
      art: "28410393370",
      nis: "277284100512 185",
      nif: "28/01-2879590A18",
      rc: "1977 28410051231"
    },
    {
      fullName: "amedjkane fateh",
      address: "RDC boudjima",
      willaya: "tizi ouzou",
      phone: "1911501008741 33",
      activity: "grossiste de legumes sec et",
      art: "315/00-5516965A21",
      nis: "315/00-5516965A21",
      nif: "315/00-5516965A21",
      rc: "1911501008741 33"
    },
    {
      fullName: "sarl nakhla",
      address: "abiod medjadja",
      willaya: "chelef",
      phone: "0 99990209031 66 55",
      activity: "fabrication aliment",
      art: "0 2283004625",
      nis: "99/B/0903166",
      nif: "0 2283004625",
      rc: "0 99990209031 66 55"
    },
    {
      fullName: "KRACHNI LAHCEN",
      address: "CITE DE L AVENIR C22A13 SETIF",
      willaya: "setif",
      phone: "1969 1901 04884 19",
      activity: "distrubiteur ambilant d'allimentation",
      art: "19014335051",
      nis: "169 190 104 884 176 000",
      nif: "19/01-2322016D00",
      rc: "1969 1901 04884 19"
    },
    {
      fullName: "Rachdi Mounir",
      address: "part 308 lot ain el roumin prt 32",
      willaya: "setif",
      phone: "1771901026 12115",
      activity: "Commerce gros des produits",
      art: "19470090452",
      nis: "19/04-0424785A98",
      nif: "19470090452",
      rc: "1771901026 12115"
    },
    {
      fullName: "salhi houssam",
      address: "bizar setif",
      willaya: "setif",
      phone: "19/00-5316562a16",
      activity: "Boulangerie Industrielle",
      art: "setif",
      nis: "setif",
      nif: "setif",
      rc: "19/00-5316562a16"
    },
    {
      fullName: "SARL ABIDI SAAD Services",
      address: "Local n\xB0 02 Hai El Badr",
      willaya: "tindof",
      phone: "000 637064211 743",
      activity: "Commerce detail",
      art: "37010006366",
      nis: "37/04-0642117B06",
      nif: "37010006366",
      rc: "000 637064211 743"
    },
    {
      fullName: "khalfi mouhamed",
      address: "cit 5 juillet 1962",
      willaya: "setif",
      phone: "19/00-5317998A17",
      activity: "Boulangerie Industrielle",
      art: "setif",
      nis: "setif",
      nif: "setif",
      rc: "19/00-5317998A17"
    },
    {
      fullName: "snc krachni et freres detail",
      address: "cit yahiaoui",
      willaya: "setif",
      phone: "0 001 342807172056005",
      activity: "commerce detail alimentation",
      art: "19016097033",
      nis: "00013 40 4627198319005",
      nif: "19/05-0462719B01",
      rc: "0 001 342807172056005"
    },
    {
      fullName: "CHAHMANA OMAR",
      address: "CITE AIN KASRIA",
      willaya: "setif",
      phone: "1 975 1928 00525 24",
      activity: "marchand ambulant de boissons",
      art: "19 281 115 057",
      nis: "17 519 280 052 513 900",
      nif: "19/00-049233d07",
      rc: "1 975 1928 00525 24"
    },
    {
      fullName: "daoud farid",
      address: "oueled seghir",
      willaya: "setif",
      phone: "198 719 200 169 812",
      activity: "commerce gros de leguimes sec",
      art: "19310230451",
      nis: "187 192 001 698 196",
      nif: "10a0485136-01/19",
      rc: "198 719 200 169 812"
    },
    {
      fullName: "haddad farid",
      address: "local n\xB003",
      willaya: "bba",
      phone: "1979 3409 00556 16",
      activity: "commerce detail de legumes sece",
      art: "34090614037",
      nis: "179340 90055613700000",
      nif: "34/00-2379076A22",
      rc: "1979 3409 00556 16"
    },
    {
      fullName: "bensalem ahmed",
      address: "cite amar kalol",
      willaya: "bba",
      phone: "1893401038871 1400000",
      activity: "commerce detail legumes sec",
      art: "34/00-2359464A14",
      nis: "34/00-2359464A14",
      nif: "34/00-2359464A14",
      rc: "1893401038871 1400000"
    },
    {
      fullName: "khanouf antter",
      address: "cite 08 mai 1945",
      willaya: "bba",
      phone: "34/00-2358058/A/14",
      activity: "commerce detail des legumes sec",
      art: "34 090 612 715",
      nis: "34 090 612 715",
      nif: "34 090 612 715",
      rc: "34/00-2358058/A/14"
    },
    {
      fullName: "barkat keltoum",
      address: "cite el sog bourj",
      willaya: "bba",
      phone: "293 340 105 957 170",
      activity: "commerce detail des legumes sec",
      art: "34090613627",
      nis: "34/00-2373813/A/20",
      nif: "34090613627",
      rc: "293 340 105 957 170"
    },
    {
      fullName: "CIRTA BISCUIT",
      address: "zone activite 33",
      willaya: "setif",
      phone: "9981890082290 17",
      activity: "production biscuit",
      art: "190433 3021",
      nis: "98b0082290-00/19",
      nif: "190433 3021",
      rc: "9981890082290 17"
    },
    {
      fullName: "ADDALA FOUAD",
      address: "coop el tahadi",
      willaya: "setif",
      phone: "198 419 430 223 135",
      activity: "commerces gros legumes sec",
      art: "19 433 008 341",
      nis: "1841 9430 2231 1860 00",
      nif: "21A5334746 19/00",
      rc: "198 419 430 223 135"
    },
    {
      fullName: "keraghel amine",
      address: "Ras el Ma",
      willaya: "setif",
      phone: "198419010764 327",
      activity: "commerce gros legumes et des",
      art: "19170050108",
      nis: "184190107643136 00000",
      nif: "11A0486176-19/00",
      rc: "198419010764 327"
    },
    {
      fullName: "CHEBHI ZINEDDINE",
      address: "coop n29 section",
      willaya: "bba",
      phone: "1 992 340 201 136",
      activity: "commerce des ieguimes sec detail",
      art: "34020624994",
      nis: "192 340 201 136 177",
      nif: "21a2377472 34/01",
      rc: "1 992 340 201 136"
    },
    {
      fullName: "taibi moussa",
      address: "cite madhi moussa",
      willaya: "mila",
      phone: "7 978 0421 00050 40",
      activity: "commerce detail alliment betail",
      art: "43/00-1662048a15",
      nis: "1750421000504430 0",
      nif: "43/00-1662048a15",
      rc: "7 978 0421 00050 40"
    },
    {
      fullName: "krachni lahcenne",
      address: "cite abdalah chalah",
      willaya: "bba",
      phone: "196 91901 0488419",
      activity: "commerce gros de produit",
      art: "340 9061976",
      nis: "1691901048 84176",
      nif: "34/00 2322016 a 00",
      rc: "196 91901 0488419"
    },
    {
      fullName: "SNC KRACHNI ET FRERE",
      address: "ZAA n\xB011lot 04 n\xB064 local 02",
      willaya: "setif",
      phone: "000134280717 256002",
      activity: "Commerce de gros de alimentation",
      art: "19170090282",
      nis: "000134046271983_19002",
      nif: "01B0462719-02/19",
      rc: "000134280717 256002"
    },
    {
      fullName: "ZALLAGUI AHMED",
      address: "CIT 234 GUMMAS",
      willaya: "CONSTANTINE",
      phone: "1 995 2501 22250 40",
      activity: "TRASPORTEUR DE MARCHANDIS",
      art: "25016863126",
      nis: "195 250 102 250 177",
      nif: "21A0404794 25/00",
      rc: "1 995 2501 22250 40"
    },
    {
      fullName: "SNC KRACHNI ET FRERES BISKRA",
      address: "eqipemant",
      willaya: "biskra",
      phone: "0 001 3428 07172 56 004",
      activity: "Commerce de gros de legumes",
      art: "0 7170014447",
      nis: "00 134046271983",
      nif: "01B0462719",
      rc: "0 001 3428 07172 56 004"
    },
    {
      fullName: "mechaia abbes",
      address: "cite oued el bab",
      willaya: "cne derrahi bousselah",
      phone: "1982430200934 28",
      activity: "commerce detail",
      art: "43200971275",
      nis: "18243020093414 6",
      nif: "20A1673521-01/43",
      rc: "1982430200934 28"
    },
    {
      fullName: "ferhi fatima",
      address: "coop334",
      willaya: "mila",
      phone: "2957430600 01345",
      activity: "commerce detail",
      art: "43060571211",
      nis: "01A1625416-00/43",
      nif: "43060571211",
      rc: "2957430600 01345"
    },
    {
      fullName: "sarl mister green",
      address: "rue chatouan apc",
      willaya: "setif",
      phone: "00201 900942558319002",
      activity: "commerce gros de produit",
      art: "19340164070",
      nis: "00 2019010042661",
      nif: "19/ 02-0094155B20",
      rc: "00201 900942558319002"
    },
    {
      fullName: "sarl mister green",
      address: "cite el salam BLC",
      willaya: "el bayedh",
      phone: "0 00 2019009425583320",
      activity: "commerce gros de produit",
      art: "32 010 010 004",
      nis: "01/32-0094255B20",
      nif: "32 010 010 004",
      rc: "0 00 2019009425583320"
    },
    {
      fullName: "SARL ABIDI SAAD Services",
      address: "Local n\xB0 02 Hai El Badr",
      willaya: "tindof",
      phone: "000 637064211 743",
      activity: "Commerce detail",
      art: "37010006366",
      nis: "37/04-0642117B06",
      nif: "37010006366",
      rc: "000 637064211 743"
    },
    {
      fullName: "SNCKRACHNI et frere",
      address: "local 1+2cite salaga part",
      willaya: "TINDOUF",
      phone: "00013428071 72 56",
      activity: "commerce gros des produits",
      art: "370100083 68",
      nis: "000 134046271983 3701",
      nif: "37/01-0462719B01",
      rc: "00013428071 72 56"
    },
    {
      fullName: "snc krachni et freresbba",
      address: "commerce detail des produits",
      willaya: "bba",
      phone: "0",
      activity: "commerce detail des produits",
      art: "37010008368",
      nis: "000 134046271983 37/01",
      nif: "37/01-0462719B01",
      rc: "0"
    },
    {
      fullName: "dahman lyamine",
      address: "cite baaira ain el mane",
      willaya: "setif",
      phone: "19 519280011413701900",
      activity: "marchand ambulant de boissons",
      art: "1928164305 0",
      nis: "23D5342008-19/00",
      nif: "1928164305 0",
      rc: "19 519280011413701900"
    },
    {
      fullName: "chahmana omar",
      address: "cite ain kasria",
      willaya: "setif",
      phone: "1975192800525 24",
      activity: "gros de legumes sec et prouduits",
      art: "19281115057",
      nis: "17519 280052513900",
      nif: "19/00-049233D07",
      rc: "1975192800525 24"
    },
    {
      fullName: "daoud farid",
      address: "bazer sakra el eulma",
      willaya: "setif",
      phone: "1987192001698 12",
      activity: "cgros des legume sec et produit de",
      art: "19310230451",
      nis: "10A0485136 19/01",
      nif: "19310230451",
      rc: "1987192001698 12"
    },
    {
      fullName: "zaboub omar",
      address: "rue mostfa ben",
      willaya: "setif",
      phone: "19 791200302045",
      activity: "commerces detail legume secs et",
      art: "19208603517",
      nis: "16A5312455319/00",
      nif: "19208603517",
      rc: "19 791200302045"
    },
    {
      fullName: "alla eddine chorfi",
      address: "cit bouziane",
      willaya: "khenchela",
      phone: "1 998 4001 01171 41",
      activity: "commerce detail des produits",
      art: "40014558732",
      nis: "1984001011711 38",
      nif: "19A2437419",
      rc: "1 998 4001 01171 41"
    },
    {
      fullName: "mounir ziada",
      address: "cit chaab errsas",
      willaya: "constantine",
      phone: "100225010022 137",
      activity: "commerce detail des produits",
      art: "25016202213",
      nis: "10225010022 115000000",
      nif: "21A0402568",
      rc: "100225010022 137"
    },
    {
      fullName: "belhouchat akram",
      address: "cite gamas 800log",
      willaya: "constantine",
      phone: "10022501 0355523",
      activity: "commerce detail des produits",
      art: "25016931578",
      nis: "1022501035551 3600000",
      nif: "25/01-0403611a21",
      rc: "10022501 0355523"
    },
    {
      fullName: "benbott khaled",
      address: "local01 02 ain mlila",
      willaya: "om elbouaghi",
      phone: "1988040303102 48",
      activity: "commerce de gros des produits",
      art: "4030037500",
      nis: "1880403031021 03",
      nif: "21/a2065933 04/00",
      rc: "1988040303102 48"
    },
    {
      fullName: "machaya abass",
      address: "cite derahi farjiwa",
      willaya: "milia",
      phone: "1982 43020934 28",
      activity: "commerce de gros des produits",
      art: "43200971275",
      nis: "182 430 200 934 146",
      nif: "20a1673521-00/43",
      rc: "1982 43020934 28"
    },
    {
      fullName: "benyahia djamal",
      address: "commerce de gros des produits",
      willaya: "bejaia",
      phone: "15806340007618 9",
      activity: "commerce de gros des produits",
      art: "0 612202065",
      nis: "97a0910938",
      nif: "0 612202065",
      rc: "15806340007618 9"
    },
    {
      fullName: "azazga mohamed",
      address: "tala ifassen setif",
      willaya: "Minoterie",
      phone: "08A0474969-00/19",
      activity: "commerce gros des produits",
      art: "Minoterie",
      nis: "Minoterie",
      nif: "Minoterie",
      rc: "08A0474969-00/19"
    },
    {
      fullName: "ben nazar amar",
      address: "commerce gros des produits",
      willaya: "mila",
      phone: "1616243A99",
      activity: "commerce gros des produits",
      art: "4330523861",
      nis: "1616243A99",
      nif: "4330523861",
      rc: "1616243A99"
    },
    {
      fullName: "sarl ouled el hadj said",
      address: "local 01 anaser sidimoussa",
      willaya: "BBA",
      phone: "0017342890025 38",
      activity: "commerce gros des produits a",
      art: "342800919 21",
      nis: "34/00-046534 b 17",
      nif: "342800919 21",
      rc: "0017342890025 38"
    },
    {
      fullName: "eurl djemai agro star",
      address: "commerce gros des produit",
      willaya: "BBA",
      phone: "1985194200055 31",
      activity: "commerce gros des produit",
      art: "1917010019",
      nis: "185194200055 31",
      nif: "19/01-0510517D15",
      rc: "1985194200055 31"
    },
    {
      fullName: "reguigue bonaasse",
      address: "FELLAH",
      willaya: "setif",
      phone: "183511-01-04b25-19",
      activity: "FELLAH",
      art: "fellah",
      nis: "183511-01-04b25-19",
      nif: "fellah",
      rc: "183511-01-04b25-19"
    },
    {
      fullName: "Nasri Boudiaf",
      address: "Guedjal Setif",
      willaya: "setif",
      phone: "19851942 0005531",
      activity: "Commerce Marche Ambu",
      art: "19170100193",
      nis: "185194200 055161",
      nif: "19/01-0510517D15",
      rc: "19851942 0005531"
    },
    {
      fullName: "Kasa Khaled",
      address: "eloulma setif",
      willaya: "setif",
      phone: "1801929004961 070000",
      activity: "Vente gros legume sec et",
      art: "19200646186",
      nis: "00A0438405-03-19",
      nif: "19200646186",
      rc: "1801929004961 070000"
    },
    {
      fullName: "bohjar Amhamed",
      address: "cite Sersoufe APC Tamenrassete",
      willaya: "Tamenrassete",
      phone: "7992012590 01321",
      activity: "Commerce gros des produits liees",
      art: "11010318980",
      nis: "79920125002 6624",
      nif: "11/03-1013681 A02",
      rc: "7992012590 01321"
    },
    {
      fullName: "Silem Abdrezek",
      address: "Meskiana et Oum elbouaki",
      willaya: "OumElbouaki",
      phone: "39690402000 0939",
      activity: "Commerce gros des produits liees",
      art: "4020490898",
      nis: "04/01-2048827A13",
      nif: "4020490898",
      rc: "39690402000 0939"
    },
    {
      fullName: "Mabrouk Djalal",
      address: "Local N02 Kasr palazma",
      willaya: "Batna",
      phone: "1890540147 7178",
      activity: "Commerce gros des produits liees",
      art: "5280101375",
      nis: "17 A 301565502/05",
      nif: "5280101375",
      rc: "1890540147 7178"
    },
    {
      fullName: "Rachdi Mounir",
      address: "coop immo numedia",
      willaya: "Alger",
      phone: "1771901 02612115",
      activity: "Commerce gros des produits",
      art: "16263555000",
      nis: "98 a 0424785-03/16",
      nif: "16263555000",
      rc: "1771901 02612115"
    },
    {
      fullName: "Goumidi Mourad",
      address: "Rue Lamarde Bekouche N44",
      willaya: "Setif",
      phone: "192015 867",
      activity: "Boulengerie",
      art: "1920124 7521",
      nis: "1972193200 2443",
      nif: "0274 70",
      rc: "192015 867"
    },
    {
      fullName: "Bouadjel AbdSellam",
      address: "Cite Bourouth Ferjiwa Mila",
      willaya: "Mila",
      phone: "1654302001 96105",
      activity: "G Commerece Gros Produits",
      art: "Mila",
      nis: "99A1619179-00/43",
      nif: "Mila",
      rc: "1654302001 96105"
    },
    {
      fullName: "Sidiouthman eltakwa",
      address: "Ouled Cjebelle Bir Touta",
      willaya: "Alger",
      phone: "1634010 7755",
      activity: "Commerce gros produit De",
      art: "163600086 1664",
      nis: "20161010156 8845",
      nif: "16/00-101568845",
      rc: "1634010 7755"
    },
    {
      fullName: "Barkani Abdeljalil",
      address: "Oum el Bouaki",
      willaya: "Oum el Bouaki",
      phone: "19920402022 7147",
      activity: "Commerce gros des produits",
      art: "Oum el Bouaki",
      nis: "04/00-205866 A 14",
      nif: "Oum el Bouaki",
      rc: "19920402022 7147"
    },
    {
      fullName: "Stouh Abdrezak",
      address: "marfaza N 01 salah bochaoure",
      willaya: "skikda",
      phone: "18221250001 9107",
      activity: "commerece gros liees a l'alim",
      art: "555220521",
      nis: "21/00815600019107",
      nif: "555220521",
      rc: "18221250001 9107"
    },
    {
      fullName: "FARROUDJI SAID",
      address: "Apc Zana Elbaydha et batna",
      willaya: "Batna",
      phone: "18405040012 1189",
      activity: "Vente gros des produits lies a",
      art: "5540500771",
      nis: "05/00-1139028A05",
      nif: "5540500771",
      rc: "18405040012 1189"
    },
    {
      fullName: "Denia Adel",
      address: "vente detail de produits",
      willaya: "OumElbouaki",
      phone: "19790412000 3642",
      activity: "vente detail de produits",
      art: "4030034878",
      nis: "17904120003 6190",
      nif: "04/00-2062548A19",
      rc: "19790412000 3642"
    },
    {
      fullName: "Fortas AbdelHak",
      address: "Cite El swalhia local",
      willaya: "Oumelbouaki",
      phone: "19802506017 58124",
      activity: "Comerce Detail De produits",
      art: "4030033299",
      nis: "1802506175 8124",
      nif: "04/01-2059197A18",
      rc: "19802506017 58124"
    },
    {
      fullName: "Bouali Ali",
      address: "Local 1 er Takhsis Soualhia",
      willaya: "Oumelbouaki",
      phone: "1991040300 92826",
      activity: "Comerce Detail De produits",
      art: "05824342 042",
      nis: "19104300928 132",
      nif: "04/00-2063941A19",
      rc: "1991040300 92826"
    },
    {
      fullName: "Loaar Hamza",
      address: "Tamsis Belvue 01N:06",
      willaya: "Oumelbouaki",
      phone: "1985041700 22342",
      activity: "Boulangerie Industrielle",
      art: "04170092 728",
      nis: "18504170022311 200000",
      nif: "04/01 2066701121",
      rc: "1985041700 22342"
    },
    {
      fullName: "Ramzi Fortas",
      address: "cite Boha Belarbi- lot62",
      willaya: "Oumelbouaki",
      phone: "19822506007 9816",
      activity: "Commerece Detail de produits",
      art: "48-11037263",
      nis: "1822506007981 a 17",
      nif: "04/012057931 a 17",
      rc: "19822506007 9816"
    },
    {
      fullName: "NAWI HAMZA",
      address: "Cite ALKHAMASSA N:236",
      willaya: "constantine",
      phone: "1994250114 17237",
      activity: " ",
      art: "250168 829019",
      nis: "1942501141 72146",
      nif: "25/00_0396351a19",
      rc: "1994250114 17237"
    },
    {
      fullName: "HACHMI WALID",
      address: "Cite essada El m`ghaiir El oued",
      willaya: " ",
      phone: "1942501092 8919500000",
      activity: " ",
      art: "392700 02415",
      nis: "1994250109 28917",
      nif: "39/00-2758912A20",
      rc: "1942501092 8919500000"
    },
    {
      fullName: "Alarossi Ali",
      address: "Cite algharbi coperative sidi",
      willaya: "ADRAR",
      phone: "7970902990 01404",
      activity: "Commerce gros(Alimentation",
      art: "125000 383",
      nis: "1055708000 02664",
      nif: "01/09-4414072 A00",
      rc: "7970902990 01404"
    },
    {
      fullName: "Mellit karim",
      address: "Bougaoud Larbi rcd Emillia",
      willaya: "JIJEL",
      phone: "1983180902 44624",
      activity: "Vente Gros legume sec et",
      art: "180902 3755",
      nis: "1831809024 4610300000",
      nif: "18/00-2269382a20",
      rc: "1983180902 44624"
    },
    {
      fullName: "Hafsi Nasreddine",
      address: "Cite freres Arafa N:281",
      willaya: "constantine",
      phone: "1983250111 76918",
      activity: "Commerce Multiple gros",
      art: "250138 58438",
      nis: "1832501176 916000000",
      nif: "25/00-0402363a21",
      rc: "1983250111 76918"
    }
  ];
  const createClientMutation = useMutation$1({
    mutationFn: async (data) => {
      return await createClientServerFn({ data });
    },
    onSuccess: (data) => {
      console.log("Client cr\xE9\xE9 avec succ\xE8s:", data);
      toast.success("Client cr\xE9\xE9 avec succ\xE8s !");
    },
    onError: (error) => {
      console.error("Erreur:", error);
      toast.error("Les informations du client sont invalides ou dupliqu\xE9es.");
    }
  });
  const loadClients = async () => {
    let successCount = 0;
    let errorCount = 0;
    for (let i = 0; i < sampleClients.length; i++) {
      const client = sampleClients[i];
      console.log(`Processing client ${i + 1}/${sampleClients.length}: ${client.fullName}`);
      try {
        await createClientMutation.mutateAsync(client);
        successCount++;
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Failed to create client: ${client.fullName}`, error);
        errorCount++;
      }
    }
    toast.success(`Import termin\xE9: ${successCount} succ\xE8s, ${errorCount} erreurs`);
    return { successCount, errorCount, total: sampleClients.length };
  };
  return { loadClients, sampleClients, isLoading: createClientMutation.isPending };
}
const ClientsPage = () => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [openUpdateClientModal, setOpenUpdateClientModal] = useState(false);
  const [openViewClientModal, setOpenViewClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients2, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useLoadClients();
  async function fetchClients() {
    setLoading(true);
    try {
      const data = await loadClientsServerFn();
      const normalizedData = data.map((client) => ({
        id: client.id,
        fullName: client.fullName,
        address: client.address,
        willaya: client.willaya,
        activity: client.activity ?? void 0,
        art: client.art ?? void 0,
        nis: client.nis ?? void 0,
        nif: client.nif ?? void 0,
        rc: client.rc ?? void 0
      }));
      setClients(normalizedData);
      setFilteredClients(normalizedData);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchClients();
  }, []);
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = clients2.filter(
      (c) => c.fullName?.toLowerCase().includes(term) || c.address?.toLowerCase().includes(term) || c.willaya?.toLowerCase().includes(term) || c.art?.toLowerCase().includes(term) || c.nis?.toLowerCase().includes(term) || c.nif?.toLowerCase().includes(term) || c.rc?.toLowerCase().includes(term)
    );
    setFilteredClients(results);
  }, [searchTerm, clients2]);
  const handleView = (client) => {
    setSelectedClient(client);
    setOpenViewClientModal(true);
  };
  const handleEdit = (client) => {
    setSelectedClient(client);
    setOpenUpdateClientModal(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce client ?");
    if (!confirmDelete) return;
    setDeletingId(id);
    try {
      const result = await deleteClientServerFn({ data: { id } });
      if (result.success) {
        setClients((prev) => prev.filter((client) => client.id !== id));
        toast.success("Le client a \xE9t\xE9 supprim\xE9 avec succ\xE8s !");
      } else {
        toast.error("Impossible de supprimer le client.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression du client.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleUpdate = (updatedClient) => {
    setClients(
      (prev) => prev.map((c) => c.id === updatedClient.id ? updatedClient : c)
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-blue-700 text-center md:text-left", children: "Liste des clients" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row w-full md:w-auto gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher un client...",
            className: "border placeholder:text-sm rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2",
            onClick: () => setOpenAddClientModal(true),
            children: [
              /* @__PURE__ */ jsx(FaFileInvoice, {}),
              " Cr\xE9er un client"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Chargement des clients..." }) : filteredClients.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Aucun client trouv\xE9." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg shadow-md border", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-blue-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "#" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nom complet" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Art" }),
        /* @__PURE__ */ jsx(TableHead, { children: "NIS" }),
        /* @__PURE__ */ jsx(TableHead, { children: "NIF" }),
        /* @__PURE__ */ jsx(TableHead, { children: "RC" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filteredClients.map((client, index) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-blue-50 transition", children: [
        /* @__PURE__ */ jsx(TableCell, { children: index + 1 }),
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: client.fullName }),
        /* @__PURE__ */ jsx(TableCell, { children: client.art }),
        /* @__PURE__ */ jsx(TableCell, { children: client.nis }),
        /* @__PURE__ */ jsx(TableCell, { children: client.nif }),
        /* @__PURE__ */ jsx(TableCell, { children: client.rc }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleView(client),
              className: "hover:bg-blue-100",
              children: /* @__PURE__ */ jsx(FaEye, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: () => handleEdit(client),
              className: "hover:bg-blue-100",
              children: /* @__PURE__ */ jsx(FaEdit, {})
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "destructive",
              disabled: deletingId === client.id,
              onClick: () => handleDelete(client.id),
              children: deletingId === client.id ? "..." : /* @__PURE__ */ jsx(FaTrash, {})
            }
          )
        ] }) })
      ] }, client.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      AddClientModal,
      {
        isOpen: openAddClientModal,
        onClose: () => setOpenAddClientModal(false),
        onCreate: fetchClients
      }
    ),
    /* @__PURE__ */ jsx(
      UpdateClientModal,
      {
        isOpen: openUpdateClientModal,
        onClose: () => setOpenUpdateClientModal(false),
        client: selectedClient,
        onUpdate: () => handleUpdate(selectedClient)
      }
    ),
    /* @__PURE__ */ jsx(
      ViewClientModal,
      {
        isOpen: openViewClientModal,
        onClose: () => setOpenViewClientModal(false),
        client: selectedClient
      }
    )
  ] });
};
const UpdateFournisseurModal = ({
  isOpen,
  fournisseur,
  onClose,
  onUpdate
}) => {
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (fournisseur) {
      const { id, ...rest } = fournisseur;
      setModel(rest);
    }
  }, [fournisseur]);
  const updateFournisseurMutation = useMutation({
    fn: (data) => updateFournisseurServerFn({
      data: {
        id: data.id,
        formData: {
          fullName: data.fullName,
          address: data.address,
          willaya: data.willaya,
          activity: data.activity ?? "",
          art: data.art ?? "",
          nis: data.nis ?? "",
          nif: data.nif ?? "",
          rc: data.rc ?? "",
          capital: data.capital ?? ""
        }
      }
    }).then((res) => ({
      success: res.success,
      fournisseur: {
        ...res.fournisseur,
        activity: res.fournisseur.activity ?? void 0,
        art: res.fournisseur.art ?? void 0,
        nis: res.fournisseur.nis ?? void 0,
        nif: res.fournisseur.nif ?? void 0,
        rc: res.fournisseur.rc ?? void 0,
        updatedAt: res.fournisseur.updatedAt ?? void 0,
        capital: res.fournisseur.capital ?? void 0
      }
    })),
    onSuccess: ({ data }) => {
      alert("Fournisseur mis \xE0 jour avec succ\xE8s!");
      onUpdate(data.fournisseur);
      onClose();
    },
    onFailure: ({ error }) => {
      alert("\xC9chec de la mise \xE0 jour du fournisseur: " + error.message);
    }
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (model && fournisseur) {
      updateFournisseurMutation.mutate({ id: fournisseur.id, ...model });
    }
  };
  const updateField = (key, value) => setModel((m) => m ? { ...m, [key]: value } : m);
  if (!isOpen || !model) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Mettre \xE0 jour le fournisseur" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: Object.keys(model).map((key) => key != "phone" && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block font-medium", children: key.charAt(0).toUpperCase() + key.slice(1) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: model[key] || "",
            onChange: (e) => updateField(key, e.target.value),
            className: "mt-1 w-full border rounded px-2 py-1"
          }
        )
      ] }, key)) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: updateFournisseurMutation.status === "pending" ? "Mise \xE0 jour..." : "Mettre \xE0 jour le fournisseur"
        }
      )
    ] })
  ] }) });
};
const WILAYAS = [
  "01 Adrar",
  "02 Chlef",
  "03 Laghouat",
  "04 Oum El Bouaghi",
  "05 Batna",
  "06 B\xE9ja\xEFa",
  "07 Biskra",
  "08 B\xE9char",
  "09 Blida",
  "10 Bouira",
  "11 Tamanrasset",
  "12 T\xE9bessa",
  "13 Tlemcen",
  "14 Tiaret",
  "15 Tizi Ouzou",
  "16 Alger",
  "17 Djelfa",
  "18 Jijel",
  "19 S\xE9tif",
  "20 Sa\xEFda",
  "21 Skikda",
  "22 Sidi Bel Abb\xE8s",
  "23 Annaba",
  "24 Guelma",
  "25 Constantine",
  "26 M\xE9d\xE9a",
  "27 Mostaganem",
  "28 M\u2019Sila",
  "29 Mascara",
  "30 Ouargla",
  "31 Oran",
  "32 El Bayadh",
  "33 Illizi",
  "34 Bordj Bou Arreridj",
  "35 Boumerd\xE8s",
  "36 El Tarf",
  "37 Tindouf",
  "38 Tissemsilt",
  "39 El Oued",
  "40 Khenchela",
  "41 Souk Ahras",
  "42 Tipaza",
  "43 Mila",
  "44 A\xEFn Defla",
  "45 Na\xE2ma",
  "46 A\xEFn T\xE9mouchent",
  "47 Gharda\xEFa",
  "48 Relizane",
  "49 El M\u2019Ghair",
  "50 El Meniaa",
  "51 Ouled Djellal",
  "52 Bordj Badji Mokhtar",
  "53 B\xE9ni Abb\xE8s",
  "54 Timimoun"
];
const AddFournisseurModal = ({ isOpen, onClose, onCreate }) => {
  const [model, setModel] = useState({
    fullName: "",
    address: "",
    willaya: "",
    phone: "",
    activity: "",
    art: "",
    nis: "",
    nif: "",
    rc: "",
    capital: ""
  });
  const [errors, setErrors] = useState({});
  const createFournisseurMutation = useMutation({
    fn: async (data) => {
      return await createFournisseurServerFn({ data });
    },
    onSuccess: ({ data }) => {
      toast.success("Fournisseur cr\xE9\xE9 avec succ\xE8s !");
      console.log("Created fournisseur:", data.fournisseur);
      onCreate();
      onClose();
    },
    onFailure: ({ error }) => {
      console.error("Erreur cr\xE9ation fournisseur:", error.message);
      toast.error("Les informations du fournisseur sont invalides ou dupliqu\xE9es.");
    }
  });
  const updateField = (key, value) => setModel((m) => ({ ...m, [key]: value }));
  const validate = () => {
    const newErrors = {};
    if (!model.fullName.trim()) newErrors.fullName = "Le nom complet est requis.";
    if (!model.address.trim()) newErrors.address = "L\u2019adresse est requise.";
    if (!model.willaya.trim()) newErrors.willaya = "La wilaya est requise.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    createFournisseurMutation.mutate(model);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Cr\xE9er un fournisseur" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom complet *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.fullName,
              onChange: (e) => updateField("fullName", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.fullName ? "border-red-500" : ""}`
            }
          ),
          errors.fullName && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.fullName })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Adresse *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.address,
              onChange: (e) => updateField("address", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.address ? "border-red-500" : ""}`
            }
          ),
          errors.address && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.address })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Wilaya *" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: model.willaya,
              onChange: (e) => updateField("willaya", e.target.value),
              className: `mt-1 w-full border rounded px-2 py-1 ${errors.willaya ? "border-red-500" : ""}`,
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "-- S\xE9lectionner une wilaya --" }),
                WILAYAS.map((w) => /* @__PURE__ */ jsx("option", { value: w, children: w }, w))
              ]
            }
          ),
          errors.willaya && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: errors.willaya })
        ] }),
        ["activity", "art", "nis", "nif", "rc", "capital"].map((field) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium capitalize", children: field.toUpperCase() }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model[field] ?? "",
              onChange: (e) => updateField(field, e.target.value),
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }, field))
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: createFournisseurMutation.status === "pending" ? "Cr\xE9ation..." : "Cr\xE9er le fournisseur"
        }
      )
    ] })
  ] }) });
};
const ViewFournisseurModal = ({
  isOpen,
  fornisseur,
  onClose
}) => {
  if (!isOpen || !fornisseur) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative animate-fade-in", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-2xl transition",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-2", children: [
      /* @__PURE__ */ jsx(FaBuilding, { className: "text-blue-600 text-6xl mb-2" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-blue-700 mb-1", children: "D\xE9tails du Fournisseur" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "Informations enregistr\xE9es dans le syst\xE8me" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Object.entries(fornisseur).filter(([key]) => key !== "id" && key !== "createdAt" && key !== "updatedAt").map(([key, value]) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition",
        children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1", children: key.charAt(0).toUpperCase() + key.slice(1) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-800 text-base font-medium", children: value || /* @__PURE__ */ jsx("span", { className: "text-gray-400 italic", children: "Non sp\xE9cifi\xE9" }) })
        ]
      },
      key
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition",
        children: "Fermer"
      }
    ) })
  ] }) });
};
const FournisseurPage = () => {
  const [openAddFournisseurModal, setOpenAddFournisseurModal] = useState(false);
  const [openUpdateFournisseurModal, setOpenUpdateFournisseurModal] = useState(false);
  const [openViewFournisseurModal, setOpenViewFournisseurModal] = useState(false);
  const [selectedFournisseur, setSelectedFournisseur] = useState(null);
  const [fournisseurs2, setFournisseurs] = useState([]);
  const [filteredFournisseurs, setFilteredFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  async function fetchFournisseurs() {
    setLoading(true);
    try {
      const data = await loadFournisseursServerFn();
      const normalizedData = data.map((fournisseur) => ({
        id: fournisseur.id,
        fullName: fournisseur.fullName,
        address: fournisseur.address,
        willaya: fournisseur.willaya,
        activity: fournisseur.activity ?? void 0,
        art: fournisseur.art ?? void 0,
        nis: fournisseur.nis ?? void 0,
        nif: fournisseur.nif ?? void 0,
        rc: fournisseur.rc ?? void 0,
        capital: fournisseur.capital ?? void 0
      }));
      setFournisseurs(normalizedData);
      setFilteredFournisseurs(normalizedData);
    } catch (err) {
      console.error("Failed to fetch fournisseurs", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchFournisseurs();
  }, []);
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = fournisseurs2.filter(
      (f) => f.fullName?.toLowerCase().includes(term) || f.address?.toLowerCase().includes(term) || f.willaya?.toLowerCase().includes(term) || f.art?.toLowerCase().includes(term) || f.nis?.toLowerCase().includes(term) || f.nif?.toLowerCase().includes(term) || f.rc?.toLowerCase().includes(term)
    );
    setFilteredFournisseurs(results);
  }, [searchTerm, fournisseurs2]);
  const handleView = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setOpenViewFournisseurModal(true);
  };
  const handleEdit = (fournisseur) => {
    setSelectedFournisseur(fournisseur);
    setOpenUpdateFournisseurModal(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce fournisseur ?");
    if (!confirmDelete) return;
    setDeletingId(id);
    try {
      const result = await deleteFournisseurServerFn({ data: { id } });
      if (result.success) {
        setFournisseurs((prev) => prev.filter((f) => f.id !== id));
        toast.success("Fournisseur supprim\xE9 avec succ\xE8s !");
      } else {
        toast.error("Impossible de supprimer le fournisseur.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression du fournisseur.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleUpdate = (updatedFournisseur) => {
    setFournisseurs(
      (prev) => prev.map((f) => f.id === updatedFournisseur.id ? updatedFournisseur : f)
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-blue-700 text-center md:text-left", children: "Liste des fournisseurs" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row w-full md:w-auto gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher un fournisseur...",
            className: "border placeholder:text-sm rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2",
            onClick: () => setOpenAddFournisseurModal(true),
            children: [
              /* @__PURE__ */ jsx(FaFileInvoice, {}),
              " Cr\xE9er un fournisseur"
            ]
          }
        )
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Chargement des fournisseurs..." }) : filteredFournisseurs.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Aucun fournisseur trouv\xE9." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg shadow-md border", children: /* @__PURE__ */ jsxs(Table, { className: "min-w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-blue-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "#" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Nom complet" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Art" }),
        /* @__PURE__ */ jsx(TableHead, { children: "NIS" }),
        /* @__PURE__ */ jsx(TableHead, { children: "NIF" }),
        /* @__PURE__ */ jsx(TableHead, { children: "RC" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filteredFournisseurs.map((fournisseur, index) => /* @__PURE__ */ jsxs(
        TableRow,
        {
          className: "hover:bg-blue-50 transition-colors",
          children: [
            /* @__PURE__ */ jsx(TableCell, { children: index + 1 }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: fournisseur.fullName }),
            /* @__PURE__ */ jsx(TableCell, { children: fournisseur.art }),
            /* @__PURE__ */ jsx(TableCell, { children: fournisseur.nis }),
            /* @__PURE__ */ jsx(TableCell, { children: fournisseur.nif }),
            /* @__PURE__ */ jsx(TableCell, { children: fournisseur.rc }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleView(fournisseur),
                  className: "hover:bg-blue-100",
                  children: /* @__PURE__ */ jsx(FaEye, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  onClick: () => handleEdit(fournisseur),
                  className: "hover:bg-blue-100",
                  children: /* @__PURE__ */ jsx(FaEdit, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "destructive",
                  disabled: deletingId === fournisseur.id,
                  onClick: () => handleDelete(fournisseur.id),
                  children: deletingId === fournisseur.id ? "..." : /* @__PURE__ */ jsx(FaTrash, {})
                }
              )
            ] }) })
          ]
        },
        fournisseur.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(
      AddFournisseurModal,
      {
        isOpen: openAddFournisseurModal,
        onClose: () => setOpenAddFournisseurModal(false),
        onCreate: fetchFournisseurs
      }
    ),
    /* @__PURE__ */ jsx(
      UpdateFournisseurModal,
      {
        isOpen: openUpdateFournisseurModal,
        onClose: () => setOpenUpdateFournisseurModal(false),
        fournisseur: selectedFournisseur,
        onUpdate: () => handleUpdate(selectedFournisseur)
      }
    ),
    /* @__PURE__ */ jsx(
      ViewFournisseurModal,
      {
        isOpen: openViewFournisseurModal,
        onClose: () => setOpenViewFournisseurModal(false),
        fornisseur: selectedFournisseur
      }
    )
  ] });
};
const AddProductModal = ({ isOpen, onClose, onCreate }) => {
  const [model, setModel] = useState({
    code: "",
    name: "",
    price: "0",
    tva: "0"
  });
  const createProductMutation = useMutation({
    fn: async (data) => {
      const result = await createProductServerFn({ data });
      return result;
    },
    onSuccess: ({ data }) => {
      toast.success("Produit cr\xE9\xE9 avec succ\xE8s !");
      console.log("Created product:", data.product);
      onCreate();
      onClose();
    },
    onFailure: ({ error }) => {
      toast.error("\xC9chec de la cr\xE9ation du produit : ");
    }
  });
  const updateField = (key, value) => setModel((m) => ({ ...m, [key]: value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    await createProductMutation.mutate(model);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Cr\xE9er un produit" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Code produit *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.code,
              onChange: (e) => updateField("code", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom du produit *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.name,
              onChange: (e) => updateField("name", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Prix *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              step: 0.01,
              value: model.price,
              onChange: (e) => updateField("price", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "TVA (%) *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              step: 0.01,
              value: model.tva,
              onChange: (e) => updateField("tva", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: createProductMutation.status === "pending",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: createProductMutation.status === "pending" ? "Cr\xE9ation..." : "Cr\xE9er le produit"
        }
      )
    ] })
  ] }) });
};
const UpdateProductModal = ({
  isOpen,
  product,
  onClose,
  onUpdate
}) => {
  const [model, setModel] = useState(null);
  useEffect(() => {
    if (product) setModel(product);
  }, [product]);
  const updateProductMutation = useMutation({
    fn: (data) => updateProductServerFn({
      data: {
        id: data.id,
        formData: {
          code: data.code,
          name: data.name,
          price: data.price,
          tva: data.tva
        }
      }
    }).then((res) => ({
      success: res.success,
      product: {
        ...res.product,
        price: Number(res.product.price),
        // convert string to number
        tva: Number(res.product.tva)
        // convert string to number
      }
    })),
    onSuccess: ({ data }) => {
      alert("Produit mis \xE0 jour avec succ\xE8s!");
      onUpdate(data.product);
      onClose();
    },
    onFailure: ({ error }) => {
      alert("\xC9chec de la mise \xE0 jour du produit: " + error.message);
    }
  });
  const updateField = (key, value) => setModel((m) => m ? { ...m, [key]: value } : m);
  const onSubmit = (e) => {
    e.preventDefault();
    if (model) {
      updateProductMutation.mutate(model);
    }
  };
  if (!isOpen || !model) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, {})
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-blue-700", children: "Mettre \xE0 jour le produit" }),
    /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Code produit *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.code,
              onChange: (e) => updateField("code", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Nom du produit *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: model.name,
              onChange: (e) => updateField("name", e.target.value),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "Prix *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              step: 0.01,
              value: model.price,
              onChange: (e) => updateField("price", Number(e.target.value)),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block font-medium", children: "TVA (%) *" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 0,
              step: 0.01,
              value: model.tva,
              onChange: (e) => updateField("tva", Number(e.target.value)),
              required: true,
              className: "mt-1 w-full border rounded px-2 py-1"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto",
          children: updateProductMutation.status === "pending" ? "Mise \xE0 jour..." : "Mettre \xE0 jour le produit"
        }
      )
    ] })
  ] }) });
};
const ViewProductModal = ({
  isOpen,
  product,
  onClose
}) => {
  if (!isOpen || !product) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl w-[90%] md:w-[600px] max-h-[90vh] overflow-y-auto p-6 relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute top-4 right-4 text-gray-500 hover:text-blue-700 transition-colors",
        onClick: onClose,
        children: /* @__PURE__ */ jsx(FaTimes, { size: 20 })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-blue-700", children: "D\xE9tails du produit" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Consultez les informations de ce produit" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsx(DetailItem, { icon: /* @__PURE__ */ jsx(FaBarcode, {}), label: "Code produit", value: product.code }),
      /* @__PURE__ */ jsx(DetailItem, { icon: /* @__PURE__ */ jsx(FaTag, {}), label: "Nom du produit", value: product.name }),
      /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaMoneyBillWave, {}),
          label: "Prix",
          value: `${product.price.toFixed(2)} \u20AC`
        }
      ),
      /* @__PURE__ */ jsx(
        DetailItem,
        {
          icon: /* @__PURE__ */ jsx(FaPercent, {}),
          label: "TVA",
          value: `${product.tva.toFixed(2)} %`
        }
      ),
      /* @__PURE__ */ jsx(DetailItem, { icon: /* @__PURE__ */ jsx(FaInfoCircle, {}), label: "ID", value: product.id })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 flex justify-end", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-150 shadow-md",
        children: "Fermer"
      }
    ) })
  ] }) });
};
const DetailItem = ({ icon, label, value }) => /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-sm transition", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-blue-700 font-medium mb-1", children: [
    icon,
    /* @__PURE__ */ jsx("span", { children: label })
  ] }),
  /* @__PURE__ */ jsx("p", { className: "text-gray-700 font-semibold truncate", children: value || "\u2014" })
] });
const ProductsPage = () => {
  const [products2, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openViewProductModal, setOpenViewProductModal] = useState(false);
  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await loadProductsServerFn();
      const normalizedData = data.map((product) => ({
        id: product.id,
        code: product.code ?? void 0,
        name: product.name ?? void 0,
        price: Number(product.price) ?? 0,
        tva: Number(product.tva) ?? 0
      }));
      setProducts(normalizedData);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleView = (product) => {
    setSelectedProduct(product);
    setOpenViewProductModal(true);
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenUpdateProductModal(true);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (!confirmDelete) return;
    setDeletingId(id);
    try {
      const result = await deleteProductServerFn({ data: { id } });
      if (result.success) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
        toast.success("Produit supprim\xE9 avec succ\xE8s !");
      } else {
        toast.error("Impossible de supprimer le produit");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression du produit.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleUpdate = (updatedProduct) => {
    setProducts(
      (prev) => prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col gap-6 px-4 py-6 bg-gray-50", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800", children: "\u{1F4E6} Liste des produits" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full md:w-auto", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Rechercher un produit...",
            className: "border rounded-md px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "w-full md:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2",
            onClick: () => setOpenAddProductModal(true),
            children: [
              /* @__PURE__ */ jsx(FaPlus, {}),
              " Cr\xE9er un produit"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-lg border border-blue-100 w-full overflow-hidden", children: loading ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Chargement des produits..." }) : products2.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center py-8 text-gray-500", children: "Aucun produit trouv\xE9." }) : /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-blue-50", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold", children: "Date" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold", children: "Code" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold", children: "Nom" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold", children: "Prix (DZD)" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold", children: "TVA (%)" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-gray-700 font-semibold text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: products2.map((product) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-blue-50 transition-colors", children: [
        /* @__PURE__ */ jsx(TableCell, { children: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR") }),
        /* @__PURE__ */ jsx(TableCell, { children: product.code }),
        /* @__PURE__ */ jsx(TableCell, { children: product.name }),
        /* @__PURE__ */ jsx(TableCell, { children: product.price.toFixed(2) }),
        /* @__PURE__ */ jsx(TableCell, { children: product.tva }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "hover:bg-blue-100",
              onClick: () => handleView(product),
              children: /* @__PURE__ */ jsx(FaEye, { className: "text-blue-600" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "hover:bg-blue-100",
              onClick: () => handleEdit(product),
              children: /* @__PURE__ */ jsx(FaEdit, { className: "text-blue-600" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "destructive",
              disabled: deletingId === product.id,
              onClick: () => handleDelete(product.id),
              children: /* @__PURE__ */ jsx(FaTrash, {})
            }
          )
        ] }) })
      ] }, product.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(
      AddProductModal,
      {
        isOpen: openAddProductModal,
        onClose: () => setOpenAddProductModal(false),
        onCreate: fetchProducts
      }
    ),
    /* @__PURE__ */ jsx(
      UpdateProductModal,
      {
        isOpen: openUpdateProductModal,
        onClose: () => setOpenUpdateProductModal(false),
        product: selectedProduct,
        onUpdate: handleUpdate
      }
    ),
    /* @__PURE__ */ jsx(
      ViewProductModal,
      {
        isOpen: openViewProductModal,
        onClose: () => setOpenViewProductModal(false),
        product: selectedProduct
      }
    )
  ] });
};
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState(
    "invoices"
  );
  const [currentTime, setCurrentTime] = useState(/* @__PURE__ */ new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(timer);
  }, []);
  const formattedDate = currentTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const formattedTime = currentTime.toLocaleTimeString("fr-FR");
  return /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsxs(GlobalCard, { title: "SCN Krachni et fr\xE8res", description: "", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-3xl font-bold flex items-center gap-2 text-blue-700", children: [
        /* @__PURE__ */ jsx(FaFileInvoice, {}),
        " Tableau de bord"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-black font-medium", children: [
        /* @__PURE__ */ jsx(FaClock, {}),
        /* @__PURE__ */ jsx("span", { children: formattedDate }),
        /* @__PURE__ */ jsx("span", { className: "ml-2 font-bold", children: formattedTime })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row justify-between gap-1 mb-6", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: activeTab === "invoices" ? "default" : "outline",
          className: `w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "invoices" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`,
          onClick: () => setActiveTab("invoices"),
          children: [
            /* @__PURE__ */ jsx(FaFileInvoice, {}),
            " Factures"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: activeTab === "clients" ? "default" : "outline",
          className: `w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "clients" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`,
          onClick: () => setActiveTab("clients"),
          children: [
            /* @__PURE__ */ jsx(FaUsers, {}),
            " Clients"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: activeTab === "fournisseurs" ? "default" : "outline",
          className: `w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "fournisseurs" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`,
          onClick: () => setActiveTab("fournisseurs"),
          children: [
            /* @__PURE__ */ jsx(FaBuilding, {}),
            " Fournisseurs"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: activeTab === "fournisseurs" ? "default" : "outline",
          className: `w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "fournisseurs" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700 hover:bg-orange-200"}`,
          onClick: () => setActiveTab("product"),
          children: [
            /* @__PURE__ */ jsx(FaProductHunt, {}),
            " Produits"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
      activeTab === "invoices" && /* @__PURE__ */ jsx(InvoicesPage, {}),
      activeTab === "clients" && /* @__PURE__ */ jsx(ClientsPage, {}),
      activeTab === "fournisseurs" && /* @__PURE__ */ jsx(FournisseurPage, {}),
      activeTab === "product" && /* @__PURE__ */ jsx(ProductsPage, {})
    ] })
  ] }) });
};
const queryClient = new QueryClient();
function RouteComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user || !user.isAuthenticated) {
      navigate({
        to: "/"
      });
    }
  }, [navigate]);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(DashboardPage, {}) });
}

export { RouteComponent as component };
//# sourceMappingURL=dashboard-orSO09dN.mjs.map
