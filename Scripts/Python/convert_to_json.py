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

    # Make dictionary, write to json structure
    data = df1.to_dict('response')

    # Json file name
    json_name = csv_name.split(".csv")[0]+".json"

    # Write json file
    with open(json_name, 'w') as outfile:
        json.dump(data, outfile, indent=4)




if __name__ == "__main__":

    # Convert csv file to json
    convert(sys.argv[1:])
