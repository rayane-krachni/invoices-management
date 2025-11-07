import React, { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DashboardPage from "@/pages/deshboard";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  // ✅ Check if user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      navigate({ to: "/dashboard" });
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "Krachni lahcen" && password === "lahcenAdmin") {
      // ✅ Save auth state to local storage
      const userData = { username, isAuthenticated: true };
      localStorage.setItem("authUser", JSON.stringify(userData));

      toast.success("Connexion réussie !");
      navigate({ to: "/dashboard" });
    } else {
      toast.error("Nom d'utilisateur ou mot de passe invalide !");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Gestion de facturation
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Nom d'utilisateur
              </label>
              <Input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                className="h-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <Input
                type="password"
                placeholder="Entrez votre mot de passe"
                className="h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-10 text-white font-medium bg-blue-600 hover:bg-blue-700"
              >
                Se connecter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
