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

