import os

from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

load_dotenv()


def loader():

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )


    vectorstore = Chroma(
        persist_directory="chromadb",
        embedding_function=embeddings
    )

  
    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": 8,
            "fetch_k": 20,
            "lambda_mult": 0.7
        }
    )

 
    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        api_key=os.getenv("GROQ_API_KEY")
    )

    print("RAG system loaded successfully!")

    return retriever, llm


def ask_rag(query, retriever, llm):

   
    retrieved_docs = retriever.invoke(query)

  
    context = ""

    for i, doc in enumerate(retrieved_docs, 1):

        source = doc.metadata.get(
            "source",
            "Unknown"
        )

        context += f"""
DOCUMENT {i}
SOURCE: {source}

{doc.page_content}

----------------------------------------
"""
    prompt = ChatPromptTemplate.from_template(
        """
You are an intelligent university assistant.

You have access to information retrieved from
the university's official documents.

Your job is NOT to simply copy the retrieved
text.

You must READ, UNDERSTAND, and SYNTHESIZE the
information before answering.

RULES:

1. Answer the user's actual question directly.

2. Use the retrieved documents as your source
   of truth.

3. You may combine information from multiple
   documents or multiple sections to construct
   one answer.

4. You may summarize, compare, explain,
   categorize, and reason about the information
   contained in the documents.

5. Do NOT simply copy large sections of the
   documents.

6. If the user asks "why", "how", "which",
   "what is the difference", or another
   reasoning-style question, explain the answer
   using the information in the documents.

7. If the answer requires combining several
   pieces of information, combine them yourself.

8. Do NOT invent facts that aren't supported
   by the documents.

9. If the documents do not contain enough
   information to answer the question, clearly
   say that you could not find enough information
   in the provided documents.

10. Give the answer in a natural conversational
    manner.

11. When useful, use bullet points or a table
    instead of copying paragraphs.

12. Do not mention "retrieved chunks",
    "vector database", "embeddings", or
    "context" in your answer.

DOCUMENTS:

{context}

========================================

USER QUESTION:

{question}

========================================

Now understand the information in the documents
and answer the user's question.
"""
    )

    messages = prompt.format_messages(
        context=context,
        question=query
    )

    response = llm.invoke(messages)


    return {
        "answer": response.content,
        "sources": list(
            set(
                doc.metadata.get("source", "Unknown")
                for doc in retrieved_docs
            )
        )
    }



if __name__ == "__main__":

    retriever, llm = loader()

    query = input("\nAsk a question: ")

    result = ask_rag(
        query,
        retriever,
        llm
    )

    print("\n========================================")
    print("ANSWER")
    print("========================================\n")

    print(result["answer"])

    print("\n========================================")
    print("SOURCES")
    print("========================================")

    for source in result["sources"]:
        print("-", source)