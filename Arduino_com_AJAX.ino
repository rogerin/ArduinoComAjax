/*
 * Projeto: Arduino com AJAX
 * Autor: Rogerio Alencar Filho
 * Data: 24/02/2014
 * Versão: v0.1
 * Descrição: O Arduino recebe uma requisição HTTP e retorna um JSON que é tratado no HTML com Javascript para exibir na tela.
 * Github: https://github.com/rogerin/ArduinoComAjax
 * Twitter: https://twitter.com/rogerin
 */


#include <SPI.h>
#include <Ethernet.h>

byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};

IPAddress ip(192,168,1,123);
IPAddress gateway(192,168,1,100);
IPAddress subnet(255,255,255,0);

EthernetServer server(3000);

const int analogPin1 = A0;
const int analogPin2 = A1;

int sensor1 = 0;
int sensor2 = 0;

void setup()
{
  Serial.begin(9600);
  Serial.println("Iniciando programa..");
  Ethernet.begin(mac,ip,gateway,subnet);
  Serial.println("Server ativo no IP: ");
  Serial.print(Ethernet.localIP());
  server.begin();
  
}
void loop()
{
  EthernetClient client = server.available();
  if(client)
  {
    boolean continua = true;
    String linha = "";

    while(client.connected())
    {
      if(client.available()){
        char c = client.read();
        linha.concat(c);
  
        if(c == '\n' && continua)
        {
          client.println("HTTP/1.1 200 OK");
          // IMPORTANTE, ISSO FAZ O ARDUINO RECEBER REQUISIÇÃO AJAX DE OUTRO SERVIDOR E NÃO APENAS LOCAL.
          client.println("Content-Type: text/javascript");
          client.println("Access-Control-Allow-Origin: *");
          client.println();
          
          sensor1 = analogRead(analogPin1);
          sensor2 = analogRead(analogPin2);
          
          client.print('dados({ \'sensor1\' : ');
          client.print(sensor1);
          client.print(' , \'sensor2\' :  ');
          client.print(sensor2);
          client.print(' }) ');
          
          Serial.print('dados({ \'sensor1\' : ');
          Serial.print(sensor1);
          Serial.print(' , \'sensor2\' :  ');
          Serial.print(sensor2);
          Serial.print(' }) '); 
          
        }
        if(c == '\n') { continua = true; }
        else if (c != '\r') { continua = false; }
      }
    }
     delay(1);
     client.stop();
  }
  
          
          /*
          
          #####################
          ## Debug na serial ##
          #####################
          
          sensor1 = analogRead(analogPin1);
          delay(10);
          sensor2 = analogRead(analogPin2);
          
          Serial.println("dados({ \'sensor1\' : ");
          delay(10);
          Serial.println(sensor1);
          delay(10);
          Serial.println(" , \'sensor2\' :  ");
          delay(10);
          Serial.println(sensor2);
          delay(10);
          Serial.println(" }) "); 
          delay(500);
          */
}
