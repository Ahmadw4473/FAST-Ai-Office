import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import Docx2txtLoader
from langchain_community.vectorstores import Chroma

from jina_embeddings import JinaEmbeddings

load_dotenv()


def main():

    documents_folder = Path("documents")

    docx_files = list(documents_folder.glob("*.docx"))

    print(f"Found {len(docx_files)} Word files")

    if not docx_files:
        print("No .docx files found.")
        return



    all_documents = []

    for docx_file in docx_files:

        print(f"\nLoading: {docx_file.name}")

        loader = Docx2txtLoader(str(docx_file))
        documents = loader.load()

        for document in documents:
            document.metadata["source"] = docx_file.name

        print("  Loaded successfully")

        all_documents.extend(documents)

    print(f"\nTotal documents loaded: {len(all_documents)}")

   

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=200
    )

    docs = text_splitter.split_documents(all_documents)

    print(f"Total chunks created: {len(docs)}")

 
    print("\nConnecting to Jina...")

    embeddings = JinaEmbeddings(
        model="jina-embeddings-v5-text-small"
    )

 

    print("\nCreating Jina Chroma database...")

    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embeddings,
        persist_directory="chromadb_jina"
    )

    print("\n===================================")
    print("Jina vector database created!")
    print("===================================")


if __name__ == "__main__":
    main()