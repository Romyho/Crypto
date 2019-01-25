import json
import pandas as pd
import csv
import sys
import numpy as np

def convert(file_name):

    # Read csv file
    csv_name = file_name[0]
    df = pd.read_csv(csv_name)
    # print(df[0])
    # Load top 100 ranked
    top100 = list(range(67420))
    df1 = df.loc[top100]
    # print(df1)
    # name = []
    name_date = {}
    boolean2 = ''
    index = 0
    for i in df1.name:
        if i != boolean2:
            boolean2 = i
            name_date[i]= df1['date'][index]
        index += 1


    # Write json file
    with open('name_date.json', 'w') as outfile:
        json.dump(name_date, outfile, indent=4)




if __name__ == "__main__":

    # Convert csv file to json
    convert(sys.argv[1:])
