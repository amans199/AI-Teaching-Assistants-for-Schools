from langchain_groq import ChatGroq

class ChatBot:
    def __init__(self, api_key, model_name):
        """
        Initialize the ChatBot with an API key, model name, and memory storage.
        """
        self.api_key = api_key
        self.model_name = model_name
        self.chat = ChatGroq(api_key=self.api_key, model=self.model_name)
        self.memory = {}  # Dictionary to store conversation history by thread_id

    def add_message(self, thread_id, role, content):
        """
        Add a message to the conversation history for a specific thread_id.
        """
        if thread_id not in self.memory:
            self.memory[thread_id] = []
        self.memory[thread_id].append({"role": role, "content": content})

    def get_conversation(self, thread_id):
        """
        Retrieve the conversation history for a specific thread_id.
        """
        return self.memory.get(thread_id, [])
    
    def delete_conversation(self, thread_id):
        """
        Delete the conversation history for a specific thread_id.
        """
        if thread_id in self.memory:
            del self.memory[thread_id]
            return f"Conversation for thread_id {thread_id} has been deleted."
        else:
            return f"No conversation found for thread_id {thread_id}."

    def generate_response(self, thread_id, user_input, temperature=0.75):
        """
        Generate a response for the given thread_id based on the conversation history.
        """
        if thread_id not in self.memory:
            self.add_message(thread_id, "system", user_input)

        # Add the user's input to the conversation history
        self.add_message(thread_id, "user", user_input)

        # Get the full conversation history for the thread
        messages = self.get_conversation(thread_id)

        # Generate a response using the Groq API
        response = self.chat.invoke(input=messages, temperature=temperature)

        # Add the assistant's response to the conversation history
        assistant_response = response.content
        self.add_message(thread_id, "assistant", assistant_response)

        return assistant_response