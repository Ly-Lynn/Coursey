import requests

url = "https://13bf-14-169-96-247.ngrok-free.app//course//getBestViewCourse.php"

try:
    response = requests.get(url)
    response.raise_for_status()  # Kiểm tra nếu yêu cầu thất bại (HTTP status không 2xx)
    

    print(response.json()) #    
    # Nếu server trả về text hoặc HTML
    # data = response.text
    # print("Response text:", data)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)