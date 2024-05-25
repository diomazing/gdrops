const {
  default: CategoriesForm,
} = require("@/app/admin/_components/reusable/CategoriesForm");
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditCategoryPage = async ({ params: { id } }) => {
  const category = await prisma.categories.findUnique({
    where: { id },
  });

  if (category === null) return notFound();

  return (
    <>
      <CategoriesForm data={category} />
    </>
  );
};

export default EditCategoryPage;
