# Getir-Interview-Express-Api 
An express,mongoDB, node js api for Querying case studies,its used here to demonstrate the steps host the rest api.     

## Steps

**Note**  
`This Rest Api uses Node Express with MongoDB as database to query case studies through a payload
`   
   
## ENVIRONMENT VARIABLES: .ENV
```
NODE_ENV=development OR production
PORT=8080 OR port of choice
MONGOURI=mongo uri
URL= http://localhost:8080

```
## Method 1: From github
### 1) Clone the repository, install node packages  and verify routes locally
## PART I: Download & Build on local

## Method 1: From github
### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/ALWISHARIFF/Getir-Interview.git
cd GETIR CASE STUDY
npm install
npm start
```

Open your local browser and verify the sample-node-api is working by accessing:    
`http://localhost:8080/`-Documentation 
`http://localhost:8080/api/casestudy` Post-Api Route  
   
   


### 2) Transfer project files from local to remote host

**Note**  
The `node_modules` folder will not be transferred.(.gitignore{.env,/node_modules})

```
cd GETIR CASE STUDY
heroku login
heroku create
git push heroku main

```
