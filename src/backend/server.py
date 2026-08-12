from fastapi import FastAPI
from rag import loader, ask_rag

app = FastAPI()

retriever = None
llm = None


@app.on_event("startup")
async def startup_event():
    global retriever, llm

    print("Loading RAG system...")

    retriever, llm = loader()

    print("RAG system ready!")

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "University RAG API is running"
    }


@app.post("/query")
def getResponse(query: str):

    return ask_rag(
        query,
        retriever,
        llm
    )
