from flask import Flask, request
from flask_socketio import SocketIO, emit
import os
from dotenv import load_dotenv
from ai_assistant import ChatBot
import logging

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# Create an instance of the ChatBot
chatbot = ChatBot(api_key=os.getenv("GROQ_API_KEY"), model_name="mixtral-8x7b-32768")

@socketio.on('connect')
def handle_connect():
    print("Client connected.")
    emit('message', {"message": "Connected to the chatbot server."})

@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected.")

@socketio.on_error_default
def default_error_handler(e):
    logging.error(f"Socket.IO error: {e}")

@socketio.on('message')
def handle_message(data):
    user_input = data.get("message", "")
    thread_id = data.get("thread_id", "")
    print(f"< {user_input}")
    response = chatbot.generate_response(thread_id, user_input)
    print("*********************")
    print(f"Response: {response}")
    print("*********************")
    emit('message', {"message": response})
    print(f"> {response}")

@socketio.on('delete_thread')
def handle_thread(data):
    thread_id = data.get("thread_id", "")
    chatbot.delete_conversation(thread_id)
    print(f"{thread_id}: Thread deleted.")
    # Emit a response to the client
    emit('delete_thread_response', {"thread_id": thread_id, 
                                    "message": f"Thread {thread_id} has been deleted."})

if __name__ == "__main__":
    socketio.run(app, host="localhost", port=8765, debug=True, use_reloader=False)
