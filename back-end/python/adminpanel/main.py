from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
import yt_dlp
import json
import os
from typing import Optional

app = FastAPI()


@app.get("/hello")
async def hello():
    return {"message": "Hello, World!"}
# API POST yêu cầu URL video từ người dùng
# @app.post("/download-video")
# async def download_video_api(request: URLRequest, authorization: Optional[str] = Header(None)):
#     if authorization is None:
#         raise HTTPException(status_code=401, detail="Authorization header missing")
    
#     # Kiểm tra token (tùy chỉnh theo yêu cầu của bạn)
#     if authorization != "Bearer YOUR_TOKEN":
#         raise HTTPException(status_code=403, detail="Invalid or missing token")
    
#     url = request.utubeURL
#     response = download_video(url)
    
#     if isinstance(response, str):  # Trường hợp có lỗi
#         raise HTTPException(status_code=500, detail=f"Error: {response}")
    
#     return {"message": "Video downloaded successfully", "video_info": response}