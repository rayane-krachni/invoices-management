import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { updateFournisseurServerFn } from "@/server/fourniseur-fn";

export interface FournisseurModel {
  id: string;
  fullName: string;
  address: string;
  willaya: string;
  activity?: string;
  art?: string;
  nis?: string;
  nif?: string;
  rc?: string;
}

interface UpdateFournisseurModalProps {
  isOpen: boolean;
  fournisseur: FournisseurModel | null;
  onClose: () => void;
  onUpdate: (fournisseur: FournisseurModel) => void; // Return server-updated fournisseur
}

// Only include fields that can be updated
type FournisseurUpdateModel = Omit<FournisseurModel, "id">;

export const UpdateFournisseurModal: React.FC<UpdateFournisseurModalProps> = ({
  isOpen,
  fournisseur,
  onClose,
  onUpdate,
}) => {
  const [model, setModel] = useState<FournisseurUpdateModel | null>(null);

  useEffect(() => {
    if (fournisseur) {
      const { id, ...rest } = fournisseur;
      setModel(rest);
    }
  }, [fournisseur]);

const updateFournisseurMutation = useMutation<
  FournisseurUpdateModel & { id: string },
  { success: true; fournisseur: FournisseurModel },
  Error
>({
  fn: (data) =>
    updateFournisseurServerFn({
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
        },
      },
    }).then((res) => ({
      success: res.success,
      fournisseur: {
        ...res.fournisseur,
        activity: res.fournisseur.activity ?? undefined,
        art: res.fournisseur.art ?? undefined,
        nis: res.fournisseur.nis ?? undefined,
        nif: res.fournisseur.nif ?? undefined,
        rc: res.fournisseur.rc ?? undefined,
        updatedAt: res.fournisseur.updatedAt ?? undefined,
      },
    })),
  onSuccess: ({ data }) => {
    alert("Fournisseur mis à jour avec succès!");
    onUpdate(data.fournisseur);
    onClose();
  },
  onFailure: ({ error }) => {
    alert("Échec de la mise à jour du fournisseur: " + error.message);
  },
});



  const updateField = <K extends keyof FournisseurUpdateModel>(key: K, value: FournisseurUpdateModel[K]) =>
    setModel((m) => (m ? { ...m, [key]: value } : m));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && fournisseur) {
      updateFournisseurMutation.mutate({ id: fournisseur.id, ...model });
    }
  };

  if (!isOpen || !model) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Mettre à jour le fournisseur</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(model).map((key) => (
             key != "phone" && <div key={key}>
                <label className="block font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="text"
                  value={model[key as keyof FournisseurUpdateModel] || ""}
                  onChange={(e) => updateField(key as keyof FournisseurUpdateModel, e.target.value)}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto"
          >
            {updateFournisseurMutation.status === "pending" ? "Mise à jour..." : "Mettre à jour le fournisseur"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFournisseurModal;
