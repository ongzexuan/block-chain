# Block Chain

Block Chain is a Facebook Messenger bot to match students with extra meal blocks to sell with those who want to buy 
them! This helps reduce wastage and makes the cost of meals more affordable for everyone.

Note that any relation to blockchain technologies is purely coincidental. This project does not involve any 
blockchain technologies, however if you do find some accidentally included inside, do let us know.

# Technologies

Block Chain is built on the Botkit framework based on Node.js. It uses a MongoDB backend to persist 
extracted conversation data. Finally, the service provides for running an NLP engine, including Google's DialogFlow 
and Facebook's Wit.AI.  

# Running the Bot

You can host an instance bot too! First, download/clone the repo. Then run:

```
npm install
```

This will install the packages listed in `package.json`

Then, create a `.env` file with the following variables. Here's a template:

```
page_token=<YOUR FACEBOOK PAGE TOKEN>
verify_token=<YOUR SELF DEFINED VERFICIATION TOKEN>
studio_token=<YOUR BOTKIT STUDIO TOKEN>
wit_token=<YOUR WIT.AI TOKEN>
dialogflow_token=<YOUR DIALOGFLOW TOKEN.
google=<YOUR GOOGLE TOKEN>
MONGODB_URI=mongodb://localhost:27017/block-chain #MONGODB CONNECTION
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=test.json #GOOGLE API CREDENTIALS FILE

```


# Side Notes
I write idiomatic Python, but not idiomatic Javascript. There may be a number of non idiomatic Javascript things that
 you have to live with while I get this to work.

# About Botkit

This project is based on the Botkit framework developed Howdy.

Botkit is a product of [Howdy](https://howdy.ai) and made in Austin, TX with the help of a worldwide community of botheads.
