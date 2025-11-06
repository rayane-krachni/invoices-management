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
import { deleteFournisseurServerFn, loadFournisseursServerFn } from "@/server/fourniseur-fn";
import UpdateFournisseurModal, { FournisseurModel } from "./update-fournisseur";
import AddFournisseurModal from "./add-fournisseur";
import ViewFournisseurModal from "./view-fournisseur";
import { toast } from "sonner";

const FournisseurPage = () => {
  const [openAddFournisseurModal, setOpenAddFournisseurModal] = useState(false);
  const [openUpdateFournisseurModal, setOpenUpdateFournisseurModal] = useState(false);
  const [openViewFournisseurModal, setOpenViewFournisseurModal] = useState(false);

  const [selectedFournisseur, setSelectedFournisseur] = useState<FournisseurModel | null>(null);
  const [fournisseurs, setFournisseurs] = useState<FournisseurModel[]>([]);
  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchFournisseurs() {
    setLoading(true);
    try {
      const data = await loadFournisseursServerFn();

      // Convert null fields to undefined
      const normalizedData: FournisseurModel[] = data.map((fournisseur) => ({
        id: fournisseur.id,
        fullName: fournisseur.fullName,
        address: fournisseur.address,
        willaya: fournisseur.willaya,
        phone: fournisseur.phone,
        activity: fournisseur.activity ?? undefined,
        art: fournisseur.art ?? undefined,
        nis: fournisseur.nis ?? undefined,
        nif: fournisseur.nif ?? undefined,
        rc: fournisseur.rc ?? undefined,
      }));

      setFournisseurs(normalizedData);
    } catch (err) {
      console.error("Failed to fetch fournisseurs", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {


    fetchFournisseurs();
  }, []);


  const handleView = (fournisseur: FournisseurModel) => {
    setSelectedFournisseur(fournisseur);
    setOpenViewFournisseurModal(true);
  };

  const handleEdit = (fournisseur: FournisseurModel) => {
    setSelectedFournisseur(fournisseur);
    setOpenUpdateFournisseurModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce fournisseur ?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const result = await deleteFournisseurServerFn({
        data: { id }, // ✅ Correct syntax
      });

      if (result.success) {
        setFournisseurs((prev) => prev.filter((fournisseur) => fournisseur.id !== id));
        toast.success("Fournisseur supprimée avec succès !");
      } else {
        toast.error("Impossible de supprimer le Fournisseur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression de fournisseur.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = (updatedFournisseur: FournisseurModel) => {
    setFournisseurs((prev) =>
      prev.map((f) => (f.id === updatedFournisseur.id ? updatedFournisseur : f))
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
            onClick={() => setOpenAddFournisseurModal(true)}
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
            {fournisseurs.map((fornisseur, index) => (
              <TableRow key={fornisseur.id} className="hover:bg-purple-50 transition-colors">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{fornisseur.fullName}</TableCell>
                <TableCell>{fornisseur.phone}</TableCell>
                <TableCell>{fornisseur.address} / {fornisseur.willaya}</TableCell>
               
                <TableCell>{fornisseur.art}</TableCell>
                <TableCell>{fornisseur.nis}</TableCell>
                <TableCell>{fornisseur.nif}</TableCell>
                <TableCell>{fornisseur.rc}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleView(fornisseur)}
                    >
                      <FaEye />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => handleEdit(fornisseur)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(fornisseur.id)}
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

      <AddFournisseurModal
        isOpen={openAddFournisseurModal}
        onClose={() => setOpenAddFournisseurModal(false)}
        onCreate={fetchFournisseurs}
      />
      <UpdateFournisseurModal
        isOpen={openUpdateFournisseurModal}
        onClose={() => setOpenUpdateFournisseurModal(false)}
        fournisseur={selectedFournisseur}
        onUpdate={() => handleUpdate(selectedFournisseur!)}
      />
      <ViewFournisseurModal
        isOpen={openViewFournisseurModal}
        onClose={() => setOpenViewFournisseurModal(false)}
        fornisseur={selectedFournisseur}
      />
    </div>
  );
};

export default FournisseurPage;
