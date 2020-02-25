from bs4 import BeautifulSoup
import requests
import re
import json
from utils import removeBracketsContent, namesFixer, characteristcsHelper, checkAssociation

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
soupWiki = BeautifulSoup(requests.get("https://en.wikipedia.org/wiki/List_of_cat_breeds").text, 'html.parser')
soupCatTime = BeautifulSoup(requests.get("https://cattime.com/").text, 'html.parser')

tagsCatTime = soupCatTime.find_all("a", href=re.compile("cattime.com/cat-breeds"))

tableWiki = soupWiki.find("table", {"class": "wikitable"}).find('tbody').find_all("tr")

wikiTableElements = []
wikiTableNames = []
catTimeBreedsLinks = []

for tag in tagsCatTime: catTimeBreedsLinks.append(tag.get('href'))

###########################
### FETCH WIKI DATA ###
###########################

for index, el in enumerate(tableWiki):
    if index > 0:
        item = {} 
        associations = []
        elements = el.find_all('td')
        name = namesFixer(removeBracketsContent(el.find('th').text.replace("\n", "")))
        wikipediaLink = "https://en.wikipedia.org" + el.find('a')['href'] if el.find('a') else ""
        country = removeBracketsContent(elements[0].text.replace("\n", ""))
        pictures = []
        origin = removeBracketsContent(elements[1].text.replace("\n", ""))
        if elements[5].find('img'): pictures.append('https:' + str(elements[5].find('img')['src']))

        item['id'] = removeBracketsContent(name.replace(" ", ""))
        item['name'] = name
        item['wikipediaLink'] = wikipediaLink.replace("\n", "")
        item['socialMediaTag'] = removeBracketsContent(name.replace(" ", "") + "cat")
        item['countryDescription'] = country

        if "(foundation" in country or "(some foundation" in country or "; foundation stock ultimately from Thailand" in country:
            item['country'] = re.sub(r'\(.*\)', '', country).replace('; foundation stock ultimately from Thailand', "")
        else:
            item['country'] = country
        
        if len(origin) > 10:
            if "Crossbreed: " in origin:
                item['origin'] = "Crossbreed"
                item['originDescription'] = origin.replace("Crossbreed: ", "")
            if "Crossbreed/hybrid: " in origin:
                item['origin'] = "Crossbreed/hybrid"
                item['originDescription'] = origin.replace("Crossbreed/hybrid: ", "")
            if "Mutation, crossbreed: " in origin:
                item['origin'] = "Mutation, crossbreed"
                item['originDescription'] = origin.replace("Mutation, crossbreed: ", "")
            if "Variety of" in origin:
                item['origin'] = "Variety"
                item['originDescription'] = origin
            if "Mutation of" in origin:
                item['origin'] = "Mutation"
                item['originDescription'] = origin
            if "Hybrid: " in origin:
                item['origin'] = "Hybrid"
                item['originDescription'] = origin.replace("Hybrid: ", "")
            if "Natural, mutation" in origin:
                item['origin'] = "Natural, mutation"
            if "Mutation, from the traditional Persian" in origin:
                item['origin'] = "Mutation"
                item['originDescription'] = "Mutation, from the traditional Persian"
            if "Natural, but some crossing with Turkish Angora" in origin:
                item['origin'] = "Natural"
                item['originDescription'] = "Natural, but some crossing with Turkish Angora"
            if "Mutation (falsely claimed to be a bobcat hybrid early on)" in origin:
                item['origin'] = "Mutation"
                item['originDescription'] = "Falsely claimed to be a bobcat hybrid early on"
            if "Behavioural Mutation in a crossbreed, presumed Persian or Turkish Angora and Birman or Burmese" in origin:
                item['origin'] = "Mutation"
                item['originDescription'] = "Behavioural Mutation in a crossbreed, presumed Persian or Turkish Angora and Birman or Burmese"
        elif origin == "": item['origin'] = "Natural"
        else: item['origin'] = origin

        item['bodyType'] = removeBracketsContent(elements[2].text.replace("\n", ""))
        item['coatLength'] = removeBracketsContent(elements[3].text.replace("\n", ""))
        item['pattern'] = removeBracketsContent(elements[4].text.replace("\n", ""))
        item['pictures'] = pictures

        print(name)

        if el.find('a'):
            soupBreedLink = BeautifulSoup(requests.get(wikipediaLink).text, 'html.parser')
            linksText = soupBreedLink.findAll('a')
            paragraphs = list(map(lambda x: x.text, soupBreedLink.find_all('p')))
            paragraph = next(x for x in paragraphs if len(x) > 20)
            item['description'] = paragraph

            breedPicsDiv = soupBreedLink.find_all("div", {"class": "thumbinner"})
            
            for index, pic in enumerate(breedPicsDiv):
                if name == "Siamese (modern)":
                    if index == 2:
                        print('nothing')
                    else: 
                        print('https:' + str(pic.find('img')['src']))
                        pictures.append('https:' + str(pic.find('img')['src']))
                else: 
                        print('https:' + str(pic.find('img')['src']))
                        pictures.append('https:' + str(pic.find('img')['src']))
            

            for linkText in linksText:
                if checkAssociation(linkText.text):
                    associations.append(linkText.text)
                    print(linkText.text)

        if len(associations) > 0:
            item['associations'] = associations

        def addCharacteristics(link):

            soupLink = BeautifulSoup(requests.get(link).text, 'html.parser')
            characteristics = {}

            for characteristic in soupLink.find_all("div", {"class": "child-characteristic"}):
                characteristicTitle = characteristic.find("div", {"class": "characteristic-title"}).text.title().replace(" ", "")[0].lower() + characteristic.find("div", {"class": "characteristic-title"}).text.title().replace(" ", "")[1:] 
                characteristicStars = characteristic.find("div", {"class": "star"}).attrs['class'][1].split("-")[1]
                characteristics[characteristicTitle] = { "name": characteristic.find("div", {"class": "characteristic-title"}).text, "rate": characteristicStars} 
            
            item['characteristics'] = characteristics
        
        for link in catTimeBreedsLinks:
            if name.lower().replace(" ", "-") == link.split("/")[-1] or name.lower().replace(" ", "-") + "-cats" == link.split("/")[-1] or name.lower().replace(" ", "-") + "-cat" == link.split("/")[-1]:
                addCharacteristics(link)

        if characteristcsHelper(name):
            addCharacteristics(link)

        
            
        wikiTableElements.append(item)
        print()

with open("breeds.json", "w", encoding="utf-8") as writeJSON:
     json.dump(wikiTableElements, writeJSON, ensure_ascii=False)


