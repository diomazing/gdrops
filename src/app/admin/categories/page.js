import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import CategoriesTable from "../_components/CategoriesTable";

const CategoriesPage = async () => {
  const allCategories = await prisma.categories.findMany();

  if (allCategories === null) return notFound();

  return (
    <>
      <h1 className="text-3xl font-semibold p-4">Categories</h1>
      <div className="w-full mt-4 p-4">
        <CategoriesTable data={allCategories} />
      </div>
    </>
  );
};

export default CategoriesPage;
