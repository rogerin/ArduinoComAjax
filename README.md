ArduinoComAjax
==============

Arduino recebendo uma requisição AJAX e retornando um json.


Download de todos os arquivos: https://github.com/rogerin/ArduinoComAjax/archive/master.zip

## Dependências da página

`HTML/js/jquery.js` contém o jQuery 3.7.1, distribuído pelo projeto jQuery.
A página usa os estilos Bootstrap incluídos em `HTML/css/`; ela não usa os
plugins JavaScript do Bootstrap. Os scripts Bootstrap 3.0.0 antigos foram
removidos.

O exemplo ainda se comunica por JSONP com o Arduino em HTTP na rede local.
Use-o somente em uma rede confiável: a resposta JSONP é executada como
JavaScript pela página. A troca por JSON com CORS exige atualizar e testar
o programa no dispositivo.
