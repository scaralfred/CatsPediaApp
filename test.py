import re

height1 = "9 to 11 inches tall at the shoulder" # case 1
height2 = "9 inches to 1 foot, 11 inches tall at the shoulder" # case 2
height3 = "1 foot, 11 inches to 3 feet tall at the shoulder" # case 3
height4 = "2 feet, 3 inches to 2 feet, 11 inches tall at the shoulder" # case 4
height5 = "2 feet to 2 feet, 11 inches tall at the shoulder" # case 4



def heightConverter(arg):

    heightRange = {}

    def InToCm(num): return round(num * 2.54)
    def FtToCm(num): return round(num * 30.48)
    def converter1(string): 
        if 'inch' in re.sub('[^a-zA-Z]+', '', string):
           return InToCm(float(re.sub("\D", "", string)))
        if 'foot' in re.sub('[^a-zA-Z]+', '', string) or 'feet' in re.sub('[^a-zA-Z]+', '', string):
            return FtToCm(float(re.sub("\D", "", string)))
    def converter2(string): return converter1(string.split(",")[0]) + converter1(string.split(",")[1])

    if arg.split("to")[0].strip().isdigit(): # case 1
       heightRange['min'] = InToCm(float(arg.split("to")[0].strip()))
       heightRange['max'] = InToCm(float(re.sub("\D", "", arg.split("to")[1])))
       return heightRange

    else: # all the other cases
        if ',' in arg.split("to")[0]: heightRange['min'] = converter2(arg.split("to")[0])
        else: heightRange['min'] = converter1(arg.split("to")[0])
        if ',' in arg.split("to")[1]: heightRange['max'] = converter2(arg.split("to")[1])
        else: heightRange['max'] = converter1(arg.split("to")[1])
        return heightRange

print(heightConverter(height1))
print(heightConverter(height2))
print(heightConverter(height3))
print(heightConverter(height4))
print(heightConverter(height5))