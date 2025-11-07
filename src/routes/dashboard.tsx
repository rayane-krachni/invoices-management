import React, { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import DashboardPage from "@/pages/deshboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.isAuthenticated) {
      navigate({ to: "/" }); // redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardPage />
    </QueryClientProvider>
  );
}
