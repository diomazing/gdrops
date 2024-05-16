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
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle>Categories Page</CardTitle>
            <CardDescription>
              {" "}
              Hello, welcome to the barebone page of Categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Laboriosam alias tempora, fugiat exercitationem voluptas, odit
              natus minima earum quo, odio sed ipsa explicabo beatae? Sequi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              earum impedit accusamus magnam pariatur veniam!
            </p>
          </CardContent>
          <CardFooter>
            <Button>Proceed</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="w-1/3 mt-4 p-4">
        <CategoriesTable data={allCategories} />
      </div>
    </>
  );
};

export default CategoriesPage;
