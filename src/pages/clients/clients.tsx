import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { FaEye, FaFileInvoice, FaTrash, FaEdit } from "react-icons/fa";
import AddClientModal from "./add-client";
import UpdateClientModal, { ClientModel } from "./update-client";
import ViewClientModal from "./view-client";
import { deleteClientServerFn, loadClientsServerFn } from "@/server/client-fn";
import { toast } from "sonner";
import { useLoadClients } from "@/hooks/useLodaClient";

const ClientsPage = () => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [openUpdateClientModal, setOpenUpdateClientModal] = useState(false);
  const [openViewClientModal, setOpenViewClientModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState<ClientModel | null>(null);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { loadClients } = useLoadClients();

  async function fetchClients() {
    setLoading(true);
    try {
      const data = await loadClientsServerFn();

      const normalizedData: ClientModel[] = data.map((client) => ({
        id: client.id,
        fullName: client.fullName,
        address: client.address,
        willaya: client.willaya,
        phone: client.phone,
        activity: client.activity ?? undefined,
        art: client.art ?? undefined,
        nis: client.nis ?? undefined,
        nif: client.nif ?? undefined,
        rc: client.rc ?? undefined,
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

  // ✅ Search logic
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = clients.filter(
      (c) =>
        c.fullName?.toLowerCase().includes(term) ||
        c.phone?.toLowerCase().includes(term) ||
        c.address?.toLowerCase().includes(term) ||
        c.willaya?.toLowerCase().includes(term) ||
        c.art?.toLowerCase().includes(term) ||
        c.nis?.toLowerCase().includes(term) ||
        c.nif?.toLowerCase().includes(term) ||
        c.rc?.toLowerCase().includes(term)
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);

  const handleView = (client: ClientModel) => {
    setSelectedClient(client);
    setOpenViewClientModal(true);
  };

  const handleEdit = (client: ClientModel) => {
    setSelectedClient(client);
    setOpenUpdateClientModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce client ?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const result = await deleteClientServerFn({ data: { id } });

      if (result.success) {
        setClients((prev) => prev.filter((client) => client.id !== id));
        toast.success("Le client a été supprimé avec succès !");
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

  const handleUpdate = (updatedClient: ClientModel) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <h1 className="text-xl font-bold text-blue-700 text-center md:text-left">
          Liste des fournisseurs
        </h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Rechercher un client..."
            className="border placeholder:text-sm rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            variant="outline"
            className="w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => setOpenAddClientModal(true)}
          >
            <FaFileInvoice /> Créer un fournisseur
          </Button>
           <Button
            variant="outline"
            className="w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() =>{loadClients()}}
            // {loadClients()}
          >
            <FaFileInvoice />import fornisseurs
          </Button>
        </div>
      </div>

      {/* Table Section */}
      {loading ? (
        <p className="text-center py-8 text-gray-500">Chargement des clients...</p>
      ) : filteredClients.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Aucun client trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border">
          <Table className="min-w-full">
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nom complet</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Adresse / Wilaya</TableHead>
                <TableHead>Art</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>RC</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client, index) => (
                <TableRow key={client.id} className="hover:bg-blue-50 transition">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{client.fullName}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.address} / {client.willaya}</TableCell>
                  <TableCell>{client.art}</TableCell>
                  <TableCell>{client.nis}</TableCell>
                  <TableCell>{client.nif}</TableCell>
                  <TableCell>{client.rc}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(client)}
                        className="hover:bg-blue-100"
                      >
                        <FaEye />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(client)}
                        className="hover:bg-blue-100"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deletingId === client.id}
                        onClick={() => handleDelete(client.id)}
                      >
                        {deletingId === client.id ? "..." : <FaTrash />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Modals */}
      <AddClientModal
        isOpen={openAddClientModal}
        onClose={() => setOpenAddClientModal(false)}
        onCreate={fetchClients}
      />
      <UpdateClientModal
        isOpen={openUpdateClientModal}
        onClose={() => setOpenUpdateClientModal(false)}
        client={selectedClient}
        onUpdate={() => handleUpdate(selectedClient!)}
      />
      <ViewClientModal
        isOpen={openViewClientModal}
        onClose={() => setOpenViewClientModal(false)}
        client={selectedClient}
      />
    </div>
  );
};

export default ClientsPage;
