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
