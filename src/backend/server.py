from fastapi import FastAPI, HTTPException
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
    if retriever is None or llm is None:
        raise HTTPException(
            status_code=503,
            detail="RAG system is not ready. Check backend startup logs."
        )

    try:
        return {"answer": ask_rag(
            query=request.query,
            retriever=retriever,
            llm=llm
        )}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
