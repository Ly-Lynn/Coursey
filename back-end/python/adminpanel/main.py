from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
import yt_dlp
import json
import os
from typing import Optional
from youtube import YoububeDownloader

app = FastAPI()


@app.get("/hello")
async def hello():
    return {"message": "Hello, World!"}


class URLRequest(BaseModel):
    url: str

@app.post("/getUrllist")
async def getURlList(request: URLRequest):
    try:
        urls = YoububeDownloader.getURLList(request.url)
        return {'message': urls}
    except Exception as e:
        return {'message': 'Error', 'details': str(e)}