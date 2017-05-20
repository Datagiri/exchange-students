# exchange-students

Visualizations for the blog post on Exchange Students.  
The raw data has not been added to the repository to ensure the anonymity and the privacy of all individuals involved.  




## Directories:  

`bubble-chart/`  
Bubble-chart summarizing the departments and programs of outbound exchange students from IITB.  
Code built upon [Jim Vallandingham's animated bubble chart repository](https://github.com/vlandham/bubble_chart)  
A live version of this code is [here](https://datagiri.github.io/exchange-students/)  

`stacked_bar`
Stacked bar chart summarizing the departments and programs of outbound exchange students from IITB.  
A live version of this code is nowhere

## Running

D3 needs to be run from a webserver due to how it imports data files.  
So, to run this visualization locally, from the Terminal, navigate to the directory you checked it out to.  
Then start a webserver locally. If you are on a Linux or Mac, you should be able to use python's built in webserver:  

```
python -m SimpleHTTPServer 3000
```

# Stacked bar chart
Because bar charts are better than circles for comparisons

## Run build

Navigate to build directory
```
python -m SimpleHTTPServer 3000
```
## Running dev

- Install node and npm
- Navigate to `stacked_bar` folder
```
npm install
npm install -g http-server
npm run build
cd build
http-server
```

## Contribute
- Learn react
- Learn d3js
- Start coding
