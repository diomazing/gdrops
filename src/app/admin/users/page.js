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
import UsersTable from "../_components/UsersTable";

const UsersPage = async () => {
  const allUsers = await prisma.user.findMany();

  if (allUsers === null) return notFound();

  return (
    <>
      <h1 className="text-3xl font-semibold p-4">Users </h1>
      <div className="w-1/3 mt-4 p-4 lg:w-full">
        <UsersTable data={allUsers} />
      </div>
    </>
  );
};

export default UsersPage;
