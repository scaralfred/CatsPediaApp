import re

def heightConverter(arg):

    arg = arg.lower()

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

def weightConverter(arg):

    weightRange = {}

    def LbsToKg(num): return round(num * 0.453592)

    weightRange['min'] = LbsToKg(float(re.sub("\D", "", arg.split("to")[0])))
    weightRange['max'] = LbsToKg(float(re.sub("\D", "", arg.split("to")[1])))

    return weightRange

def wikiWeightConverter(arg):

    arg = arg.lower()

    def LbsToKg(num): return round(num * 0.453592)

    weightRange = {}

    if '–' in arg:
        if 'lb' in arg or 'pounds' in arg or 'lbs' in arg:
            weightRange['min'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("–")[0]))))
            weightRange['max'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("–")[1]))))
        else:
            weightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("–")[0])))
            weightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("–")[1])))
    elif 'and' in arg:
        if 'lb' in arg or 'pounds' in arg or 'lbs' in arg:
            weightRange['min'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("and")[0]))))
            weightRange['max'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("and")[1]))))
        else:
            weightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("and")[0])))
            weightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("and")[1])))
    elif '-' in arg:
        if 'lb' in arg or 'pounds' in arg or 'lbs' in arg:
            weightRange['min'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("-")[0]))))
            weightRange['max'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("-")[1]))))
        else:
            weightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("-")[0])))
            weightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("-")[1])))
    elif 'to' in arg:
        if 'lb' in arg or 'pounds' in arg or 'lbs' in arg:
            weightRange['min'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("to")[0]))))
            weightRange['max'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg.split("to")[1]))))
        else:
            weightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("to")[0])))
            weightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("to")[1])))
    else:
        if 'lb' in arg or 'pounds' in arg or 'lbs' in arg:
            weightRange['min'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg))*0.95))
            weightRange['max'] = round(LbsToKg(float(re.sub("[^\d\.]", "", arg))*1.05))
        else:
            weightRange['min'] = round(float(re.sub("[^\d\.]", "", arg))*0.95)
            weightRange['max'] = round(float(re.sub("[^\d\.]", "", arg))*1.05)

    return weightRange

def wikiHeightConverter(arg):

    arg = arg.lower()

    def InToCm(num): return round(num * 2.54)

    heightRange = {}

    if '–' in arg:
        if 'in' in arg or 'inches' in arg or 'ins' in arg:
            heightRange['min'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("–")[0]))))
            heightRange['max'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("–")[1]))))
        else:
            heightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("–")[0])))
            heightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("–")[1])))
    elif 'and' in arg:
        if 'in' in arg or 'inches' in arg or 'ins' in arg:
            heightRange['min'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("and")[0]))))
            heightRange['max'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("and")[1]))))
        else:
            heightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("and")[0])))
            heightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("and")[1])))
    elif '-' in arg:
        if 'in' in arg or 'inches' in arg or 'ins' in arg:
            heightRange['min'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("-")[0]))))
            heightRange['max'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("-")[1]))))
        else:
            heightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("-")[0])))
            heightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("-")[1])))
    elif 'to' in arg:
        if 'in' in arg or 'inches' in arg or 'ins' in arg:
            heightRange['min'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("to")[0]))))
            heightRange['max'] = round(InToCm(float(re.sub("[^\d\.]", "", arg.split("to")[1]))))
        else:
            heightRange['min'] = round(float(re.sub("[^\d\.]", "", arg.split("to")[0])))
            heightRange['max'] = round(float(re.sub("[^\d\.]", "", arg.split("to")[1])))
    else:
        if 'in' in arg or 'inches' in arg or 'ins' in arg:
            heightRange['min'] = round(InToCm(float(re.sub("[^\d\.]", "", arg))*0.95))
            heightRange['max'] = round(InToCm(float(re.sub("[^\d\.]", "", arg))*1.05))
        else:
            heightRange['min'] = round(float(re.sub("[^\d\.]", "", arg)))
            heightRange['max'] = round(float(re.sub("[^\d\.]", "", arg)))

    return heightRange



def lifeSpanFormatter(arg):

    arg  = re.sub(r'\[.*\]', '', arg).replace("up to", "").lower()

    lifeSpan = ''

    if '–' in arg:
        lifeSpanMin = round(float(re.sub("[^\d\.]", "", arg.split("–")[0])[:2]))
        lifeSpanMax = round(float(re.sub("[^\d\.]", "", arg.split("–")[1])[:2]))
        lifeSpan = f"{lifeSpanMin} to {lifeSpanMax} yrs"
    elif '-' in arg:
        lifeSpanMin = round(float(re.sub("[^\d\.]", "", arg.split("-")[0])[:2]))
        lifeSpanMax = round(float(re.sub("[^\d\.]", "", arg.split("-")[1])[:2]))
        lifeSpan = f"{lifeSpanMin} to {lifeSpanMax} yrs"
    elif 'to' in arg:
        lifeSpanMin = round(float(re.sub("[^\d\.]", "", arg.split("to")[0])[:2]))
        lifeSpanMax = round(float(re.sub("[^\d\.]", "", arg.split("to")[1])[:2]))
        lifeSpan = f"{lifeSpanMin} to {lifeSpanMax} yrs"
    else:
        lifeSpanMin = round(float(re.sub("[^\d\.]", "", arg)[:2])) - 1
        lifeSpanMax = round(float(re.sub("[^\d\.]", "", arg)[:2])) + 1
        lifeSpan = f"{lifeSpanMin} to {lifeSpanMax} yrs"

    return lifeSpan