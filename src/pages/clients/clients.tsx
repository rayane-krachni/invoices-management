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

const ClientsPage = () => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [openUpdateClientModal, setOpenUpdateClientModal] = useState(false);
  const [openViewClientModal, setOpenViewClientModal] = useState(false);

  const [selectedClient, setSelectedClient] = useState<ClientModel | null>(null);
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

 async function fetchClients() {
    setLoading(true);
    try {
      const data = await loadClientsServerFn();

      // Convert null fields to undefined
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
    } catch (err) {
      console.error("Failed to fetch clients", err);
    } finally {
      setLoading(false);
    }
  }
useEffect(() => {
 

  fetchClients();
}, []);


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
             const result = await deleteClientServerFn({
                 data: { id }, // ✅ Correct syntax
             });
 
             if (result.success) {
                 setClients((prev) => prev.filter((client) => client.id !== id));
                 toast.success("le client supprimée avec succès !");
             } else {
                 toast.error("Impossible de supprimer le client.");
             }
         } catch (error) {
             console.error("Erreur lors de la suppression :", error);
             toast.error("Erreur lors de la suppression de client");
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
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl font-bold">Liste des fournisseurs</h1>

        <div className="flex flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un client..."
            className="border placeholder:text-xs rounded px-3 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <Button
            variant="outline"
            className="w-full md:w-auto py-3 font-bold bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2"
            onClick={() => setOpenAddClientModal(true)}
          >
            <FaFileInvoice /> Créer un fournisseur
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <Table className="border rounded-lg overflow-hidden shadow-md">
          <TableHeader className="bg-purple-50">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nom complet</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Adresse / Wilaya</TableHead>
            
              <TableHead>Art</TableHead>
              <TableHead>NIS</TableHead>
              <TableHead>NIF</TableHead>
              <TableHead>RC</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client,index) => (
              <TableRow key={client.id} className="hover:bg-purple-50 transition-colors">
                <TableCell>{index+1}</TableCell>
                <TableCell>{client.fullName}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.address} / {client.willaya}</TableCell>
               
                <TableCell>{client.art}</TableCell>
                <TableCell>{client.nis}</TableCell>
                <TableCell>{client.nif}</TableCell>
                <TableCell>{client.rc}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleView(client)}
                    >
                      <FaEye />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleEdit(client)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(client.id)}
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AddClientModal
        isOpen={openAddClientModal}
        onClose={() => setOpenAddClientModal(false)}
        onCreate={fetchClients}

      />
      <UpdateClientModal
        isOpen={openUpdateClientModal}
        onClose={() => setOpenUpdateClientModal(false)}
        client={selectedClient}
        onUpdate={() =>handleUpdate(selectedClient!)}
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
