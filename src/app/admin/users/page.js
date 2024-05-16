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
      <div className="w-1/3 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Users Page</CardTitle>
            <CardDescription>
              {" "}
              Hello, welcome to the barebone page of Users.
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
        <UsersTable data={allUsers} />
      </div>
    </>
  );
};

export default UsersPage;
