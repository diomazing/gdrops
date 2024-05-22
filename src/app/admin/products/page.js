import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductsTable from "../_components/ProductsTable";
import prisma from "@/lib/prisma";

const ProductsPage = async () => {
  const allProducts = await prisma.product.findMany();

  if (allProducts === null) return notFound();
  console.log("allProducts", allProducts);
  return (
    <>
      <h1 className="text-3xl font-semibold p-4">Products</h1>
      <div className="w-1/3 mt-4 p-4 lg:w-full">
        <ProductsTable data={allProducts} />
      </div>
    </>
  );
};

export default ProductsPage;
