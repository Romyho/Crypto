# Design Document

Course: Programmeerproject
Name: Romy Ho
Student number: 11007303


## Data Source:
 [Dataset](https://www.kaggle.com/jessevent/all-crypto-currencies/kernels):
The data can be downloaded in csv-format. With a python script, the csv can be converted to a json-format. The dataset will be transformed in json to a dictionary, so it's more easy to use.

## Diagram of Technical components

![sketch1](doc/diagram.png)
This is a sketch with the idea of the website visualized. The website will contain a home page, a page containing the visualizations and a page with additional information.

The visualization page will look as followed:

![sketch2](doc/design.png)

## Description and implementation
+ For the bubble chart D3 will be used.
+ For the slider D3 and bootstrap will be used.
+ For the dropdown and checkbox D3 will be used.
+ For the stream graph and pie chart D3 will be used.
+ For the news articles, https://github.com/mattlisiv/newsapi-python will be used.
+ For the scatterplot, D3 tooltip, D3 will be used.

### External components
- [D3](https://d3js.org/)
- [D3-tip](https://github.com/Caged/d3-tip)
- [Atom](atom.io)
