function generateReply() {
	try {
const message = (document.getElementById('message').value).trim()
		if (!message.toString()) return;	
	timeDiv.classList.remove('removed');
		timeDiv.classList.add('time');
		const chatBody = document.getElementById('chatBody');
		const msg = message.replaceAll('Mylo', '').toLowerCase();
		if (!msg.toString()) return;
		const messageDiv = document.createElement('div');
		messageDiv.innerText = message;
		messageDiv.classList.add('user-message');
		chatBody.append(messageDiv);
		const replyDiv = document.createElement('div');
		replyDiv.classList.add('chatbot-message');
		document.getElementById("loading").classList.remove("removed")
		const key = 'AIzaSyCMVLJ_4GQlJZTp2B6nFmbOSsr4DUin-98';
		const link = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${key}`;
		const options = {
			url: link,
			method: 'POST',
			data: {
				prompt: {
					messages: [{ content: msg }],
				},
			},
		};
		function reply(text) {
			setTimeout(() => {
				replyDiv.append(document.createTextNode(text))
				document.getElementById("loading").classList.add("removed")
				chatBody.append(replyDiv)
			}, 2000);
			chatBody.scrollTop = chatBody.scrollHeight;
		}
		if (msg.includes('your') || msg.includes('ur')) {
			if (msg.includes('name')) {
				reply('My name is Mylo. Nice to meet you!');
				return;
			}

			if (message.includes('creator') || message.includes('developer')) {
				reply('I am developed by Tanmay Sharma, a high school student.');
				return;
			}
		}
		if (message.includes('created') && message.includes('you')) {
			reply('I am developed by Tanmay Sharma, a high school student.');
			return;
		}
		axios(options).then((res) => {
			if (!res.data.candidates) {
				reply(`I'm sorry, but I'm not sure how to answer that. Could you try rephrasing your question or providing more detail?`)
				return;
			}
			const repl = res.data.candidates[0].content;
			if (!repl) return;
			reply(repl)
		});
	} catch (err) {
		console.log(err)
		reply(`I'm sorry, but I'm not sure if I can answer that.`);
		document.getElementById("loading").classList.add("removed")
		return;
	}
}
