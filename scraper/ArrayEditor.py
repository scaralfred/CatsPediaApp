import json

dogTimeBreedsArray = []


with open('breeds.json', encoding="utf8") as f:
  data = json.load(f)
  
  
for el in data:
  if "characteristics" in el:
    if el["breedGroup"] != "Mixed Breed Dogs":
      

      # ambiguousNames = ["Afghan Hound", "Aidi", "Akita", "Barbet", "Beagle", "Billy", "Bolognese", "Brittany", "Chinook",
      #                           "Combai", "Docker", "Dunker", "Drever","Harrier", "Hokkaido", "Kanni", "Kintamani", "Maltese", "Newfoundland", 
      #                           "Papillon", 'Phalène', "Poitevin", "Puli", "Pumi", "Shikoku", "Taigan", "Tosa"]

      breedName = el["name"].lower()

      dogTimeBreedsArray.append(breedName)
      print(breedName)

with open("dogTimeBreedsNames.json", "w", encoding="utf-8") as writeJSON:
     json.dump(dogTimeBreedsArray, writeJSON, ensure_ascii=False)
    

