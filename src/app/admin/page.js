import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminHomePage = async () => {
  const adminUser = await prisma.user.findFirst({
    where: {
      email: process.env.ADMIN_EMAIL,
    },
  });

  if (adminUser === null) return notFound();

  if (adminUser.hasAdminAccess === false) return notFound();

  return (
    <div className="w-1/3">
      <Card>
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
          <CardDescription>
            {" "}
            Hello {adminUser.firstName} {adminUser.lastName}, here are your
            current login details:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Email: {adminUser.email}</p>
          <p>Has Admin Access: {adminUser.hasAdminAccess.toString()}</p>
        </CardContent>
        <CardFooter>
          <Button>Proceed</Button>
        </CardFooter>
      </Card>
      <h1></h1>
    </div>
  );
};
export default AdminHomePage;
