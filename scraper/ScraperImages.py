from bs4 import BeautifulSoup
import requests
import os
import uuid 
import json
import urllib
from utils import heightConverter, weightConverter, wikiWeightConverter, wikiHeightConverter, lifeSpanFormatter

import json

breedNamesArray = json.load(open('breedsTest.json', encoding='utf-8'))

from google_images_download import google_images_download
#instantiate the class

for breedName in breedNamesArray:
    breed = breedName['name'].replace(" ", "+")
    response = google_images_download.googleimagesdownload()
    arguments = {"keywords": breed,"limit": 80,"print_urls":True, "size": "medium"}
    paths = response.download(arguments)
    #print complete paths to the downloaded images
    print(paths)