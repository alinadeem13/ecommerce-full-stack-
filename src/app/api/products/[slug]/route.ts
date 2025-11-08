import { NextResponse } from "next/server";
import Database from "better-sqlite3";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
  const db = new Database("./dev.db", { readonly: true });

  const product = db
    .prepare("SELECT * FROM Product WHERE slug = ?")
    .get(params.slug);

  db.close();

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
