import { NextResponse } from "next/server";
import Database from "better-sqlite3";

export async function GET() {
  const db = new Database("./dev.db", { readonly: true });

  const products = db.prepare("SELECT * FROM Product").all();

  db.close();

  return NextResponse.json(products);
}
