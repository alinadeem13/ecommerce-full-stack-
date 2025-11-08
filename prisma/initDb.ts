import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();
const dbFile = "./dev.db";

async function main() {
  // Remove existing DB if you want to reset
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
    console.log("✅ Old DB removed");
  }

  // SQLite automatically creates the DB file on first query
  console.log("✅ Creating tables...");
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS Product (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      price INTEGER NOT NULL,
      image TEXT,
      category TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await prisma.product.createMany({
    data: [
      {
        id: "1",
        title: "Wireless Headphones",
        slug: "wireless-headphones",
        description: "High-quality sound and noise cancellation.",
        price: 19900,
        image: "/images/headphones.jpg",
        category: "Electronics",
      },
      {
        id: "2",
        title: "Smart Watch",
        slug: "smart-watch",
        description: "Track your fitness and health metrics.",
        price: 14900,
        image: "/images/watch.jpg",
        category: "Electronics",
      },
      {
        id: "3",
        title: "Gaming Mouse",
        slug: "gaming-mouse",
        description: "Precision clicks and RGB lighting.",
        price: 9900,
        image: "/images/mouse.jpg",
        category: "Accessories",
      },
    ],
  });

  console.log("✅ Tables created!");

  // Seed sample products
  await prisma.product.createMany({
    data: [
      {
        id: "1",
        title: "Wireless Headphones",
        slug: "wireless-headphones",
        description: "High-quality sound and noise cancellation.",
        price: 19900,
        image: "/images/headphones.jpg",
      },
      {
        id: "2",
        title: "Smart Watch",
        slug: "smart-watch",
        description: "Track your fitness and health metrics.",
        price: 14900,
        image: "/images/watch.jpg",
      },
      {
        id: "3",
        title: "Gaming Mouse",
        slug: "gaming-mouse",
        description: "Precision clicks and RGB lighting.",
        price: 9900,
        image: "/images/mouse.jpg",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });
