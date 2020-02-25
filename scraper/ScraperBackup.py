from bs4 import BeautifulSoup
import requests
import re
import json
from utils import heightConverter, weightConverter, wikiWeightConverter, wikiHeightConverter, lifeSpanFormatter
from helpers import dogHeights, dogWeights, dogLifeSpans, breedGroups
from additionalData import additionalBreeds 

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
soupDogTime = BeautifulSoup(requests.get("https://dogtime.com/").text, 'html.parser')
soupWiki = BeautifulSoup(requests.get("https://en.wikipedia.org/wiki/List_of_dog_breeds").text, 'html.parser')

tagsDogTime = soupDogTime.find_all("a", href=re.compile("dogtime.com/dog-breeds"))
tableWiki = soupWiki.find("table", {"class": "wikitable"}).find('tbody').find_all("tr")


dogTimeBreedsLinks = []
dogTimeItems = []
dogTimeBreedsNames = []
additionalBreedsNames = []

for tag in tagsDogTime: dogTimeBreedsLinks.append(tag.get('href'))

for item in additionalBreeds: additionalBreedsNames.append(item['name'])

###########################
### FETCH DOGTIMES DATA ###
###########################
for link in dogTimeBreedsLinks:
    soup = BeautifulSoup(requests.get(link).text, 'html.parser')
    item = {}
    breedName = soup.find("h1").text
    print(breedName)
    breedNameAdjusted = 'English Mastiff' if breedName == 'Mastiff' else 'Collie, Rough' if breedName == 'Collie' else 'King Charles Spaniel' if breedName == 'English Toy Spaniel' else 'Appenzeller Sennenhund' if breedName == 'Appenzeller Sennenhunde' else 'Bavarian Mountain Scent Hound' if breedName == 'Bavarian Mountain Hound' else 'Belgian Shepherd Dog (Malinois)' if breedName ==  'Belgian Malinois' else 'Belgian Shepherd Dog (Tervuren)' if breedName == 'Belgian Tervuren' else 'Belgian Shepherd Dog (Groenendael)' if breedName == 'Belgian Sheepdog' else 'Bichon Frisé' if breedName == 'Bichon Frise' else 'Welsh Corgi, Cardigan' if breedName == 'Cardigan Welsh Corgi' else 'Louisiana Catahoula Leopard Dog' if breedName == 'Catahoula Leopard Dog' else 'Chinese Crested Dog' if breedName == 'Chinese Crested' else 'Shar-Pei' if breedName == 'Chinese Shar-Pei' else 'German Spaniel' if breedName == 'Deutscher Wachtelhund' else 'Drentse Patrijshond' if breedName == 'Drentsche Patrijshond' else 'Hanover Hound' if breedName == 'Hanoverian Scenthound' else 'Nederlandse Kooikerhondje' if breedName == 'Kooikerhondje' else 'Jindo' if breedName == 'Korean Jindo Dog' else 'Löwchen' if breedName == 'Lowchen' else 'Welsh Corgi, Pembroke' if breedName == 'Pembroke Welsh Corgi' else 'Petit Basset Griffon Vendéen' if breedName == 'Petit Basset Griffon Vendeen' else 'Plott Hound' if breedName == 'Plott' else 'English Pointer' if breedName == 'Pointer' else 'Portuguese Podengo Pequeno' if breedName == 'Portuguese Podengo' else 'Münsterländer, Small' if breedName == 'Small Munsterlander Pointer' else 'Soft-Coated Wheaten Terrier' if breedName == 'Soft Coated Wheaten Terrier' else breedName
    item['breedName'] =  breedNameAdjusted                                                                           
    item['breedGroup'] = soup.find_all('div', {"class": 'vital-stat-box'})[0].text.split(':', 1)[-1]
    item['popularity'] = len(str(soup))
    item['heightRange'] = soup.find_all('div', {"class": 'vital-stat-box'})[1].text.split(':', 1)[-1]
    item['weightRange'] = soup.find_all('div', {"class": 'vital-stat-box'})[2].text.split(':', 1)[-1]
    item['lifeSpan'] = soup.find_all('div', {"class": 'vital-stat-box'})[3].text.split(':', 1)[-1]

    if soup.find('img', {"class": 'breed-featured-img'}): 
        item['dogTimePicture'] = soup.find('img', {"class": 'breed-featured-img'})['src']

    for characteristic in soup.find_all("div", {"class": "breed-characteristics-ratings-wrapper"}):
        characteristicObject = {}
        parentCharacteristic = "friendliness" if "Friendliness" in characteristic.find('h3').text.strip() else "grooming" if "Grooming" in characteristic.find('h3').text.strip() else characteristic.find('h3').text.strip()
        item[parentCharacteristic.replace(" ", "")[0].lower() + parentCharacteristic.replace(" ", "")[1:]] = characteristicObject
        characteristicObject["mainRate"] = characteristic.find("div", {"class": "star"}).attrs['class'][1].split("-")[1]
        for childCharacteristic in characteristic.find_all("div", {"class": "child-characteristic"}):
            characteristicObject[childCharacteristic.find("div", {"class": "characteristic-title"}).text.strip()] = childCharacteristic.find("div", {"class": "star"}).attrs['class'][1].split("-")[1]
    
    if breedName != "Afador":
        dogTimeItems.append(item)
    # if breedNameAdjusted == 'Collie, Rough':
    #     item['breedName'] = 'Collie, Smooth'
    #     dogTimeItems.append(item)
    #     dogTimeBreedsNames.append('Collie, Smooth')


