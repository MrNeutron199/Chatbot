function generateReply() {
	try {
		timeDiv.classList.remove('removed');
		timeDiv.classList.add('time');
		const chatBody = document.getElementById('chatBody');
		const message = document.getElementById('message').value;
		const msg = message.replaceAll('Mylo', '').trim().toLowerCase();
		const messageDiv = document.createElement('div');
		messageDiv.classList.add('user-message');
		messageDiv.append(message);
		chatBody.append(messageDiv);
		const replyDiv = document.createElement('div');
		replyDiv.classList.add('chatbot-message');
		replyDiv.innerText = '....';
		chatBody.append(replyDiv);
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
				replyDiv.innerText = text;
			}, 2000);
			chatBody.scrollTop = chatBody.scrollHeight;
		}
		if (msg.includes('your') || msg.includes('ur')) {
			if (msg.includes('name')) {
				const arr = [
					'My name is Mylo',
					'You can call me Mylo!',
					'I go by Mylo',
					"I'm Mylo, Nice to meet you!",
				];
				const m = Math.floor(Math.random() * (4 + 1));
				reply(arr[m]);
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
				replyDiv.innerText =
					'Looks like you managed to defeat a Robot!.\n(I ran into an error, Sorry!)';
				return;
			}
			const reply = res.data.candidates[0].content;
			if (!reply) return;
			replyDiv.innerText = reply;
		});
		chatBody.scrollTop = chatBody.scrollHeight;
	} catch (err) {
		console.log(err);
	}
}
