"use client";
import { useState } from "react";
import { Edit, Trash2, AlertTriangle, Plus } from "lucide-react";
// FIXED IMPORTS (Added one more '../')
import { Button } from "../../../components/ui/Button"; 
import { Modal } from "../../../components/ui/Modal";   

// --- INITIAL MOCK DATA ---
const INITIAL_PRODUCTS = [
  { id: 1, title: "The Modern Founder", price: 29, sales: 120, revenue: 3480, status: "Active" },
  { id: 2, title: "React Mastery", price: 49, sales: 85, revenue: 4165, status: "Active" },
  { id: 3, title: "Legacy UI Kit", price: 19, sales: 12, revenue: 228, status: "Archived" },
  { id: 4, title: "Crypto Security 101", price: 35, sales: 45, revenue: 1575, status: "Active" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const initiateDelete = (id: number) => {
    setProductToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-2xl border border-white/5 overflow-hidden">
      
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <h2 className="font-bold text-lg text-white">Product Inventory</h2>
        <Button variant="primary" className="h-10 text-sm">
           <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Total Revenue</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{product.title}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4 font-mono text-green-400">${product.revenue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    product.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => initiateDelete(product.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
            <AlertTriangle className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm font-medium">
              Warning: This action cannot be undone. This will permanently remove the product.
            </p>
          </div>

          <p className="text-gray-400 text-sm">
            Are you sure you want to delete <span className="text-white font-bold">Product ID #{productToDelete}</span>?
          </p>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
