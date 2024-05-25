const {
  default: UsersForm,
} = require("@/app/admin/_components/reusable/UsersForm");
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const EditUsersPage = async ({ params: { id } }) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user === null) return notFound();

  return (
    <>
      <UsersForm data={user} />
    </>
  );
};

export default EditUsersPage;
