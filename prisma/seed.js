const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed categories
    const category1 = await prisma.categories.create({
      data: {
        categoryName: "Oils",
        product: {
          create: [
            {
              name: "Product 1",
              price: 19.99,
              filePath: "/path/to/file1",
              imagePath: "/path/to/image1",
              description: "Description for Product 1",
              isAvailableForPurchase: true,
            },
            {
              name: "Product 2",
              price: 29.99,
              filePath: "/path/to/file2",
              imagePath: "/path/to/image2",
              description: "Description for Product 2",
              isAvailableForPurchase: true,
            },
          ],
        },
      },
    });

    const category2 = await prisma.categories.create({
      data: {
        categoryName: "Fragrances",
        product: {
          create: [
            {
              name: "Product 3",
              price: 39.99,
              filePath: "/path/to/file3",
              imagePath: "/path/to/image3",
              description: "Description for Product 3",
              isAvailableForPurchase: true,
            },
          ],
        },
      },
    });

    console.log("Categories seeded:", category1, category2);

    // Seed users
    const adminUser = await prisma.user.create({
      data: {
        email: "admin@goldendrops.com",
        firstName: "Golden",
        lastName: "Drops",
        birthdate: new Date(),
        gender: "MALE",
        country: "US",
        state: "CA",
        city: "Los Angeles",
        address1: "123 Main St",
        hasAdminAccess: true,
      },
    });

    const user1 = await prisma.user.create({
      data: {
        email: "user1@example.com",
        firstName: "John",
        lastName: "Doe",
        birthdate: new Date("1990-01-01"),
        gender: "MALE",
        country: "US",
        state: "CA",
        city: "Los Angeles",
        address1: "123 Main St",
        hasAdminAccess: false,
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "user2@example.com",
        firstName: "Jane",
        lastName: "Smith",
        birthdate: new Date("1995-05-10"),
        gender: "FEMALE",
        country: "GB",
        state: "ENG",
        city: "London",
        address1: "456 Elm St",
        hasAdminAccess: true,
      },
    });

    console.log("Users seeded:", adminUser, user1, user2);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
