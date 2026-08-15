import requests
import re
import json

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "Referer": "https://vidup.to/",
    "X-Requested-With": "XMLHttpRequest"
}

API = "https://enc-dec.app/api"

def validate(data, path):
    if data["status"] != 200:
        print(f"\n{'-'*25} API ERROR {'-'*25}\n")
        print(f"Path: {path}")
        print(f"Status Code: {data['status']}")
        print(f"Error: {data.get('error', 'unknown')}")
        raise SystemExit
    return data["result"]

title = "Game of Thrones"
type = "tv"
year = "2011"
imdb_id = "tt0944947"
tmdb_id = "1399"
season = "1"
episode = "1"

base_url = f"https://vidup.to/tv/{tmdb_id}/{season}/{episode}/"
response = requests.get(base_url).text

match = re.search(r'\\"(?:en|token)\\":\\"(.*?)\\"', response)
text = match.group(1)

enc_vidup = f"{API}/enc-vidup?text={text}"
response = requests.get(enc_vidup).json()
parts = validate(response, enc_vidup)
servers = parts['servers']
stream = parts['stream']
token = parts['token']

HEADERS["X-CSRF-Token"] = token

servers_encrypted = requests.post(servers, headers=HEADERS).text
dec_vidup = f"{API}/dec-vidup"
response = requests.post(dec_vidup, json={"text": servers_encrypted}).json()
servers_decrypted = validate(response, dec_vidup)

server = servers_decrypted[0]
data = server['data']

stream = f"{stream}/{data}"
stream_encrypted = requests.post(stream, headers=HEADERS).text

dec_vidup = f"{API}/dec-vidup"
response = requests.post(dec_vidup, json={"text": stream_encrypted}).json()
stream_decrypted = validate(response, dec_vidup)

print(json.dumps(stream_decrypted, indent=2))
