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
      <div className="w-1/3 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Products Page</CardTitle>
            <CardDescription>
              {" "}
              Hello, welcome to the barebone page of Products.
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
      <div className="w-1/3 mt-4 p-4 lg:w-full">
        <ProductsTable data={allProducts} />
      </div>
    </>
  );
};

export default ProductsPage;
