import { jsx, jsxs } from 'react/jsx-runtime';
import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { C as Card, e as CardHeader, a as CardTitle, c as CardContent, B as Button, d as cn } from './card-Cug-GqfU.mjs';
import { toast } from 'sonner';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      navigate({
        to: "/dashboard"
      });
    }
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      const userData = {
        username,
        isAuthenticated: true
      };
      localStorage.setItem("authUser", JSON.stringify(userData));
      toast.success("Connexion r\xE9ussie !");
      navigate({
        to: "/dashboard"
      });
    } else {
      toast.error("Nom d'utilisateur ou mot de passe invalide !");
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md shadow-lg border border-gray-200", children: [
    /* @__PURE__ */ jsx(CardHeader, { className: "text-center", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-semibold text-gray-800", children: "Gestion de facturation" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700", children: "Nom d'utilisateur" }),
        /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Entrez votre nom d'utilisateur", className: "h-10", value: username, onChange: (e) => setUsername(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-2", children: [
        /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-gray-700", children: "Mot de passe" }),
        /* @__PURE__ */ jsx(Input, { type: "password", placeholder: "Entrez votre mot de passe", className: "h-10", value: password, onChange: (e) => setPassword(e.target.value) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full h-10 text-white font-medium bg-blue-600 hover:bg-blue-700", children: "Se connecter" }) })
    ] }) })
  ] }) });
}

export { App as component };
//# sourceMappingURL=index-DiJBTiut.mjs.map
