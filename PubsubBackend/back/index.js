//Pubsub configuration: https://cloud.google.com/pubsub/docs/ordering
const express = require('express');
const cors = require('cors');
const app = express();
const {PubSub} = require('@google-cloud/pubsub');
app.use(cors());
app.use(express.json());
 
const pubSubClient = new PubSub();
 
const port = process.env.PORT || 4003;



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Content-Type", "application/json");
  next();
})
 

app.post('/send', async function(req,res)
{

    const topic = req.body.topic;
    const data = req.body.message;

    const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
        const messageId = await pubSubClient.topic(topic).publish(dataBuffer);
        const mes = messageId.toString('utf-8');
      } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
      }
    
      return res.status(200).json({
          message: "sent"
      })
});

app.post('/receive', async function(req,res)
{
    const subName = req.body.subscription;
    const subscription = pubSubClient.subscription(subName);

    let messageCount = 0;
    let msg = null;
    const mHandler = function(message) {
      console.log(`\tData: ${message.data}`);
      messageCount += 1;

      message.ack();
      
      const str = new Buffer.from(message.data).toString();

      msg = str;
      return res.status(200).json({
        message: msg,
      })
  
    };
    
    subscription.on('message', mHandler);

    setTimeout(() => {
      subscription.removeListener('message', mHandler);
      console.log(`${messageCount} message(s) received.`);
      if(messageCount === 0) {
        return res.status(200).json({
          message: null,
      })
      }
    }, 5000);

    
});

app.listen(port, ()=> console.log("listening on port" + port));