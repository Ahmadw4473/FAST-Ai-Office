from fastapi import FastAPI
from rag import loader, ask_rag
from pydantic import BaseModel

app = FastAPI()

retriever = None
llm = None

class QueryRequest(BaseModel):
    query: str


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
def getResponse(request: QueryRequest):

    return {"answer": ask_rag(
        query=request.query,
        retriever=retriever,
        llm=llm
    )}
