import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useMutation } from "@/hooks/use-mutation";
import { createClientServerFn } from "@/server/client-fn";
import { Client, NewClient } from "@/db/schema";
import { toast } from "sonner";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

type ClientCreateModel = Omit<NewClient, "id" | "createdAt" | "updatedAt">;

const WILAYAS = [
  "01 Adrar",
  "02 Chlef",
  "03 Laghouat",
  "04 Oum El Bouaghi",
  "05 Batna",
  "06 Béjaïa",
  "07 Biskra",
  "08 Béchar",
  "09 Blida",
  "10 Bouira",
  "11 Tamanrasset",
  "12 Tébessa",
  "13 Tlemcen",
  "14 Tiaret",
  "15 Tizi Ouzou",
  "16 Alger",
  "17 Djelfa",
  "18 Jijel",
  "19 Sétif",
  "20 Saïda",
  "21 Skikda",
  "22 Sidi Bel Abbès",
  "23 Annaba",
  "24 Guelma",
  "25 Constantine",
  "26 Médéa",
  "27 Mostaganem",
  "28 M’Sila",
  "29 Mascara",
  "30 Ouargla",
  "31 Oran",
  "32 El Bayadh",
  "33 Illizi",
  "34 Bordj Bou Arreridj",
  "35 Boumerdès",
  "36 El Tarf",
  "37 Tindouf",
  "38 Tissemsilt",
  "39 El Oued",
  "40 Khenchela",
  "41 Souk Ahras",
  "42 Tipaza",
  "43 Mila",
  "44 Aïn Defla",
  "45 Naâma",
  "46 Aïn Témouchent",
  "47 Ghardaïa",
  "48 Relizane",
  "49 El M’Ghair",
  "50 El Meniaa",
  "51 Ouled Djellal",
  "52 Bordj Badji Mokhtar",
  "53 Béni Abbès",
  "54 Timimoun",
];

export const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [model, setModel] = useState<ClientCreateModel>({
    fullName: "",
    address: "",
    willaya: "",
    phone: "",
    activity: "",
    art: "",
    nis: "",
    nif: "",
    rc: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createClientMutation = useMutation<
    ClientCreateModel,
    { success: true; client: Client },
    Error
  >({
    fn: async (data) => {
      const result = await createClientServerFn({ data });
      return result;
    },
    onSuccess: ({ data }) => {
      alert("Client créé avec succès !");
      console.log("Created client:", data.client);
      onCreate();
      onClose();
    },
    onFailure: ({ error }) => {
      toast.error("Les informations du client sont invalides ou dupliquées.");
    },
  });

  const updateField = <K extends keyof ClientCreateModel>(key: K, value: ClientCreateModel[K]) =>
    setModel((m) => ({ ...m, [key]: value }));

  // ✅ Validation function
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!model.fullName.trim()) newErrors.fullName = "Le nom complet est requis.";
    if (!model.address.trim()) newErrors.address = "L’adresse est requise.";
    if (!model.willaya.trim()) newErrors.willaya = "La wilaya est requise.";
    if (!model.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^\d{10}$/.test(model.phone)) {
      newErrors.phone = "Le numéro doit contenir 10 chiffres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createClientMutation.mutate(model);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-purple-700">Créer un client</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium">Nom complet *</label>
              <input
                type="text"
                value={model.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className={`mt-1 w-full border rounded px-2 py-1 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Adresse *</label>
              <input
                type="text"
                value={model.address}
                onChange={(e) => updateField("address", e.target.value)}
                className={`mt-1 w-full border rounded px-2 py-1 ${
                  errors.address ? "border-red-500" : ""
                }`}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Wilaya (select) */}
            <div>
              <label className="block font-medium">Wilaya *</label>
              <select
                value={model.willaya}
                onChange={(e) => updateField("willaya", e.target.value)}
                className={`mt-1 w-full border rounded px-2 py-1 ${
                  errors.willaya ? "border-red-500" : ""
                }`}
              >
                <option value="">-- Sélectionner une wilaya --</option>
                {WILAYAS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
              {errors.willaya && <p className="text-red-500 text-sm">{errors.willaya}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium">Téléphone *</label>
              <input
                type="text"
                value={model.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={`mt-1 w-full border rounded px-2 py-1 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            {/* Optional fields */}
            <div>
              <label className="block font-medium">Activité</label>
              <input
                type="text"
                value={model.activity ?? ""}
                onChange={(e) => updateField("activity", e.target.value)}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium">Art</label>
              <input
                type="text"
                value={model.art ?? ""}
                onChange={(e) => updateField("art", e.target.value)}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium">NIS</label>
              <input
                type="text"
                value={model.nis ?? ""}
                onChange={(e) => updateField("nis", e.target.value)}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium">NIF</label>
              <input
                type="text"
                value={model.nif ?? ""}
                onChange={(e) => updateField("nif", e.target.value)}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block font-medium">RC</label>
              <input
                type="text"
                value={model.rc ?? ""}
                onChange={(e) => updateField("rc", e.target.value)}
                className="mt-1 w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white font-bold px-4 py-2 rounded shadow hover:bg-purple-700 w-full md:w-auto"
          >
            {createClientMutation.status === "pending" ? "Création..." : "Créer le client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