wikiTableElements = []
wikiTableNames = []
wikiBreedPages = []

lifeSpanHelpers = []
heightRangeHelpers = []
weightRangeHelpers = []

for item in additionalBreeds: wikiTableElements.append(item)
###########################
### FETCH WIKI DATA ###
###########################

for index, el in enumerate(tableWiki):
    item = {} 
    elements = el.find_all('td')
    federationsAndClubs = {}
    if elements and elements[1].find('a') and elements[3].text != 'Extinct':
        pictures = []
        name = elements[1].find('a').text
        item['id'] = name.replace(" ", "")
        item['name'] = name
        wikiTableNames.append(name)
        
        item['pictures'] = pictures
        item['socialMediaTag'] = name.replace(" ", "")
        if elements[0]: 
            if elements[0].find('img'): pictures.append('https:' + str(elements[0].find('img')['src']))
        if elements[1]:

            if elements[1].find("a"): 
                breedLink= 'https://en.wikipedia.org' + elements[1].find("a").get('href')
                item['wikipediaLink'] = breedLink
                soupBreedLink = BeautifulSoup(requests.get(breedLink).text, 'html.parser')
                paragraphs = list(map(lambda x: x.text, soupBreedLink.find_all('p')))
                paragraph = next(x for x in paragraphs if len(x) > 20)
                item['description'] = paragraph
                item['popularity'] = len(str(soupBreedLink))
                breedPicsDiv = soupBreedLink.find_all("div", {"class": "thumbinner"})
                for pic in breedPicsDiv: 
                    pictures.append('https:' + str(pic.find('img')['src']))

                # item['breedGroup'] = 'NO BREED GROUP'
                # item['heightRange'] = 'NO HEIGHT RANGE'
                # item['weightRange'] = 'NO WEIGHT RANGE'
                # item['lifeSpan'] = 'NO LIFE SPAN'
                
  
        if elements[2]: 
            if elements[2]: item['origin'] = elements[2].text
        if name in dogTimeBreedsNames: 
           index = dogTimeBreedsNames.index(name)
           item['breedGroup'] = dogTimeItems[index]['breedGroup'] 
           item['heightRange'] = heightConverter('18 to 21 inches') if name == 'Jindo' else heightConverter('18 to 24 inches') if name == 'Silken Windhound' else heightConverter('1 foot, 9 inches to 2 feet') if name == 'Poodle' else heightConverter('1 foot, 9 inches to 2 feet') if name == 'Old English Sheepdog' else heightConverter('9 inches to 10 inches') if name == 'Tibetan Spaniel' else heightConverter('11 inches to 1 foot, 2 inches') if name == 'Basset Hound' else heightConverter('9 inches to 10 inches') if name == 'Norwich Terrier' else heightConverter('9 inches to 11 inches') if name == 'Scottish Terrier' else heightConverter('10 inches to 11 inches') if name == 'Sealyham Terrier' else heightConverter(dogTimeItems[index]['heightRange'])
           item['weightRange'] = weightConverter('20 to 30 pounds') if name == 'Welsh Corgi, Pembroke' else weightConverter('20 to 30 pounds') if name == 'Welsh Corgi, Cardigan' else weightConverter('35 to 60 pounds') if name == 'Jindo' else weightConverter('10 to 12 pounds') if name == 'Chinese Crested Dog' else weightConverter('75 to 100 pounds') if name == 'American English Coonhound' else weightConverter('18 to 35 pounds') if name == 'American Eskimo Dog' else weightConverter('120 to 143 pounds') if name == 'Dogue de Bordeaux' else weightConverter('32 to 40 pounds') if name == 'Glen of Imaal Terrier' else weightConverter('6.5 to 9 pounds') if name == 'Maltese' else weightConverter('48 to 55 pounds') if name == 'Norwegian Elkhound' else weightConverter('11 to 13 pounds') if name == 'Norwich Terrier' else weightConverter('60 to 100 pounds') if name == 'Old English Sheepdog' else weightConverter('65 to 110 pounds') if name == 'Otterhound' else weightConverter('8 to 25 pounds') if name == 'Rat Terrier' else weightConverter('14 to 26 pounds') if name == 'Shetland Sheepdog' else weightConverter('20 to 22 pounds') if name == 'Welsh Terrier' else weightConverter(dogTimeItems[index]['weightRange'])
           item['lifeSpan'] = '14 to 16 years' if name == 'Coton de Tulear' else '12 to 14 years' if name == 'Petit Basset Griffon Vendéen' else dogTimeItems[index]['lifeSpan']
           del dogTimeItems[index]['breedGroup']
           del dogTimeItems[index]['heightRange']
           del dogTimeItems[index]['weightRange']
           del dogTimeItems[index]['lifeSpan']
           item['characteristics'] = dogTimeItems[index]

        elif name not in dogTimeBreedsNames and item['wikipediaLink'] and elements[3].text != 'Extinct' and name != "Japanese Terrier" and name != "Podenco Canario" and name != "Schweizer Laufhund" and name != "Vanjari Hound":
            
            soupBreedLink = BeautifulSoup(requests.get(item['wikipediaLink']).text, 'html.parser')
            sections = soupBreedLink.find_all("tr")
            paragraphs = soupBreedLink.find_all("p")

            breedGroup = breedGroups(name)
            weightRange = dogWeights(name)
            heightRange = dogHeights(name)
            lifeSpan = dogLifeSpans(name)
            print(index, ' ',name)

            if name == 'Collie, Smooth':
                item['characteristics'] = { "adaptability": "4", "friendliness": "5", "grooming": "3", "trainability": "3", "exerciseNeeds": "3"}

            if breedGroup == 'noBreedGroup':
                breedGroupIdentifiers = elements[3].text + ' ' + elements[4].text + ' ' + elements[5].text + ' ' + elements[6].text + ' ' + elements[7].text + ' ' + elements[8].text + ' ' + elements[9].text

                companion = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('companion'), breedGroupIdentifiers.lower()))
                toy = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('toy'), breedGroupIdentifiers.lower()))

                terrier = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('terrier'), breedGroupIdentifiers.lower()))

                sporting = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('sporting'), breedGroupIdentifiers.lower()))

                gunDog = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('gun dog'), breedGroupIdentifiers.lower()))

                scentHound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('scentHound'), breedGroupIdentifiers.lower()))
                sightHound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('sightHound'), breedGroupIdentifiers.lower()))
                hound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hound'), breedGroupIdentifiers.lower()))
                hunting = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hunting'), breedGroupIdentifiers.lower()))
                hunt = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hunt'), breedGroupIdentifiers.lower()))

                herding = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('herding'), breedGroupIdentifiers.lower()))
                herd = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('herd'), breedGroupIdentifiers.lower()))
                pastoral = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('pastoral'), breedGroupIdentifiers.lower()))

                guardian = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('guardian'), breedGroupIdentifiers.lower()))
                working = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('working'), breedGroupIdentifiers.lower()))
                utility = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('utility'), breedGroupIdentifiers.lower()))

                breedGroupsArray = [
                                    {"breedName": 'Companion Dogs', "words": companion + toy}, {"breedName": 'Terrier Dogs', "words": terrier},
                                    {"breedName": 'Sporting Dogs', "words": sporting}, {"breedName": 'Gun Dogs', "words": gunDog},
                                    {"breedName": 'Hound Dogs', "words": scentHound + sightHound + hound + hunting + hunt}, {"breedName": 'Herding Dogs', "words": pastoral + herd + herding},
                                    {"breedName": 'Working Dogs', "words": guardian + working + utility} 
                                   ]

                sortedBreedGroupsArray = sorted(breedGroupsArray, key=lambda x: x["words"], reverse=True)
                
                if sortedBreedGroupsArray[0]["words"] > 0: breedGroup = sortedBreedGroupsArray[0]["breedName"]

                # if sortedBreedGroupsArray[0]["words"] > 0: print('First breed group scraper ======> ', sortedBreedGroupsArray[0]["breedName"])


            for el in sections:

                if el.th and el.th.text == 'Weight' and any(c.isdigit() for c in el.text): 
                    weightText = el.text if '(' not in el.text else re.search('\(([^)]+)', el.text).group(1)
                    # print(el.text)
                    weightRange = wikiWeightConverter(weightText.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                    nextTag = el.find_next('tr').text
                    if 'Female' in nextTag:
                        weightTextNext = el.text if '(' not in nextTag else re.search('\(([^)]+)', nextTag).group(1)
                        weightFemale = wikiWeightConverter(weightTextNext.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                        if weightFemale['min'] < weightRange['min']: weightRange['min'] = weightFemale['min']
                        if weightFemale['max'] > weightRange['max']: weightRange['max'] = weightFemale['max'] 

                    if 'Medium:' in el.text or 'Large:' in el.text:
                        weightsArray =  [s[1:-1] for s in re.findall(r'\(.*?\)', el.text)]
                        for weightItem in weightsArray:
                            convertedWeight = wikiWeightConverter(weightItem.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                            if convertedWeight['min'] < weightRange['min']: weightRange['min'] = convertedWeight['min']
                            if convertedWeight['max'] > weightRange['max']: weightRange['max'] = convertedWeight['max']
                
                if el.th and el.th.text == 'Height': 
                    heightText = el.text if '(' not in el.text else re.search('\(([^)]+)', el.text).group(1)
                    heightRange = wikiHeightConverter(heightText.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                    
                    nextTag = el.find_next('tr').text
                    if 'Female' in nextTag and any(c.isdigit() for c in nextTag):
                        heightTextNext = el.text if '(' not in nextTag else re.search('\(([^)]+)', nextTag).group(1)
                        heightFemale = wikiHeightConverter(heightTextNext.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                        if heightFemale['min'] < heightRange['min']: heightRange['min'] = heightFemale['min']
                        if heightFemale['max'] > heightRange['max']: heightRange['max'] = heightFemale['max']

                    if 'Medium:' in el.text or 'Large:' in el.text:
                        heightsArray =  [s[1:-1] for s in re.findall(r'\(.*?\)', el.text)]
                        for heightItem in heightsArray:
                            convertedHeight = wikiHeightConverter(heightItem.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                            if convertedHeight['min'] < heightRange['min']: heightRange['min'] = convertedHeight['min']
                            if convertedHeight['max'] > heightRange['max']: heightRange['max'] = convertedHeight['max']

                if el.th and el.th.text == 'Life span': 

                    lifeSpan = lifeSpanFormatter(el.text)
                    item['lifeSpan'] = lifeSpan

            if heightRange == 'noHeight':   
                for p in paragraphs:
                    arrayOfHeights = list(filter(lambda x: ('cm' in x or 'in' in x or 'inches' in x or 'ins' in x) and bool(re.search(r'\d', x)) and len(x) < 30, re.findall(r'\(([^()]+)\)', p.text)))
                
                    if arrayOfHeights: 
                        # print('Desc Height => ',arrayOfHeights)
                        heightRange = wikiHeightConverter(arrayOfHeights[0].replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                        if len(arrayOfHeights) > 1:
                            heightRange2 = wikiHeightConverter(arrayOfHeights[1].replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                            if heightRange2['min'] < heightRange['min']: heightRange['min'] = heightRange2['min']
                            if heightRange2['max'] > heightRange['max']: heightRange['max'] = heightRange2['max']

            if weightRange == 'noWeight':   
                for p in paragraphs:
                    arrayOfWeights = list(filter(lambda x: ('kg' in x or 'kilograms' in x or 'pounds' in x or 'lb' in x) and bool(re.search(r'\d', x)) and len(x) < 30, re.findall(r'\(([^()]+)\)', p.text)))
                
                    # print(arrayOfWeights)
                    if arrayOfWeights: 
                        # print('Desc Weight => ',arrayOfWeights)
                        weightRange = wikiWeightConverter(arrayOfWeights[0].replace("\xa0", "").replace("&nbsp;", "").replace("and", "-").replace("lbs.", "lb"))
                        if len(arrayOfWeights) > 1:
                            weightRange2 = wikiWeightConverter(arrayOfWeights[1].replace("\xa0", "").replace("&nbsp;", "").replace("and", "-").replace("lbs.", "lb"))
                            if weightRange2['min'] < weightRange['min']: weightRange['min'] = weightRange2['min']
                            if weightRange2['max'] > weightRange['max']: weightRange['max'] = weightRange2['max']

            if lifeSpan == 'noLifeSpan':
                for p in paragraphs:
                    paragraphLifeSpan = re.search('lifespan(.*)years,', p.text) if re.search('lifespan(.*)years,', p.text) else re.search('lifespan(.*)years.', p.text)
                    
                    if paragraphLifeSpan:
                        lifeSpan = lifeSpanFormatter(paragraphLifeSpan.group(1))

            
            if weightRange == 'noWeight': 
                link = "https://www.google.com/search?q=" + name.replace(" ", "+")
                soupGoogleSearch = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser') 

                googleSearchWeightRange = soupGoogleSearch.find("div", {"data-attrid": "kc:/base/petbreeds/dog_breed:weight"})
                if googleSearchWeightRange and googleSearchWeightRange.find("span", {"class": "LrzXr kno-fv"}).text:
                    googleWeightRange = googleSearchWeightRange.find("span", {"class": "LrzXr kno-fv"}).text
                    if 'Male:' in googleWeightRange and 'Female:' in googleWeightRange:
                        weightRange = wikiWeightConverter(googleWeightRange.split(",")[0])
                        femaleWeight = wikiWeightConverter(googleWeightRange.split(",")[1])
                        if femaleWeight['min'] < weightRange['min']: weightRange['min'] = femaleWeight['min']
                        if femaleWeight['max'] > weightRange['max']: weightRange['max'] = femaleWeight['max']
                    else: weightRange = wikiWeightConverter(googleWeightRange)
            
            if heightRange == 'noHeight': 
                link = "https://www.google.com/search?q=" + name.replace(" ", "+")
                soupGoogleSearch = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser') 

                googleSearchHeightRange = soupGoogleSearch.find("div", {"data-attrid": "kc:/base/petbreeds/dog_breed:height"})
                if googleSearchHeightRange and googleSearchHeightRange.find("span", {"class": "LrzXr kno-fv"}).text:
                    googleHeightRange = googleSearchHeightRange.find("span", {"class": "LrzXr kno-fv"}).text
                    if 'Male:' in googleHeightRange and 'Female:' in googleHeightRange:
                        heightRange = wikiHeightConverter(googleHeightRange.split(",")[0])
                        femaleHeight = wikiHeightConverter(googleHeightRange.split(",")[1])
                        if femaleHeight['min'] < heightRange['min']: heightRange['min'] = femaleHeight['min']
                        if femaleHeight['max'] > heightRange['max']: heightRange['max'] = femaleHeight['max']
                    else: heightRange = wikiHeightConverter(googleHeightRange)

            if lifeSpan == 'noLifeSpan': 
                link = "https://www.google.com/search?q=" + name.replace(" ", "+")
                soupGoogleSearch = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser') 

                googleSearchLifeSpan = soupGoogleSearch.find("div", {"data-attrid": "ss:/webfacts:life_span"})
                googleSearchLifeExpectancy = soupGoogleSearch.find("div", {"data-attrid": "kc:/base/petbreeds/dog_breed:life_expectancy"})

                if googleSearchLifeSpan and googleSearchLifeSpan.find("span", {"class": "LrzXr kno-fv"}).text:
                    googleLifeSpan = googleSearchLifeSpan.find("span", {"class": "LrzXr kno-fv"}).text
                    lifeSpan = lifeSpanFormatter(googleLifeSpan)
                elif googleSearchLifeExpectancy and googleSearchLifeExpectancy.find("span", {"class": "LrzXr kno-fv"}).text:
                     googleLifeExpectancy = googleSearchLifeExpectancy.find("span", {"class": "LrzXr kno-fv"}).text
                     lifeSpan = lifeSpanFormatter(googleLifeExpectancy)

            if breedGroup == 'noBreedGroup':

                paragraphs = ' '.join(list(map(lambda x: x.text, soupBreedLink.find_all('p'))))

                companion = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('companion'), paragraphs.lower()))
                toy = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('toy'), paragraphs.lower()))

                terrier = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('terrier'), paragraphs.lower()))

                sporting = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('sporting'), paragraphs.lower()))

                gunDog = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('gun dog'), paragraphs.lower()))

                scentHound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('scentHound'), paragraphs.lower()))
                sightHound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('sightHound'), paragraphs.lower()))
                hound = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hound'), paragraphs.lower()))
                hunting = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hunting'), paragraphs.lower()))
                hunt = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('hunt'), paragraphs.lower()))

                herding = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('herding'), paragraphs.lower()))
                herd = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('herd'), paragraphs.lower()))
                pastoral = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('pastoral'), paragraphs.lower()))

                guardian = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('guardian'), paragraphs.lower()))
                working = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('working'), paragraphs.lower()))
                utility = sum(1 for _ in re.finditer(r'\b%s\b' % re.escape('utility'), paragraphs.lower()))

                breedGroupsArray = [
                                    {"breedName": 'Companion Dogs', "words": companion + toy}, {"breedName": 'Terrier Dogs', "words": terrier},
                                    {"breedName": 'Sporting Dogs', "words": sporting}, {"breedName": 'Gun Dogs', "words": gunDog},
                                    {"breedName": 'Hound Dogs', "words": scentHound + sightHound + hound + hunting + hunt}, {"breedName": 'Herding Dogs', "words": herd + herding},
                                    {"breedName": 'Working Dogs', "words": guardian + working + utility} 
                                   ]

                sortedBreedGroupsArray = sorted(breedGroupsArray, key=lambda x: x["words"], reverse=True)
                
                # print(sortedBreedGroupsArray)
                breedGroup = sortedBreedGroupsArray[0]["breedName"] if sortedBreedGroupsArray[0]["words"] > 6 else "Companion Dogs"

                # if sortedBreedGroupsArray[0]["words"] > 6: print('Second breed group scraper ======> ', sortedBreedGroupsArray[0]["breedName"])

            
            if heightRange == 'noHeight' or weightRange == 'noWeight' or lifeSpan == 'noLifeSpan': 

                dogbreedinfoName = name + ' dogbreedinfo'
                link = "https://www.google.com/search?q=" + dogbreedinfoName.replace(" ", "+")
                soupChrome = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser') 

                if lifeSpan == 'noLifeSpan':
                    for g in soupChrome.find_all(class_='g'):
                        if 'www.dogbreedinfo.com' in g.find('a')['href']:
                            dogBreedInfoLink = g.find('a')['href']
                            dogBreedInfoLinkSoup = BeautifulSoup(requests.get(dogBreedInfoLink).text, 'html.parser') 

                            titlesArray =  dogBreedInfoLinkSoup.find_all('h5')
                            for elem in titlesArray:
                                if elem.text == 'Life Expectancy' and bool(re.search(r'\d', elem.find_next('p').text)):
                                  lifeSpan = lifeSpanFormatter(elem.find_next('p').text)
                                  print('lifespan taken from dogbreedinfo => ', lifeSpanFormatter(elem.find_next('p').text))

                if heightRange == 'noHeight':
                    for g in soupChrome.find_all(class_='g'):
                        if 'www.dogbreedinfo.com' in g.find('a')['href']:
                            dogBreedInfoLink = g.find('a')['href']
                            dogBreedInfoLinkSoup = BeautifulSoup(requests.get(dogBreedInfoLink).text, 'html.parser') 

                            for el in dogBreedInfoLinkSoup.find_all('p'):
                                # print(el)
                                if 'Height:' in el.text:
                                    heightsArray = list(filter(lambda x: ('cm' in x or 'in' in x or 'inches' in x or 'ins' in x) and bool(re.search(r'\d', x)), [s[1:-1] for s in re.findall(r'\(.*?\)', el.text)]))
                                    foundConvertedHeight = {"min": None, "max": None}
                                    for heightItem in heightsArray:
                                                convertedHeight = wikiHeightConverter(heightItem.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                                                
                                                if foundConvertedHeight['min'] is None: 
                                                    foundConvertedHeight['min'] = convertedHeight['min']
                                                else: 
                                                    if convertedHeight['min'] < foundConvertedHeight['min']: foundConvertedHeight['min'] = convertedHeight['min']
                                                if foundConvertedHeight['max'] is None: 
                                                    foundConvertedHeight['max'] = convertedHeight['max']
                                                else: 
                                                    if convertedHeight['max'] > foundConvertedHeight['max']: foundConvertedHeight['max'] = convertedHeight['max']
                                                
                                                if foundConvertedHeight['min'] and foundConvertedHeight['max']: heightRange = foundConvertedHeight
                if weightRange == 'noWeight': 
                    for g in soupChrome.find_all(class_='g'):
                        if 'www.dogbreedinfo.com' in g.find('a')['href']:
                            dogBreedInfoLink = g.find('a')['href']
                            dogBreedInfoLinkSoup = BeautifulSoup(requests.get(dogBreedInfoLink).text, 'html.parser') 

                            for el in dogBreedInfoLinkSoup.find_all('p'):
                                # print(el)
                                if 'Weight:' in el.text:
                                    weightsArray = list(filter(lambda x: ('kg' in x or 'kilograms' in x or 'pounds' in x or 'lb' in x) and bool(re.search(r'\d', x)), [s[1:-1] for s in re.findall(r'\(.*?\)', el.text)]))
                                    foundConvertedWeight = {"min": None, "max": None}
                                    for weightItem in weightsArray:
                                                convertedWeight = wikiWeightConverter(weightItem.replace("\xa0", "").replace("&nbsp;", "").replace("and", "-"))
                                                
                                                if foundConvertedWeight['min'] is None: 
                                                    foundConvertedWeight['min'] = convertedWeight['min']
                                                else: 
                                                    if convertedWeight['min'] < foundConvertedWeight['min']: foundConvertedWeight['min'] = convertedWeight['min']
                                                if foundConvertedWeight['max'] is None: 
                                                    foundConvertedWeight['max'] = convertedWeight['max']
                                                else: 
                                                    if convertedWeight['max'] > foundConvertedWeight['max']: foundConvertedWeight['max'] = convertedWeight['max']
                                                
                                                if foundConvertedWeight['min'] and foundConvertedWeight['max']: weightRange = foundConvertedWeight
            
            if heightRange == 'noHeight': 
                with open('breeds.json', encoding="utf8") as json_file:
                    data = json.load(json_file)
                    targetBreed = next((x for x in data if x['name'] == name), None)
                    heightRange = targetBreed['heightRange']

                    # heightRangeHelpers.append(f'if name == \'{name}\'' + ': return {\'min\': , \'max\': }')
                    
            if weightRange == 'noWeight': 
                with open('breeds.json', encoding="utf8") as json_file:
                    data = json.load(json_file)
                    targetBreed = next((x for x in data if x['name'] == name), None)
                    weightRange = targetBreed['weightRange']

                # weightRangeHelpers.append(f'if name == \'{name}\'' + ': return {\'min\': , \'max\': }')

            if lifeSpan == 'noLifeSpan': 
                lifeSpan = '11 to 14 yrs'
                # lifeSpanHelpers.append(f'if name == \'{name}\': return \' to  yrs\'')

            item['breedGroup'] = breedGroup
            item['heightRange'] = heightRange
            item['weightRange'] = weightRange
            item['lifeSpan'] = lifeSpan

            print('Height => ',heightRange , '  Weight => ', weightRange)
            # print('LifeSpan => ', lifeSpan)
            # print('BreedGroup => ', breedGroup)


   
        item['federationsAndClubs'] = federationsAndClubs
        federationsAndClubs['federationCynologiqueInternationale'] = elements[3].text
        federationsAndClubs['americanKennelClub'] = elements[4].text
        federationsAndClubs['australianNationalKennelCouncil'] = elements[5].text
        federationsAndClubs['canadianKennelClub'] = elements[6].text
        federationsAndClubs['theKennelClub'] = elements[7].text
        federationsAndClubs['newZealandKennelClub'] = elements[8].text
        federationsAndClubs['unitedKennelClub'] = elements[9].text
        # if item and elements[3].text != 'Extinct' and not name in dogTimeBreedsNames and (elements[2].text or elements[3].text or elements[4].text or elements[5].text or elements[6].text or elements[7].text or elements[8].text): print(elements[0].find('a').text)
        if item['name'] != 'Fox Terrier': wikiTableElements.append(item)


mixedBreeds = [a for a in dogTimeBreedsNames if a not in set(wikiTableNames + additionalBreedsNames)]

for el in mixedBreeds:
    item = {}
    
    targetItem = next(x for x in dogTimeItems if el == x['breedName'])

    name = targetItem['breedName'] + ' dogbreedinfo'
    link = "https://www.google.com/search?q=" + name.replace(" ", "+")

    soupChrome = BeautifulSoup(requests.get(link, headers=headers).text, 'html.parser')

    print(targetItem['breedName'])
    item['id'] = targetItem['breedName'].replace(" ", "")
    item['name'] = targetItem['breedName']
    item['pictures'] = ['https://www.101dogbreeds.com/wp-content/uploads/2017/10/Afador.jpg' if targetItem['breedName'] == 'Afador' else targetItem['dogTimePicture']]
    item['socialMediaTag'] = targetItem['breedName'].replace(" ", "")
    item['wikiPediaLink'] = ''
    item['description'] = ''
    item['popularity'] = targetItem['popularity']
    item['origin'] = 'Alaska' if targetItem['breedName'] == 'Afador' else ''
    item['breedGroup'] = targetItem['breedGroup']
    item['heightRange'] = {'min': 23, 'max': 25} if targetItem['breedName'] == 'Peekapoo' else {'min': 30, 'max': 55} if targetItem['breedName'] == 'Mutt' else {'min': 23, 'max': 26} if targetItem['breedName'] == 'Maltese Shih Tzu' else {'min': 38, 'max': 45} if targetItem['breedName'] == 'Cockapoo' else {'min': 25, 'max': 74} if targetItem['breedName'] == 'Bernedoodle' else heightConverter(targetItem['heightRange'])
    item['weightRange'] = {'min': 15, 'max': 50} if targetItem['breedName'] == 'Mutt' else {'min': 8, 'max': 13} if targetItem['breedName'] == 'Cockapoo' else weightConverter(targetItem['weightRange'])
    item['lifeSpan'] = targetItem['lifeSpan']
    item['characteristics'] = { "adaptability": targetItem['adaptability'], "friendliness": targetItem['friendliness'], "grooming": targetItem['grooming'], "trainability": targetItem['trainability'], "exerciseNeeds": targetItem['exerciseNeeds'] } 
    item['federationsAndClubs'] = { "federationCynologiqueInternationale": "", "americanKennelClub": "", "australianNationalKennelCouncil": "", "canadianKennelClub": "", "theKennelClub": "", "newZealandKennelClub": "", "unitedKennelClub": "" }

    for g in soupChrome.find_all(class_='g'):
        if 'www.dogbreedinfo.com' in g.find('a')['href']:
            dogBreedInfoLink = g.find('a')['href']
            dogBreedInfoLinkSoup = BeautifulSoup(requests.get(dogBreedInfoLink).text, 'html.parser') 

            # for el in dogBreedInfoLinkSoup.find_all('h5'):
            titlesArray =  dogBreedInfoLinkSoup.find_all('h5')
            for elem in titlesArray:
                if elem.text == 'Description' and item['description'] == "":
                    item['description'] = elem.find_next('p').text
                    print('got a descrption for this mixed breed')

    wikiTableElements.append(item)

# print(mixedBreeds)

# print('\n#### LIFESPAN HELPERS ####')
# for item in lifeSpanHelpers: print(item)
# print('\n#### HEIGHT HELPERS ####')
# for item in heightRangeHelpers: print(item)
# print('\n#### WEIGHT HELPERS ####')
# for item in weightRangeHelpers: print(item)

wikiTableElements.sort(key=lambda x: x["name"])

with open("breedsTest.json", "w", encoding="utf-8") as writeJSON:
     json.dump(wikiTableElements, writeJSON, ensure_ascii=False)


