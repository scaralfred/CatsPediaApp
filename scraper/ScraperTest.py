from bs4 import BeautifulSoup
import requests
import os
import uuid 
import json
import urllib
from utils import heightConverter, weightConverter, wikiWeightConverter, wikiHeightConverter, lifeSpanFormatter

dogBreeds = ['american bulldog', 'dogo argentino'] 

from google_images_download import google_images_download
#instantiate the class

for breed in dogBreeds:
    response = google_images_download.googleimagesdownload()
    arguments = {"keywords": breed.replace(" ", "+"),"limit": 80,"print_urls":True, "size": "medium"}
    paths = response.download(arguments)
    #print complete paths to the downloaded images
    print(paths)


# headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

# query = 'cane corso'
# link = "https://www.google.com/search?q=" + query.replace(" ", "+") + "&tbm=isch"

# soupChrome = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser') 

# images = soupChrome.find_all('img', class_="rg_ic rg_i")

# for img in images:
#     print(img)
#     print('\n')
        
# number_results = len(thumbnail_results)

# print(f"Found: {number_results} search results. Extracting links from {results_start}:{number_results}")

# path = query.replace(" ", "_") + "/"
# url = "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/18123713/Cane-Corso-AKC-121516-296.jpg"

# if os.path.isdir(path):
#     urllib.request.urlretrieve(url, path + str(uuid.uuid4()) + ".jpg")
# else:
#     os.makedirs(path)
#     urllib.request.urlretrieve(url, path + str(uuid.uuid4()) + ".jpg")