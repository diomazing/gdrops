import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import UsersTable from "../_components/UsersTable";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

const UsersPage = async () => {
  const allUsers = await prisma.user.findMany();

  if (allUsers === null) return notFound();

  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-3xl font-semibold p-4">Users </h1>
        <Button className="w-1/8 mt-4">
          <Link href="/admin/users/new-user">
            <div className="flex flex-row gap-2 justify-center items-center">
              <PlusCircleIcon className="h-6 w-6" style={{ color: "white" }} />
              <p>Create New User</p>
            </div>
          </Link>
        </Button>
      </div>
      <div className="w-1/3 mt-4 p-4 lg:w-full">
        <UsersTable data={allUsers} />
      </div>
    </>
  );
};

export default UsersPage;
