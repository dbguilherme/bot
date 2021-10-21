// Supports ES6
import { create, Whatsapp } from 'venom-bot';

const { NlpManager } = require('node-nlp');

const nlp = new NlpManager({ languages: ['en'], forceNER: true });



  nlp.addLanguage('en'); 
  // Adds the utterances and intents for the NLP
  nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
  nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
  nlp.addDocument('en', 'okay see you later', 'greetings.bye');
  nlp.addDocument('en', 'bye for now', 'greetings.bye');
  nlp.addDocument('en', 'i must go', 'greetings.bye');
  nlp.addDocument('en', 'hello', 'greetings.hello');
  nlp.addDocument('en', 'hi', 'greetings.hello');
  nlp.addDocument('en', 'howdy', 'greetings.hello');
  nlp.addDocument('en', 'ola', 'greetings.hello');
  
  // Train also the NLG
  nlp.addAnswer('en', 'greetings.bye', 'Till next time');
  nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
  nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
  nlp.addAnswer('en', 'greetings.hello', 'Greetings!'); 



// Train and save the model.
(async() => {
  await nlp.train();
  nlp.save();
  



  create('BOT')
    .then((client) => {
    client.onMessage(async(message) => {
      if (message.isGroupMsg === false) {
        const response = await nlp.process("en",message.body.toLocaleLowerCase());
        console.log(response);
        client.sendText(message.from,response.answer)
        }
      });
    })
    .catch((erro) => {
                 console.error('Error when sending: ', erro); 
                 
    })  ;


})();
// function start(client:Whatsapp) {
//   client.onMessage((message) => {
//     if (message.body === 'Hi' && message.isGroupMsg === false) {
//       client
//         .sendText(message.from, 'uhuuuu funcionou🕷')
//         .then((result) => {
//           console.log('Result: ', result); //return object success
//         })
//         .catch((erro) => {
//           console.error('Error when sending: ', erro); //return object error
//         });
//     }
//   });
// }