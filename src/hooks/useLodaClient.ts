import { ClientCreateModel } from "@/pages/clients/add-client";
import { createClientServerFn } from "@/server/client-fn";
import { useMutation } from "@tanstack/react-query"; 
import { toast } from "sonner"; // or your toast library

export function useLoadClients() {
  const sampleClients: ClientCreateModel[] = [
    {
      fullName: "alla eddine chorfi",
      address: "cit bouziane khenchela",
      willaya: "khenchela",
      phone: "1 998 4001 01171 41",
      activity: "commerce detail des produits-",
      art: "40014558732",
      nis: "198400101171 38",
      nif: "",
      rc: "19A2437419"
    }
 
  ];

  const createClientMutation = useMutation({
    mutationFn: async (data: ClientCreateModel) => {
      return await createClientServerFn({ data });
    },
    onSuccess: (data) => {
      console.log("Client créé avec succès:", data);
      toast.success("Client créé avec succès !");
    },
    onError: (error) => {
      console.error("Erreur:", error);
      toast.error("Les informations du client sont invalides ou dupliquées.");
    },
  });

  // Function to load all clients sequentially
  const loadClients = async () => {
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < sampleClients.length; i++) {
      const client = sampleClients[i];
      console.log(`Processing client ${i + 1}/${sampleClients.length}: ${client.fullName}`);

      try {
        await createClientMutation.mutateAsync(client);
        successCount++;
        // Optional: small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Failed to create client: ${client.fullName}`, error);
        errorCount++;
      }
    }

    toast.success(`Import terminé: ${successCount} succès, ${errorCount} erreurs`);
    return { successCount, errorCount, total: sampleClients.length };
  };

  return { loadClients, sampleClients, isLoading: createClientMutation.isPending };
}