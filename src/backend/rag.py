import os

from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate

from jina_embeddings import JinaEmbeddings

load_dotenv()


def loader():

    # ==========================================
    # 1. Jina Embeddings
    # ==========================================

    embeddings = JinaEmbeddings(
        model="jina-embeddings-v5-text-small"
    )

    # ==========================================
    # 2. Load Jina Chroma database
    # ==========================================

    vectorstore = Chroma(
        persist_directory="chromadb_jina",
        embedding_function=embeddings
    )

    # ==========================================
    # 3. Retriever
    # ==========================================

    retriever = vectorstore.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": 8,
            "fetch_k": 20,
            "lambda_mult": 0.7
        }
    )

    # ==========================================
    # 4. Groq
    # ==========================================

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        api_key=os.getenv("GROQ_API_KEY")
    )

    return retriever, llm


def ask_rag(query, retriever, llm):

    # ==========================================
    # 5. Retrieve relevant documents
    # ==========================================

    retrieved_docs = retriever.invoke(query)

    # ==========================================
    # 6. Build context
    # ==========================================

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

--------------------------------
"""

    # ==========================================
    # 7. RAG prompt
    # ==========================================

    prompt = ChatPromptTemplate.from_template(
        """
You are an intelligent university assistant.

You have access to information from the
university's official documents.

Your job is to READ, UNDERSTAND, and SYNTHESIZE
the information before answering.

RULES:

1. Answer the user's actual question directly.

2. Use the provided documents as your primary
   source of truth.

3. Combine information from multiple documents
   when necessary.

4. Summarize and explain information instead of
   simply copying it.

5. Do not copy large sections of the documents.

6. If the question requires reasoning, explain
   the answer using the available information.

7. Do not invent facts that are not supported
   by the documents.

8. If the documents do not contain enough
   information, clearly say that the information
   could not be found in the provided documents.

9. Answer naturally and conversationally.

10. Use bullet points or tables when useful.

11. Never mention embeddings, vector databases,
    retrieved chunks, or internal context.

DOCUMENTS:

{context}

========================================

USER QUESTION:

{question}

========================================

Now understand the documents and answer the
user's question.
"""
    )

    # ==========================================
    # 8. Ask Groq
    # ==========================================

    messages = prompt.format_messages(
        context=context,
        question=query
    )

    response = llm.invoke(messages)

    return response.content