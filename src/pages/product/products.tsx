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
             const result = await deleteProductServerFn({
                 data: { id }, // ✅ Correct syntax
             });
 
             if (result.success) {
                 setProducts((prev) => prev.filter((product) => product.id !== id));
                 toast.success("Produit supprimé avec succès !");
             } else {
                 toast.error("Impossible de supprimer le produit");
             }
         } catch (error) {
             console.error("Erreur lors de la suppression :", error);
             toast.error("Erreur lors de la suppression de produit.");
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
    <div className="h-screen flex flex-col gap-3 justify-start items-center w-full px-4">
      {/* Header and search */}
      <div className="w-full flex justify-between items-center gap-4">
        <h1 className="text-xl font-bold">Liste des produits</h1>
        <div className="flex flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="border placeholder:text-xs rounded px-3 py-1 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button
            variant="outline"
            className="w-full md:w-auto py-3 font-bold bg-purple-600 text-white hover:bg-purple-700 flex items-center justify-center gap-2"
            onClick={() => setOpenAddProductModal(true)}
          >
            <FaPlus /> Créer un produit
          </Button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Table className="border rounded-lg overflow-hidden shadow-xl border-purple-200 w-full">
            <TableHeader className="bg-purple-50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>TVA (%)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-purple-50 transition-colors">
                  <TableCell>{new Date().toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.tva}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleView(product)}>
                        <FaEye />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                        <FaEdit />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                        <FaTrash />
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
