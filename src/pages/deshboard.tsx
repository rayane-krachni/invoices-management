import { Button } from "@/components/ui/button";
import { GlobalCard } from "./global-card";
import { MainLayout } from "./main-layout";
import React, { useState, useEffect } from "react";
import { FaFileInvoice, FaUsers, FaBuilding, FaClock, FaProductHunt } from "react-icons/fa";
import InvoicesPage from "./invoices";
import ClientsPage from "./clients/clients";
import FournisseursPage from "./fournisseurs/fournisseurs";
import ProductsPage from "./product/products";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"invoices" | "clients" | "fournisseurs" | "product">(
    "invoices"
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = currentTime.toLocaleTimeString("fr-FR");

  return (
    <MainLayout>
      <GlobalCard title="SCN Krachni et frères" description="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-blue-700">
            <FaFileInvoice /> Tableau de bord
          </h1>

          {/* Current date and time */}
          <div className="flex items-center gap-2 text-black font-medium">
            <FaClock />
            <span>{formattedDate}</span>
            <span className="ml-2 font-bold">{formattedTime}</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-1 mb-6">
          <Button
            variant={activeTab === "invoices" ? "default" : "outline"}
            className={`w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "invoices"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            onClick={() => setActiveTab("invoices")}
          >
            <FaFileInvoice /> Factures
          </Button>

          <Button
            variant={activeTab === "clients" ? "default" : "outline"}
            className={`w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "clients"
              ? "bg-green-600 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            onClick={() => setActiveTab("clients")}
          >
            <FaUsers /> Clients
          </Button>

          <Button
            variant={activeTab === "fournisseurs" ? "default" : "outline"}
            className={`w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "fournisseurs"
              ? "bg-blue-600 text-white"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            onClick={() => setActiveTab("fournisseurs")}
          >
            <FaBuilding /> Fournisseurs
          </Button>

          <Button
            variant={activeTab === "fournisseurs" ? "default" : "outline"}
            className={`w-full sm:w-1/4 font-bold flex items-center justify-center gap-2 ${activeTab === "fournisseurs"
              ? "bg-orange-600 text-white"
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
            onClick={() => setActiveTab("product")}
          >
            <FaProductHunt /> Produits
          </Button>
        </div>

        {/* Active Table */}
        <div className="mt-4">
          {activeTab === "invoices" && <InvoicesPage />}
          {activeTab === "clients" && <ClientsPage />}
          {activeTab === "fournisseurs" && <FournisseursPage />}
          {activeTab === "product" && <ProductsPage />}
        </div>
      </GlobalCard>
    </MainLayout>
  );
};

export default DashboardPage;
