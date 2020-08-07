# Aula teórica - Piloto

Tema: Manipulação dos métodos da API-TELEGRAM-BOT

Para começar, precisamos entender como a API-TELEGRAM-BOT funciona e, como devemos "conversar com ela"; vamos nessa aula entender como iremos fazer isso. Estarei fragmentando algumas coisas para ficar fácil o entendimento.

### Primeiramente, o que é uma API?

*"API é uma Interface de Programação de Aplicação (pt-BR), cuja sigla API provém do Inglês Application Programming Interface, é um conjunto de rotinas e padrões estabelecidos por um software para a utilização das suas funcionalidades por aplicativos que não pretendem envolver-se em detalhes da implementação do software, mas apenas usar seus serviços.*

*De modo geral, a API é composta por uma série de funções acessíveis somente por programação, e que permitem utilizar características do software menos evidentes ao utilizador tradicional... ([continuar lendo](https://pt.wikipedia.org/wiki/Interface_de_programa%C3%A7%C3%A3o_de_aplica%C3%A7%C3%B5es))"*

Para entendermos melhor, estarei colocando dentro do contexto que queremos...

Por exemplo: quando falamos sobre o uso da API-TELEGRAM-BOT, estamos dizendo que usaremos a funcionalidade do aplicativo bot para executar funções que poderíamos realizar sendo apenas um usuário comum, mas estamos executando como um bot, por que esse é o padrão para qualquer automação.

### Como utilizar API / Como "Conversar" com a API?

No site oficial é apresentado que todas as consultas/conversas para a API-TELEGRAM-BOT devem ser enviadas via HTTPS e necessariamente devem ser apresentadas desta maneira:

`https://api.telegram.org/bot<token>/METHOD_NAME`. 

Essas consultas/conversas com a API, são chamadas de requisições, essas requisições podem ser enviadas via GET ou POST, desde que respeite todos os parâmetros obrigatórios de cada método.

Vou citar um exemplo de como devemos solicitar os dados da pela API. Abaixo estou deixando um link, clique para acessar. Ao carregar a página troque `<token>` pela sua token que te instrui a criar na introdução.

##### Exemplo:
`link:` [https://api.telegram.org/bot<token>/getMe](https://api.telegram.org/bot<token>/getMe)

`resultado:`
```json
{
"ok":true,
"result": {
  "id":523403928,
  "is_bot":true,
  "first_name":
  "Nome do seu bot",
  "username":"Nomedoseubot",
  "can_join_groups":true,
  "can_read_all_group_messages":false,
  "supports_inline_queries":false
  }
}
```

Pronto, acabamos de enviar uma requisição HTTP via GET à API-TELEGRAM-BOT. Porém não iremos acessar sempre nosso navegador para enviar uma requisição? É agora que a programação entra.

Precisamos criar uma função para fazer essa conversação, sem a necessidade de abrirmos uma página toda vez que precisarmos enviar uma requisição.

Vamos lá! Precisamos primeiro definir uma lib para trabalharmos. Vou usar a lib `requests` do python, por experiência eu vou trabalhar com class porque acho melhor para desenvolver o que preciso. Mas você pode criar funções, como disse na introdução o objetivo desse projeto não é programação, prosseguindo:

Primeiro, instalaremos a lib em nosso terminal, então abra o terminal e execute: `sudo pip3 install requests`, logo em seguida abra um editor de texto e digite:

```python
import requests
def sendRequest(url, params=None, headers=None, files=False, post=False):
    try:
        requests.get(url, params=params, headers=headers, files=files, post=post)
    except Exception as error:
        print(error)
```

Na função acima, estamos tratando apenas a utilização da lib `requests`. Com essa função, conseguiremos executar requisições em qualquer HTTP, mas o objetivo é trabalhar com a API-TELEGRAM-BOT, ou seja, precisa inserir dados para comunicarmos com ela, o que precisamos para isso?

Sabemos que a API obrigatoriamente precisa que informemos sempre a token do bot e que ela suporta quatro maneiras de passar parâmetros para os métodos, sendo:

```Plain Text
    String de consulta da URL (que fizemos logo acima pelo navegador)
    application/x-www-form-urlencoded
    application/json (não é recomendado usar para fazer upload de arquivos)
    multipart/form-data (recomendado usar para fazer upload de arquivos)
```

Com base nisso, precisamos definir a token do bot e os cabeçalhos (headers), para passarmos parâmetros para os métodos e por fim uma maneira de usar a função `sendRequest`. Estou deixando abaixo um exemplo que fiz com alguns comentários.

```python
import os, requests, json
class Method():
    """
    Este método ajudará você a manipular a API do Telegram facilmente, 
    porque basicamente ela se comunicará com a API-TELEGRAM-BOT enviando os argumentos necessários
    sem a necessidade de escrever muito código ou usar uma Frameworks/SDK/Wrapper para o Telegram.
    """
    def __init__(self):
        self.token = "Defina a token do bot aqui"
        self.apitelegram = f"https://api.telegram.org/bot{self.token}" # Definindo api-telegram-bot
        self.headers = {'content-type': 'application/json', 'Cache-Control': 'no-cache'} # Definindo headers
    @staticmethod
    def sendRequest(url, params=None, headers=None, files=False, post=False):
        """
        Esta função ajudará você a trabalhar com tudo relacionado à captura de dados da Web
        E não apenas com a API do Telegram
        """
        try:
            if (post): # Caso precise enviar arquivos, essa condição será usada.
                data = requests.post(url, params=params, headers=headers, files=files, post=post)
            else:
                # Caso não precise enviar arquivos, essa condição será usada.
                data = requests.get(url, params=params, headers=headers)
        except Exception:
            data = False
        if (data != False):
            if (data.status_code == 200): 
                return dict(success=True, code=data.status_code, response=data.json())
            else:
                return dict(success=False, code=data.status_code, response=data.json())
        else:
            return dict(success=False, code=404, response=False)

    def sendTG(self, method="sendMessage", strfile=False, file=False, **args):
        """
        Esta função, quando chamada, executará uma requisição 
        que enviará os argumentos para o API-Telegram-BOT.
        Legenda:
            method: Nome do method
            strfile: quando for necessario enviar um arquivo, nome do arquivo será indexado aqui
            file: quando for necessario enviar um arquivo, o arquivo será indexado aqui
            args: para os demais argumentos, depende muito do method
            então ele irá coletar o que chegar por aqui

        """
        if (strfile != False) and (file != False):
            # Caso as condições strfile e file, forem verdadeiras, essa condição será usada

            return self.sendRequest(f"{self.apitelegram}/{method}", params=locals()['args'], headers=self.headers, files=dict(strfile=file), post=True)
        elif (strfile == False) and (file == False):
            # Caso as condições strfile e file, forem falsas, essa condição será usada
            
            return self.sendRequest(f"{self.apitelegram}/{method}", params=locals()['args'], headers=self.headers)
```
Não vou entrar em muitos detalhes, pois não é o objetivo desta aula, porém eu quero que você entenda o funcionamento do código acima, então estou deixando alguns exemplos abaixo sobre como usá-lo

Orientações recomendadas:

- *Defina sua token do bot no local informado dentro do código e salve o arquivo como:* `method.py`:
- *Abra seu terminal e navegue até a pasta em que o arquivo foi salvo e execute:* `python3`;
- *Siga os exemplos abaixo para executar os testes:*


Primeiro exemplo, enviando string (objetos que contém uma cadeia de caracteres):

```python
import Method
api = Method.Method()
api.sendTG(method="getME")
api.sendTG(chat_id=438131290,text='oi')
api.sendTG(method="sendPhoto", chat_id=438131290, photo="https://img.olhardigital.com.br/uploads/acervo_imagens/2020/04/r4x3/20200423030657_660_495_-_python.jpg", caption='<b>ping</b>', parse_mode='HTML')
```

Segundo exemplo, enviando algum tipo de arquivo:

```python
import os, gtts, Method
api = Method.Method()
try:
    AUDIO = gtts.gTTS(cmd[1], lang="en")
    AUDIO.save('audio.ogg')
    AUDIO = open('audio.ogg', 'rb')
    api.sendTG(method="sendAudio", strfile="audio", file=AUDIO, chat_id=438131290)
    AUDIO.close()
except Exception as error:
    print(error)
finally:
    try:
        os.remove('audio.ogg')
    except Exception:
        pass
```

Chegamos no fim desta aula, entendemos nessa aula como uma API funciona e como conversar com ela, aplicando isso no nosso objetivo.

Estarei deixando o arquivo que foi criado nessa aula na pasta: Projeto, pois usaremos muito esse arquivo daqui para frente.

footer: MIT Licensed | Copyright © 2020-present Roberto Monteiro
---