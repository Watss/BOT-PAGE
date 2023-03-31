
const request = require('request');
const accountSid = 'AC68d2d380cfedccf419ccd51fe976c2fb';
const authToken = '75e2d70df89de99bbeffc6bf8e918b86';
const client = require('twilio')(accountSid, authToken);

const siteUrl = 'https://www.passline.com/eventos/nublense-vs-racing';

let lastWebpage = '';

const monitorWebsite = async () => {
    request(siteUrl, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          // Si se obtiene una respuesta exitosa, comparar el contenido del sitio web con la última versión monitoreada
          if (body != lastWebpage) {
            console.log("Se ha detectado un cambio en el sitio web");
            sendMessage();
            lastWebpage = body;
          } else {
            console.log("No se ha detectado ningún cambio en el sitio web");
          }
        } else {
          console.log("No se ha podido acceder al sitio web");
        }
      });
  }

const sendMessage = () => {
  client.messages
  .create({
     body: `CAMBIOS EN LA WEB DE LAS ENTRADAS ${siteUrl}`,
     from: '+15855268725',
     to: '+56944921405',
   })
  .then(message => console.log(message.sid));
}

setInterval(monitorWebsite, 1000);