ArduinoComAjax
==============

Arduino recebendo uma requisição AJAX e retornando um json.


Download de todos os arquivos: https://github.com/rogerin/ArduinoComAjax/archive/master.zip

## Dependências da página

`HTML/js/jquery.js` contém o jQuery 3.7.1, distribuído pelo projeto jQuery.
A página usa os estilos Bootstrap incluídos em `HTML/css/`; ela não usa os
plugins JavaScript do Bootstrap. Os scripts Bootstrap 3.0.0 antigos foram
removidos.

## Comunicação com o Arduino

O firmware existente responde em HTTP com o formato `dados({ sensor1: ... })`
e envia `Access-Control-Allow-Origin: *`. A página agora solicita essa resposta
como texto por XHR e aceita somente os quatro campos numéricos no formato
emitido pelo firmware. Assim, bytes recebidos pela rede não são executados como
JavaScript. Não é necessário atualizar o firmware para essa mudança; o navegador
precisa permitir a requisição à rede local. Alguns navegadores solicitam
permissão de acesso à rede local ou bloqueiam requisições HTTP iniciadas por uma
página HTTPS.

Essa validação não autentica os comandos `GET ?acao=001` a `004` nem protege o
tráfego HTTP contra leitura ou alteração na rede. O firmware ainda aceita
comandos sem autenticação e anuncia CORS para qualquer origem. Use o exemplo
apenas em uma rede confiável. Para proteger comandos e integridade dos dados,
seria necessário alterar o protocolo no firmware e usar autenticação e um canal
seguro compatível com o hardware ou um gateway confiável; isso exige validação
no dispositivo. Não houve teste com o Arduino físico nesta atualização.

Para testar o parser sem hardware: `node --test test/arduino-response.test.js`.
