import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { updateClientServerFn } from "@/server/client-fn";
import { Client, NewClient } from "@/db/schema";

export interface ClientModel {
  id: string;
  fullName: string;
  address: string;
  willaya: string;
  phone: string;
  activity?: string;
  art?: string;
  nis?: string;
  nif?: string;
  rc?: string;
}

interface UpdateClientModalProps {
  isOpen: boolean;
  client: ClientModel | null;
  onClose: () => void;
  onUpdate: (client: Client) => void; // Return server-updated client
}

// Only include fields that can be updated
type ClientUpdateModel = Omit<ClientModel, "id">;

export const UpdateClientModal: React.FC<UpdateClientModalProps> = ({
  isOpen,
  client,
  onClose,
  onUpdate,
}) => {
  const [model, setModel] = useState<ClientUpdateModel | null>(null);

  useEffect(() => {
    if (client) {
      const { id, ...rest } = client;
      setModel(rest);
    }
  }, [client]);

const updateClientMutation = useMutation<
  ClientUpdateModel & { id: string },
  { success: true; client: Client },
  Error
>({
  fn: (data) =>
    updateClientServerFn({
      data: {
        id: data.id,
        formData: {
          fullName: data.fullName,
          address: data.address,
          willaya: data.willaya,
          phone: data.phone,
          activity: data.activity,
          art: data.art,
          nis: data.nis,
          nif: data.nif,
          rc: data.rc,
        },
      },
    }),
  onSuccess: ({ data }) => {
    alert("Client mis à jour avec succès!");
    onUpdate(data.client);
    onClose();
  },
  onFailure: ({ error }) => {
    alert("Échec de la mise à jour du client: " + error.message);
  },
});


  const updateField = <K extends keyof ClientUpdateModel>(key: K, value: ClientUpdateModel[K]) =>
    setModel((m) => (m ? { ...m, [key]: value } : m));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (model && client) {
      updateClientMutation.mutate({ id: client.id, ...model });
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

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Mettre à jour le client</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(model).map((key) => (
              <div key={key}>
                <label className="block font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="text"
                  value={model[key as keyof ClientUpdateModel] || ""}
                  onChange={(e) => updateField(key as keyof ClientUpdateModel, e.target.value)}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-blue-700 w-full md:w-auto"
          >
            {updateClientMutation.status === "pending" ? "Mise à jour..." : "Mettre à jour le client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClientModal;
