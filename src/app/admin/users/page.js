import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UsersPage = () => {
  return (
    <div className="w-1/3">
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            alias tempora, fugiat exercitationem voluptas, odit natus minima
            earum quo, odio sed ipsa explicabo beatae? Sequi.
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
      <h1></h1>
    </div>
  );
};

export default UsersPage;
