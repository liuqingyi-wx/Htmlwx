document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage('user', userMessage);
            generateAIResponse(userMessage);
            userInput.value = '';
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${sender}-message`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateAIResponse(userMessage) {
        // 这里应该是调用AI API的地方
        // 为了演示，我们使用一个简单的模拟响应
        const aiResponses = [
            "这是一个很好的问题！",
            "我需要更多信息来回答这个问题。",
            "让我想想...",
            "这个问题很有趣，但可能需要更深入的研究。",
            "我不确定，但我可以为你查找更多相关信息。"
        ];
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        setTimeout(() => {
            addMessage('ai', randomResponse);
        }, 1000); // 模拟AI思考时间
    }
});