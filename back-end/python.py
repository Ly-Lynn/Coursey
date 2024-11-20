import requests

url = "https://f02b-222-253-85-202.ngrok-free.app/course/getBestRatingCourse.php"
response = requests.get(url)

if response.status_code == 200:
    print("Response:", response.json())  # Nếu API trả về JSON
else:
    print("Request failed with status code:", response.status_code)