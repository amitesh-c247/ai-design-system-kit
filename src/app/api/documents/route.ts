import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Mock database - in production, this would be a real database
const DB_FILE = path.join(process.cwd(), "data", "documents.json");

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  description?: string;
  fileName: string; // File name in storage
}

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Ensure uploads directory exists
async function ensureUploadsDir() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
}

// Load documents from JSON file
async function loadDocuments(): Promise<Document[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save documents to JSON file
async function saveDocuments(documents: Document[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(DB_FILE, JSON.stringify(documents, null, 2));
}

// GET - List documents with pagination and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const search = searchParams.get("search") || "";

    const documents = await loadDocuments();

    // Filter documents based on search
    let filteredDocuments = documents;
    if (search) {
      filteredDocuments = documents.filter(
        (doc) =>
          doc.name.toLowerCase().includes(search.toLowerCase()) ||
          doc.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by upload date (newest first)
    filteredDocuments.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    // Paginate
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex);

    return NextResponse.json({
      documents: paginatedDocuments,
      total: filteredDocuments.length,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}

// POST - Upload document
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    await ensureUploadsDir();

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name;
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);
    const fileName = `${timestamp}_${nameWithoutExt}${extension}`;

    // Save file to uploads directory
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);
    const arrayBuffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    // Create document record
    const document: Document = {
      id: timestamp.toString(),
      name: originalName,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      description: description || undefined,
      fileName: fileName,
    };

    // Save to database
    const documents = await loadDocuments();
    documents.unshift(document);
    await saveDocuments(documents);

    return NextResponse.json({
      success: true,
      document,
      message: "Document uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}
