import json

newNames = []


with open('breeds.json', encoding="utf8") as f:
  data = json.load(f)
  
  
for el in data:

  breedName = el["breedIdentifierName"] 
  newNames.append(breedName)

with open("newNames.json", "w", encoding="utf-8") as writeJSON:
     json.dump(newNames, writeJSON, ensure_ascii=False)
    

