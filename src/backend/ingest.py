from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import Docx2txtLoader
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings


def main():

    documents_folder = Path("documents")

    # Find Word files
    word_files = list(documents_folder.glob("*.docx"))

    print(f"Found {len(word_files)} Word files")

    if not word_files:
        print("No .docx files found in the documents folder.")
        return

    all_documents = []

    # Load every Word file
    for word_file in word_files:

        print(f"\nLoading: {word_file.name}")

        loader = Docx2txtLoader(str(word_file))
        documents = loader.load()

        # Add source metadata
        for document in documents:
            document.metadata["source"] = word_file.name

        print(f"  Documents loaded: {len(documents)}")

        all_documents.extend(documents)

    print(f"\nTotal documents loaded: {len(all_documents)}")

    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200
    )

    docs = text_splitter.split_documents(all_documents)

    print(f"Total chunks created: {len(docs)}")

    # Embeddings
    print("\nLoading embedding model...")

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    # Create Chroma database
    print("\nCreating Chroma database...")

    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory="chromadb"
    )

    # Verify database
    data = vectorstore.get()

    sources = set()

    for metadata in data["metadatas"]:
        if metadata:
            sources.add(metadata.get("source", "UNKNOWN"))

    print("\n===================================")
    print("INGESTION COMPLETE")
    print("===================================")

    print("Total chunks in Chroma:", len(data["documents"]))
    print("Unique Word files in Chroma:", len(sources))

    print("\nFiles stored in Chroma:")

    for source in sorted(sources):
        print("-", source)


if __name__ == "__main__":
    main()