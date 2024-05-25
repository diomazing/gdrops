import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoriesTable from "../_components/CategoriesTable";
import Link from "next/link";

const CategoriesPage = async () => {
  const allCategories = await prisma.categories.findMany();

  if (allCategories === null) return notFound();

  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-3xl font-semibold p-4">Category</h1>
        <Button className="w-1/8 mt-4">
          <Link href="/admin/categories/new-category">
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusCircleIcon className="h-6 w-6" style={{ color: "white" }} />
              <p>Create New Category</p>
            </div>
          </Link>
        </Button>
      </div>
      <div className="w-full mt-4 p-4">
        <CategoriesTable data={allCategories} />
      </div>
    </>
  );
};

export default CategoriesPage;
