import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

app = FastAPI(title="FITOS AI Service")

bearer = HTTPBearer()
async def verify_token(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    token = os.getenv("AI_SERVICE_TOKEN", "fitos-ai-token")
    if creds.credentials != token:
        raise HTTPException(status_code=403, detail="Invalid token")

class PromptRequest(BaseModel):
    prompt: str

@app.post("/llm/chat", dependencies=[Depends(verify_token)])
async def chat(req: PromptRequest):
    # Dummy response for now. Will connect to OpenAI later.
    return {"answer": f"Received prompt: {req.prompt}. AI integration pending."}
