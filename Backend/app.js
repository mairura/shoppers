const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const auth = require("./Middleware/auth");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const routesURL = require("./Routes/routes")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const PORT = process.env.PORT || 4000;

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true, credentials: true}));
app.use(express.json())
// app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5000';

//Importing user context
const User = require("./Model/user");
const { urlencoded } = require("body-parser");
const { getListItemSecondaryActionClassesUtilityClass } = require("@mui/material");

//Connect to DB
const db = process.env.MONGO_DB_URL;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB...")
})

//Routes
app.get("/", (req, res) => {
    res.send("Home Page")
})

//Testing auth
app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome to Shoppers"); 
})

//routes
app.use("/app", routesURL);

//MPESA
//Generate Token
const generateToken = async (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const consumerKey = process.env.CONSUMER_KEY;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const auth = new Buffer.from(`${consumerKey}:${secretKey}`).toString("base64");
    try {      
    const response = await axios.get(url, {
        headers: { 
            'Authorization': `Basic ${auth}`,
        }})
        .then((response) => {
            token = response.data.access_token;
            // console.log("Token:", response.data.access_token);
            next();
        })   
    } catch (error) {
        console.log("Error:", error.message);
        res.status(400).json({error});
    }
}

//M-Pesa Integration
app.post("/stk", generateToken, async (req, res) => {
    const phoneNo = req.body.phoneNo.substring(1);
    const amount = req.body.amount;
    const timeStamp = (new Date()).toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const passKey = process.env.PASS_KEY;
    const shortCode = 174379;
    const password = new Buffer.from(shortCode + passKey + timeStamp).toString("base64");

    await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        "BusinessShortCode": shortCode,
        "Password": password,
        "Timestamp": timeStamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": `254${phoneNo}`,
        "PartyB": shortCode,
        "PhoneNumber": `254${phoneNo}`,
        "CallBackURL": "https://mydomain.com/pat",
        "AccountReference": `254${phoneNo}`,
        "TransactionDesc": "Shoppers Services" 
    },
    {
        headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json',
        }
    }).then((data) => {
        res.status(200).json(data.data);
        console.log("Data:", data.data);
    }).catch((error) => {
        res.status(400).json(error.message);
        console.log("Error:", error.message);
    })

})

//Stripe Integration
app.post('/create-checkout-session', async (req, res) => {
    console.log(req.body.items);
    const line_items = req.body.items.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                    // images: [item.img],
                    description: item.author,
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'KE'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd',
              },
              display_name: 'Free shipping',
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              }
            }
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd',
              },
              display_name: 'Next day air',
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 1,
                },
              }
            }
          },
        ],
        phone_number_collection: {
            enabled: true
        },
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/login`,
    });
  
    res.send({url: session.url });
  });

//Stripe webhook
let endpointSecret;
//  endpointSecret = "whsec_d67f0505181c76795e0762a0d5f5fe9ab3a5e231f7108d8fab709321365f08bf";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let data;
//   let eventType;

//   if(endpointSecret){
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//       console.log("Webhook verified")
//     } catch (err) {
//       response.status(400).send(`Webhook Error: ${err.message}`);
//       console.log(`Webhook Error: ${err.message}`)
//       return;
//     }

//     data = event.data.object;
//     eventType = event.type

//   }else {
//     data = req.body.data.object;
//     eventType = req.body.type
//   }

//   // Handle the event
//   if(eventType === "checkout.session.completed"){

//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send().end();
// });

//Server listening to routes
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});