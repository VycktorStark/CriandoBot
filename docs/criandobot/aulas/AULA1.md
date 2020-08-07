# Aula teórica - Comunicação com [API-TELEGRAM-BOT](https://core.telegram.org/bots/api) 

Tema: Comunicação com [API-TELEGRAM-BOT](https://core.telegram.org/bots/api), como receber e responder uma solicitação.

A comunicação entre seu projeto com a [API-TELEGRAM-BOT](https://core.telegram.org/bots/api) é extremamente importante. Precisamos entender como esta comunicação funciona, para que possamos criar nossos projetos. Precisamos saber que ela é dividida em duas partes: A primeira enviando dados e a outra recebendo dados.

Na aula inicial, vimos como criar uma maneira de tratar a primeira parte dessa comunicação. Enviando mensagens, arquivos e manipulando todo e qualquer método da [API-TELEGRAM-BOT](https://core.telegram.org/bots/api); Agora precisamos entender a segunda parte:

Recebimento de dados: Quando um usuário executa alguma ação no bot, ele espera por uma resposta. E para responder, precisamos saber o que é e quais são os dados dessa ação.

### Como recebemos dados da [API-TELEGRAM-BOT](https://core.telegram.org/bots/api)? 

De acordo com o site oficial, [há duas maneiras de receber as informações](https://core.telegram.org/bots/api#getting-updates): Por webhook e por long polling.

Fique tranquilo, pois iremos abordar essas duas maneiras de forma separada.

----
### Long Polling

#### O que é Long Polling?

É uma técnica [comet](https://pt.wikipedia.org/wiki/Comet_(programa%C3%A7%C3%A3o)), que permite que a conexão fique aberta, aguardando uma resposta do servidor, quando a conexão recebe uma resposta, caso seja necessário tratamos ela, logo em seguida ela é fechada (independentemente se houver algo para ser tratado ou não). Depois, essa conexão é reaberta e inicia-se um novo [loop](https://pt.wikipedia.org/wiki/Loop_(programa%C3%A7%C3%A3o)). 
- [Mais detalhes](https://rodolfofadino.com.br/usando-long-polling-com-asynccontrollers-a72e15db2f9e))

### Trabalhando com Long Polling

Para trabalharmos com Long Polling precisamos criar uma função que faça conexão com o método [getUpdates](https://core.telegram.org/bots/api#getupdates) para isso usaremos o manipulador de métodos da API que abordamos na aula passada.

Nota: O objetivo das aulas não é ensinar programação. No entanto, deixarei um exemplo abaixo, de como devemos criar essa funcionalidade. 
 * Lembre-se de adicionar sua token do bot ao manipulador de métodos.

Usarei essa funcionalidade para o Long Polling:
```python
import Method, json
def longpolling():
    """
    Essa funcionalidade permitirá que você faça checagem de novas ações e colete os dados,
    caso houver, ela retornará o que encontrar, caso não tenha nada, ela retornará algo pré-definido
    isso fará com que o loop não seja interrompido.
    """
    temp = 100
    while True:
        data = api.sendTG(method="getUpdates", offset=temp, timeout=int(temp+1), allowd_updates='message')
        data = data["response"] 
        if len(data["result"]) == 0:
            resp = json.dumps(dict(ping='pong')) #Estou definido algo para retorna, caso não encontre resultados
        elif ("result" in data):
            temp  = int(data['result'][0]['update_id']  + 1) #Aumentando o tempo
            resp = data['result'][0]
        return resp
```

Agora, precisamos tratar o que foi retornado. Então, criaremos algo para responder.

```python
import Method,json
api = Method.Method()
def handler(vetor):
    """
    Essa função receberá eventos, porém só irá fazer o tratamento dos evento que possuam a chave: "message"; no vetor;  
    caso seja encontrado essa chave, responderá com a palavra: PONG
    Nota: os retornos de resposta são apenas exemplos, você pode alterar ou adicionar da maneira que preferir.
    """
    if ("message" in vetor):
        msg = vetor["message"]
        if ('text' in msg):
            api.sendTG(chat_id=msg['chat']['id'], text='PONG')
```
Ok, vamos unificar as duas funções para trabalharem no mesmo script.

```python
import Method,json
api = Method.Method()

def longpolling():
    """
    Essa funcionalidade permitirá que você faça checagem de novas ações e colete os dados,
    caso houver, ela retornará o que encontrar, caso não tenha nada, ela retornará algo pré-definido
    isso fará com que o loop não seja interrompido.
    """
    temp = 100
    while True:
        data = api.sendTG(method="getUpdates", offset=temp, timeout=int(temp+1), allowd_updates='message')
        data = data["response"] 
        if len(data["result"]) == 0:
            resp = json.dumps(dict(ping='pong')) #Estou definido algo para retorna, caso não encontre resultados
        elif ("result" in data):
            temp  = int(data['result'][0]['update_id']  + 1) #Aumentando o tempo
            resp = data['result'][0]
        handler(resp)
def handler(vetor):
    """
    Essa função receberá eventos, porém só irá fazer o tratamento dos evento que possuam a chave: "message"; no vetor;  
    caso seja encontrado essa chave, responderá com a palavra: PONG
    Nota: os retornos de resposta são apenas exemplos, você pode alterar ou adicionar da maneira que preferir.
    """
    if ("message" in vetor):
        if ('text' in vetor["message"]):
            api.sendTG(chat_id=vetor["message"]['chat']['id'], text='PONG')

if __name__ == '__main__':
    try:
        print("Iniciando o bot")
        longpolling() #Chamando a função para iniciar o long polling
    except KeyboardInterrupt: #Caso vocÊ execute: CTRL C
        print("\nEncerrando o bot")
```
Pronto, já temos o nosso bot rodando via polling e respondendo todos os evento com a chave "message", em outras aulas criaremos novos recursos.

----
### Webhook

#### O que é Webhook?

Webhooks são retornos de chamada HTTP e/ou HTTPS em seu servidor web, esse sistema possui uma flexibilidade para integrar fluxo para essas chamadas de maneira que conseguimos tratar cada chamada que recebemos, sendo ele um sistema impressionantemente simples de implementar em qualquer linguagem de programação.
- [Mais detalhes](https://pt.wikipedia.org/wiki/Webhook)

### Trabalhando com Webhook

Basicamente, quando definimos para a [API-TELEGRAM-BOT](https://core.telegram.org/bots/api) que iremos receber todas as novas requisições por webhook, o próprio Telegram encarrega-se de fazer chamadas carregando informações das ações executadas pelo usuários em nosso servidor web, restando apenas tratar essas informações e, para isso devemos subir um servidor web em nossa máquina e montar uma função para manipular as chamadas recebidas, mais uma vez usaremos o script que criamos na aula passada.

Nota: O objetivo das aulas não é ensinar programação. No entanto, deixarei um exemplo abaixo de como devemos criar essa funcionalidade. Lembre-se de adicionar sua token do bot ao manipulador de métodos. Falando sobre subir um servidor web, fique tranquilo, você pode usar o [ngrok](https://ngrok.com/) (Inclusive, nessa aula
iremos usá-lo).

Primeiramente, precisamos deixar nosso servidor web online, [clique aqui](https://ngrok.com/download) e, siga as instruções para fazer download do arquivo e descompactá-lo, agora com o arquivo descompactado, abra seu terminal na pasta onde ele está e execute: ngrok http 8443, ele vai gerar um link com HTTP e HTTPS, minimize o terminal e deixe rodando em segundo plano.

Agora vamos criar o nosso script para manipular as chamadas recebidas, usaremos a biblioteca [Flask](https://flask.palletsprojects.com/en/1.1.x/) uma vez que na minha opinião é a melhor para
trabalharmos chamadas recebidas. Abaixo um exemplo de uso dessa
biblioteca.
```python
import flask, Method, json
api = Method.Method()
app = flask.Flask(__name__)

@app.errorhandler(404)
def server_error(errorhandler):
    """
    Se ocorrer algum erro com o código 404, a função abaixo será executada,
    onde retornaremos o status 200 para eliminar toda e qualquer solicitação!

    Porque? o webhook cria um tipo de loop, onde sempre repetirá a solicitação até seja tratada como status 200,
    isto é, ele só encerra o loop quando recebe uma mensagem bem-sucedida de que, por padrão, possui o status 200,
    Basicamente, isso resolverá o problema!
    """
    return flask.Response(status=200)

@app.before_request
def handler():
    if (flask.request.method == 'GET') and (flask.request.path == "/webhookstart"): 
        """
        A partir daqui ele será lido apenas se o método de solicitação for "GET" e, 
        se o caminho for igual a "/webhookstart", se essas variáveis ​​forem verdadeiras, esse script 
        executará uma funcionalidade na API-TELEGRAM-BOT que fará com que a host seja reconhecida pelo flask
        e, receba novos eventos do bot, ou seja, todas as novas solicitações serão enviadas apenas para o host detectável pelo "flask"
        Nota: Caso esteja usando o ngrok não se preocupe em ter que alterar o HTTPS no código, 
        quando você executar o ngrok, ele gerará um link HTTPS, certo? acesse ele e adicione no final /webhookstart
        exemplo: gerou o link: "https://232ih3h.ngrok.com", então você deverá acessar o link  https://232ih3h.ngrok.com/webhookstart
        """
        r = api.sendTG(method="setWebhook", url=f"{flask.request.host}/webhook", max_connections=1, allowd_updates='message')
        return Response(response=r["response"]['description'], status=200)

    if (flask.request.method == 'POST') and (flask.request.path == "/webhook"):
        """
        A partir daqui será lido apenas se o método de solicitação for "POST" (padrão das chamadas do Telegram)
        e, se o caminho for igual a "/webhook", se essas variáveis ​​forem verdadeiras, o script irár ler os eventos,
        caso haja um evento com a chave: "messsage"; ele responderá com a palavra: PONG
        Estou usando essa palavra apenas para saber que o script está funcionando, você poderá usar outra coisa
        """
        vetor = flask.request.get_json(silent=True, force=True) # lendo os eventos recebido pela chamada
        if ("message" in vetor):
            if ('text' in vetor["message"]):
                api.sendTG(chat_id=vetor["message"]['chat']['id'], text='PONG')
        return flask.Response(status=200)

if __name__ == '__main__':
  app.run(debug=True, port=8443, host='127.0.0.1') #Running app
```

Concluímos esta aula, aprendemos como funciona o recebimento de dados para novas ações por meio do long polling e webhook, criamos um script que faz o bot responder a essas novas ações e identifica as informações dela, em breve aprenderemos como usar todos os métodos [API-TELEGRAM-BOT](https://core.telegram.org/bots/api) 

footer: MIT Licensed | Copyright © 2020-present Roberto Monteiro
---