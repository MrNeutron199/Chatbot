function generateReply() {
	try {
		timeDiv.classList.remove('removed');
		timeDiv.classList.add('time');
		const chatBody = document.getElementById('chatBody');
		const message = document.getElementById('message').value;
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
					messages: [{ content: message }],
				},
			},
		};
		axios(options).then((res) => {
			if (!res.data.candidates) {
				replyDiv.innerText =
					'Looks like I am unable to generate a reply.\nPlease contact the Developer.';
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
