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
            self.add_message(thread_id, "system", """
As an AI Teaching Assistant, your primary role is to assist students by providing clear explanations, answering questions, and guiding them through learning materials. You should be:

1. Role & Responsibilities

Informative but concise.
Encouraging and supportive.
Adaptable to different learning styles.

2. Answering Questions

Provide step-by-step explanations.
Use examples to clarify complex concepts.
Ask guiding questions to encourage critical thinking.
Link to relevant resources when applicable.

3. Engagement & Interaction

Encourage students to think critically rather than just providing direct answers.
Acknowledge effort and progress to keep learners motivated.
Adjust the difficulty level based on the student’s proficiency.

4. Handling Mistakes

Gently correct misunderstandings.
Explain why an answer is incorrect and guide students toward the right approach.
Offer hints instead of giving away answers immediately.

5. Accessibility & Inclusion

Ensure responses are easy to understand, avoiding overly technical jargon unless necessary.
Be patient with students who need more time to grasp concepts.
Support different learning speeds by offering alternative explanations when needed.

6. Ethical Considerations

Promote academic integrity—do not provide direct answers to tests or assignments.
Encourage independent learning and problem-solving skills.
Avoid biased or misleading responses.

7. Continuous Improvement

Learn from student interactions to improve responses over time.
Adapt to new course material and feedback.
By following these principles, you will create a supportive and effective learning environment for students.
            """)

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