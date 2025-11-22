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
  const [filteredFournisseurs, setFilteredFournisseurs] = useState<FournisseurModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchFournisseurs() {
    setLoading(true);
    try {
      const data = await loadFournisseursServerFn();

      const normalizedData: FournisseurModel[] = data.map((fournisseur) => ({
        id: fournisseur.id,
        fullName: fournisseur.fullName,
        address: fournisseur.address,
        willaya: fournisseur.willaya,
        activity: fournisseur.activity ?? undefined,
        art: fournisseur.art ?? undefined,
        nis: fournisseur.nis ?? undefined,
        nif: fournisseur.nif ?? undefined,
        rc: fournisseur.rc ?? undefined,
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

  // ✅ Search Logic
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = fournisseurs.filter(
      (f) =>
        f.fullName?.toLowerCase().includes(term) ||
        f.address?.toLowerCase().includes(term) ||
        f.willaya?.toLowerCase().includes(term) ||
        f.art?.toLowerCase().includes(term) ||
        f.nis?.toLowerCase().includes(term) ||
        f.nif?.toLowerCase().includes(term) ||
        f.rc?.toLowerCase().includes(term)
    );
    setFilteredFournisseurs(results);
  }, [searchTerm, fournisseurs]);

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
      const result = await deleteFournisseurServerFn({ data: { id } });

      if (result.success) {
        setFournisseurs((prev) => prev.filter((f) => f.id !== id));
        toast.success("Fournisseur supprimé avec succès !");
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

  const handleUpdate = (updatedFournisseur: FournisseurModel) => {
    setFournisseurs((prev) =>
      prev.map((f) => (f.id === updatedFournisseur.id ? updatedFournisseur : f))
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
        <h1 className="text-xl font-bold text-blue-700 text-center md:text-left">
          Liste des fournisseurs
        </h1>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <input
            type="text"
            placeholder="Rechercher un fournisseur..."
            className="border placeholder:text-sm rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button
            variant="outline"
            className="w-full sm:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => setOpenAddFournisseurModal(true)}
          >
            <FaFileInvoice /> Créer un fournisseur
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center py-8 text-gray-500">Chargement des fournisseurs...</p>
      ) : filteredFournisseurs.length === 0 ? (
        <p className="text-center py-8 text-gray-500">Aucun fournisseur trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border">
          <Table className="min-w-full">
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nom complet</TableHead>
                <TableHead>Art</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>NIF</TableHead>
                <TableHead>RC</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFournisseurs.map((fournisseur, index) => (
                <TableRow
                  key={fournisseur.id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{fournisseur.fullName}</TableCell>
             
                  <TableCell>{fournisseur.art}</TableCell>
                  <TableCell>{fournisseur.nis}</TableCell>
                  <TableCell>{fournisseur.nif}</TableCell>
                  <TableCell>{fournisseur.rc}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(fournisseur)}
                        className="hover:bg-blue-100"
                      >
                        <FaEye />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(fournisseur)}
                        className="hover:bg-blue-100"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deletingId === fournisseur.id}
                        onClick={() => handleDelete(fournisseur.id)}
                      >
                        {deletingId === fournisseur.id ? "..." : <FaTrash />}
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
