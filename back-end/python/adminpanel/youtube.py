import json
import os
from typing import List
from yt_dlp import YoutubeDL
import json

# https://github.com/yt-dlp/yt-dlp: lib for downloader
# https://github.com/coletdjnz/yt-dlp-youtube-oauth2: fix authentic validate

METADATA_FILENAME = "playlist_metadata.json"
DATA_DIR = "./"

class YoububeDownloader:
    def __init__(self, 
                 course_name: str,
                 output_course_path: str = "./", 
                 ) -> None:
        
        self.course_name = course_name
        self.output_course_path = output_course_path
        
        self.audio_folder = os.path.join(output_course_path, course_name, "audio")
        os.makedirs(self.audio_folder, exist_ok=True)
        
        self.audioDownLoader_opts = {
            'format': 'bestaudio/best',
            'outtmpl': '', # custom
            'postprocessors': [
                {
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'wav',
                    'preferredquality': '10',
                }
            ],
            'no_warnings': True,
            'quiet': True,
            '--no-ignore-no-formats-error': True,
            'username': 'oauth2',
            'password': '',
        }

        self.getPlaylist_opts = {
            "extract_flat": "in_playlist",
            "skip_download": True
        }
    
    
    def audioDownLoader(self, urls: List[str]) -> None:
        video_info_list = []
        for i, url in enumerate(urls):
            self.audioDownLoader_opts["outtmpl"] = os.path.join(self.audio_folder, f'{i}.wav')
            with YoutubeDL(self.audioDownLoader_opts) as ydl:
                info = ydl.extract_info(url, download=False)
                
                # video_info = {
                #     'id': info.get('id', 'No id'),
                #     'title': info.get('title', 'No title'),
                #     'channel': info.get('channel', 'No channel'),
                #     'url': url,
                #     'video_path': os.path.join(self.audio_folder, f'{i}.wav')
                # }
                video_info = {
                        'id': info.get('id', 'No id'),
                        'title': info.get('title', 'No title'),
                        'channel': info.get('channel', 'No channel'),
                        'url': url,
                        'description': info.get('description', 'No description'),
                        'chapters': info.get('chapters', 'No chapters'),
                        'duration': info.get('duration', 'Unknown'),
                    }
                video_info_list.append(video_info)
            try:    
                ydl.download([url])
            except:
                continue    
            
        save_metadata_file = os.path.join(
            self.output_course_path, 
            self.course_name,
            METADATA_FILENAME
        )
            
        with open(save_metadata_file, "w") as f:
            json.dump(video_info_list, f, indent=4)
            
    @staticmethod
    def getURLList(url: str, getPlaylist_opts={"extract_flat": "in_playlist", "skip_download": True}) -> List[str]:
        with YoutubeDL(getPlaylist_opts) as ydl:
            playlist_info = ydl.extract_info(url, download=False)  # not download the info of playlist
        
        video_urls = [video["url"].split("?v=")[1] for video in playlist_info["entries"]]
        durations = [video.get("duration", 0) / 3600 for video in playlist_info["entries"]]
        total_times = sum(durations)
        view_count = max([video.get("view_count", 0) for video in playlist_info["entries"]])
        titles = [video.get("title", "No title") for video in playlist_info["entries"]]
                
        results = {
            "urls": video_urls,
            "total_times": total_times,
            "view_count": view_count,
            "durations": durations,
            "titles": titles,
        }
        return results