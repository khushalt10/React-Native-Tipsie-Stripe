const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require('stripe')('sk_test_51HQveOJv9YLAD6yOJPQ1Hj1cgC6803mUTn4yyUEdJHP607chDwX4dhWgdhu6U4jTH0IArAAHJBu4F0x2PFqTGyoZ00wzHYMoF8')

exports.completePaymentWithStripe = functions.https.onRequest((req,res) => {
    
    stripe.charges.create({
        amount: req.body.amount,
        currency: req.body.currency,
        source: 'tok_mastercard'
    }).then(charge => {
        res.send(charge)
    }).catch(err => {
        console.log(err)
    })
})