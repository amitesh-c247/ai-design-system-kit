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

// Load documents from JSON file
async function loadDocuments(): Promise<Document[]> {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Save documents to JSON file
async function saveDocuments(documents: Document[]): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  await fs.writeFile(DB_FILE, JSON.stringify(documents, null, 2));
}

// GET - Download document
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const documents = await loadDocuments();
    const document = documents.find((doc) => doc.id === id);

    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      document.fileName
    );

    try {
      const fileBuffer = await fs.readFile(filePath);

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": document.type,
          "Content-Disposition": `attachment; filename="${document.name}"`,
          "Content-Length": document.size.toString(),
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "File not found on disk" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error downloading document:", error);
    return NextResponse.json(
      { error: "Failed to download document" },
      { status: 500 }
    );
  }
}

// DELETE - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const documents = await loadDocuments();
    const documentIndex = documents.findIndex((doc) => doc.id === id);

    if (documentIndex === -1) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const document = documents[documentIndex];

    // Delete file from disk
    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      document.fileName
    );
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.warn("File not found on disk, continuing with database deletion");
    }

    // Remove from database
    documents.splice(documentIndex, 1);
    await saveDocuments(documents);

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete document" },
      { status: 500 }
    );
  }
}
