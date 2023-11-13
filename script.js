function generateReply() {
	try {
		document.getElementById('time').classList.remove('removed');
		document.getElementById('time').classList.add('time');
		const chatBody = document.getElementById('chatBody');
		const message = document.getElementById('txtInput').value;
		const messageEle = document.createElement('div');
		const txtNode = document.createTextNode(message);
		messageEle.classList.add('user-message');
		chatBody.append(messageEle);
		messageEle.append(txtNode);
		const replyDiv = document.createElement('div');
		replyDiv.classList.add('chatbot-message');
		replyDiv.innerText = '...';
		chatBody.append(replyDiv);
		const key = 'AIzaSyCMVLJ_4GQlJZTp2B6nFmbOSsr4DUin-98';
		if (!key) throw new Error('No Key provided');
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
				return `Looks like you defeated a Robot...`;
			}
			const reply = res.data.candidates[0].content;
			if (!reply) {
				return `Something failed, Sorry!`;
			}
			replyDiv.innerText = reply;
		});
		chatBody.scrollTop = chatBody.scrollHeight;
	} catch (err) {
		const a = document.createElement('div');
		a.append(err.toString());
		document.getElementById('chatBody').insertAdjacentElement('beforebegin', a);
	}
}
