#!/usr/bin/env python
# Name:Romy Ho
# Student number:11007303
"""
This script selects specified data from csv and returns json file.
"""



import json
import pandas as pd
import csv
import sys

def convert(file_name):

    # Read csv file
    csv_name = file_name[0]
    df = pd.read_csv(csv_name)

    # Load top 100 ranked
    top100 = list(range(67420))
    df1 = df.loc[top100]

    # Select name and first date in dataset
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
