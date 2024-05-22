import { Home, FileText, Users, Layers3 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Golden Drops</h2>
          <ul>
            <li className="mb-4">
              <a
                href="/admin"
                className={`flex items-center text-gray-300 hover:text-white `}>
                <Home className="w-6 h-6 mr-2" />
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/admin/products"
                className={`flex items-center text-gray-300 hover:text-white `}>
                <FileText className="w-6 h-6 mr-2" />
                Products
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/admin/users"
                className={`flex items-center text-gray-300 hover:text-white `}>
                <Users className="w-6 h-6 mr-2" />
                Users
              </a>
            </li>
            <li className="mb-4">
              <a
                href="/admin/categories"
                className={`flex items-center text-gray-300 hover:text-white `}>
                <Layers3 className="w-6 h-6 mr-2" />
                Categories
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-scroll">
        {/* Main Content Area */}
        <div className="p-4">{children}</div>
        <Toaster />
      </div>
    </div>
  );
};

export default AdminLayout;
