# Programmeer project - Cryptocurrency


## Introduction
Crypto currency is getting bigger, but there is not much information about it. It's not tangible and only mutually tradable, without a middleman. Which currencies exist and is the market changeable or constant (rising?).

## Problem
There is a lot of data available about crypto currency. Because there is no middleman or trader who makes the market more clear, the market is less accessible and interesting for new investors and traders.

## Solution
The visualization of the developments of crypto currency and specific information per currency, between 2013-2018.

## Website
+ The whole market in bubbles of currencies, the biggest bubble is the bubble with the largest market value.(bubblechart)
  With a time slider the user can choose the time of the bubblechart.
+ Each currency has a little information sheet(1), when mouse is over the bubble.
+ An extensive information sheet(2), when clicked on bubble.
  Within infomation sheet(2), the user can select currencies, or change them.



Infosheet(1):
+ Begin date og currency
+ Current price usd
+ Ranking
+ Market coverage


Infosheet(2):
+ price usd (Stream graph)
+ Recent news items
+ Total market (Pie chart)

### Visual Sketch
![sketch](doc/website_design.png)

## Main Features
+ Interactive bubble Bubbelchart(MVP)
The whole market in bubbles of currencies, the biggest bubble is the bubble with the largest market value.
+ Interactive Stream graph(MVP)
Shows price in usd over time.
+ Interactive line chart(MVP)
Shows market coverage over time.
+ Pie chart(Optional)
Total market
+ Checkbox(MVP)
Choose currencies to compare.
+ Time Slider(MVP)
Choose time
+ News
Show news items
+ Candle graph(Optional)
Show open, close, high en low rate per day.

## Prerequisites
### Data
[Every Cryptocurrency Daily Market Price](https://www.kaggle.com/jessevent/all-crypto-currencies/kernels). This is the only used data, i will only use the top 100 ranked crypto currencies.

### External components
- [D3](https://d3js.org/)
- [D3-tip](https://github.com/Caged/d3-tip)
- [Atom](atom.io)

### Simular visualisation
Crypto visualisatie [Elementus](https://elementus.io/token-sales-history). Elementus, uses D3 en ajax, slider.  In the moving visualization the total market expansion is clearly visible, but no further details about the currencies.


### Hardest Parts
+ De informatie zo duidelijk mogelijk weergeven
+ Website design
+ Nieuws items interactief/up to date, api acces
