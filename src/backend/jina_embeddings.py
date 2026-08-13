import os
import requests


class JinaEmbeddings:

    def __init__(
        self,
        model="jina-embeddings-v5-text-small"
    ):
        self.api_key = os.getenv("JINA_API_KEY")
        self.model = model

        if not self.api_key:
            raise ValueError(
                "JINA_API_KEY is not set in the environment."
            )

    def _embed(self, texts):

        response = requests.post(
            "https://api.jina.ai/v1/embeddings",
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": self.model,
                "input": texts
            },
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        return [
            item["embedding"]
            for item in data["data"]
        ]

    def embed_documents(self, texts):
        return self._embed(texts)

    def embed_query(self, text):
        return self._embed([text])[0]
    