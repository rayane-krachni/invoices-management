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
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { deleteProductServerFn, loadProductsServerFn } from "@/server/product-fn";
import AddProductModal from "./add-product";
import UpdateProductModal, { ProductModel } from "./update-product";
import ViewProductModal from "./view-product";
import { toast } from "sonner";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openViewProductModal, setOpenViewProductModal] = useState(false);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await loadProductsServerFn();
      const normalizedData: ProductModel[] = data.map((product) => ({
        id: product.id,
        code: product.code ?? undefined,
        name: product.name ?? undefined,
        price: Number(product.price) ?? 0,
        tva: Number(product.tva) ?? 0,
      }));
      setProducts(normalizedData);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleView = (product: ProductModel) => {
    setSelectedProduct(product);
    setOpenViewProductModal(true);
  };

  const handleEdit = (product: ProductModel) => {
    setSelectedProduct(product);
    setOpenUpdateProductModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce produit ?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      const result = await deleteProductServerFn({ data: { id } });
      if (result.success) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
        toast.success("Produit supprimé avec succès !");
      } else {
        toast.error("Impossible de supprimer le produit");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Erreur lors de la suppression du produit.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = (updatedProduct: ProductModel) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 px-4 py-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">📦 Liste des produits</h1>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="border rounded-md px-3 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
          <Button
            className="w-full md:w-auto py-3 font-semibold bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
            onClick={() => setOpenAddProductModal(true)}
          >
            <FaPlus /> Créer un produit
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full overflow-hidden">
        {loading ? (
          <p className="text-center py-8 text-gray-500">Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Aucun produit trouvé.</p>
        ) : (
          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="text-gray-700 font-semibold">Date</TableHead>
                <TableHead className="text-gray-700 font-semibold">ID</TableHead>
                <TableHead className="text-gray-700 font-semibold">Code</TableHead>
                <TableHead className="text-gray-700 font-semibold">Nom</TableHead>
                <TableHead className="text-gray-700 font-semibold">Prix (€)</TableHead>
                <TableHead className="text-gray-700 font-semibold">TVA (%)</TableHead>
                <TableHead className="text-gray-700 font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-blue-50 transition-colors">
                  <TableCell>{new Date().toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.tva}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-blue-100"
                        onClick={() => handleView(product)}
                      >
                        <FaEye className="text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-blue-100"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEdit className="text-blue-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={deletingId === product.id}
                        onClick={() => handleDelete(product.id)}
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
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={openAddProductModal}
        onClose={() => setOpenAddProductModal(false)}
        onCreate={fetchProducts}
      />
      <UpdateProductModal
        isOpen={openUpdateProductModal}
        onClose={() => setOpenUpdateProductModal(false)}
        product={selectedProduct}
        onUpdate={handleUpdate}
      />
      <ViewProductModal
        isOpen={openViewProductModal}
        onClose={() => setOpenViewProductModal(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductsPage;
