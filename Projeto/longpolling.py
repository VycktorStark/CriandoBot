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
		data = api.sendTG(method="getUpdates", offset=temp, timeout=int(temp+1), allowed_updates='message')
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
