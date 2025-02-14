from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

class Assistant:
    def __init__(self, api_key, base_url, model):
        """
        Initialize the Assistant with an API key, Base url, model name, and memory storage.
        """
        self.api_key = api_key
        self.base_url = base_url
        self.client = OpenAI(api_key=self.api_key, base_url=self.base_url)
        self.model = model
        self.memory = {} # Dictionary to store conversation history by thread_id

    def add_message(self, thread_id, role, content):
        """
        Add a message to the conversation history for a specific thread_id.
        """
        if thread_id not in self.memory:
            self.memory[thread_id] = []
        self.memory[thread_id].append({"role": role, "content": content})

    def generate_response(self, thread_id, user_input, temperature, top_p):
        if thread_id not in self.memory:
            self.add_message(thread_id, "system", "You are an AI assistant who knows everything. Keep your responses short and precise. Maintain a professional tone always.")

        # Add the user's input to the conversation history
        self.add_message(thread_id, "user", user_input)

        # Get the full conversation history for the thread
        messages = self.get_conversation(thread_id)

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                temperature=temperature,
                top_p=top_p,
                messages=messages
            )
            assistant_response = response.choices[0].message.content
            # Add the assistant's response to the conversation history
            self.add_message(thread_id, "assistant", assistant_response)
            return assistant_response

        except Exception as e:
            print(f"Error while fetching response: {e}")
            return None

    def delete_conversation(self, thread_id):
        if thread_id in self.memory:
            del self.memory[thread_id]
            return f"Conversation for thread_id {thread_id} has been deleted."
        else:
            return f"No conversation found for thread_id {thread_id}."

    def get_conversation(self, thread_id):
        return self.memory.get(thread_id, [])

# Initialize the Assistant
assistant = Assistant(api_key=os.getenv("API_KEY"), base_url="https://api.aimlapi.com/v1", model="deepseek/deepseek-r1")
print(assistant)