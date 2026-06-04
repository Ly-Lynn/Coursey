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
        # Check if cookies file exists and add it to options
        cookies_path = os.environ.get('YOUTUBE_COOKIES_PATH', '/app/cookies/youtube_cookies.txt')
        if os.path.exists(cookies_path):
            getPlaylist_opts = dict(getPlaylist_opts)  # Create a copy
            getPlaylist_opts['cookiefile'] = cookies_path
            print(f"Using cookies from: {cookies_path}")
        else:
            print(f"Warning: Cookies file not found at {cookies_path}, proceeding without authentication")
            # Add extractor args as fallback
            getPlaylist_opts = dict(getPlaylist_opts)
            getPlaylist_opts['extractor_args'] = {
                'youtube': {
                    'player_client': ['android', 'web']
                }
            }
        
        with YoutubeDL(getPlaylist_opts) as ydl:
            playlist_info = ydl.extract_info(url, download=False)  # not download the info of playlist
        
        # Handle both single videos and playlists
        if "entries" in playlist_info:
            # It's a playlist
            videos = playlist_info["entries"]
        else:
            # It's a single video, wrap it in a list
            videos = [playlist_info]
        
        # Extract video information
        video_urls = []
        for video in videos:
            if video is None:
                continue
            # Handle different URL formats
            if "url" in video:
                video_id = video["url"].split("?v=")[-1] if "?v=" in video["url"] else video.get("id", "")
            else:
                video_id = video.get("id", "")
            video_urls.append(video_id)
        
        durations = [(video.get("duration") or 0) / 3600 for video in videos if video is not None]
        total_times = sum(durations)
        view_count = max([video.get("view_count") or 0 for video in videos if video is not None], default=0)
        titles = [video.get("title", "No title") for video in videos if video is not None]
                
        results = {
            "urls": video_urls,
            "total_times": total_times,
            "view_count": view_count,
            "durations": durations,
            "titles": titles,
        }
        return results