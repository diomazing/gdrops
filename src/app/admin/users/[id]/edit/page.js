const {
  default: UsersForm,
} = require("@/app/admin/_components/reusable/UsersForm");
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const UsersPage = async ({ params: { id } }) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (user === null) return notFound();

  console.log("USER", user);
  return (
    <>
      <UsersForm data={user} />
    </>
  );
};

export default UsersPage;
