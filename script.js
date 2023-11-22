function generateReply() {
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

	//Animation Area
	const loadingDiv = document.createElement('div')
	loadingDiv.classList.add('typing')
	const span1 = document.createElement('span')
	const span2 = document.createElement('span')
	const span3 = document.createElement('span')
	loadingDiv.append(span1, span2, span3)
	replyDiv.append(loadingDiv)
	//Animation Area Finish
	chatBody.append(replyDiv)
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
			document.getElementsByClassName('typing')
			replyDiv.replaceChildren(document.createTextNode(text))
			chatBody.append(replyDiv)
			chatBody.scrollTop = chatBody.scrollHeight;
		}, 2000);
	}

	//Hard Coded checks
	if (msg.includes('your') || msg.includes('ur')) {
		if (msg.includes('name')) {
			reply('My name is Mylo. Nice to meet you!');
			return;
		}

		if (message.includes('creator') || message.includes('developer')) {
			reply('I am developed by Tanmay Sharma, a high school student.');
			return;
		}
		if (message.includes('age')) {
			reply("I was born a week ago. Ill assume I'm a week old.")
			return;
		}
	}
	if (message.includes('created') && message.includes('you')) {
		reply('I am developed by Tanmay Sharma, a high school student.');
		return;
	}
	//Hard coded checks finished

	axios(options).then((res) => {
		if (!res.data.candidates) {
			reply(`I'm sorry, but I'm not sure how to answer that. Could you try rephrasing your question or providing more detail?`)
			return;
		}
		const repl = res.data.candidates[0].content;
		if (!repl) return;
		reply(repl)
	});
}
