from flask import Flask, request
from flask_socketio import SocketIO, emit
import os
from dotenv import load_dotenv
from ai_assistant import Assistant
import logging

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

# Create an instance of the Assistant
assistant = Assistant(api_key=os.getenv("API_KEY"), base_url="https://api.aimlapi.com/v1", model="deepseek/deepseek-chat")

@socketio.on('connect')
def handle_connect():
    print("Client connected.")
    emit('message', {"message": "Connected to the assistant server."})

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
    response = assistant.generate_response(thread_id, user_input, temperature=0.5, top_p=0.9)
    if response:
        print("*********************")
        print(f"Response: {response}")
        print("*********************")
        emit('message', {"message": response})
        print(f"> {response}")
    else:
        print("LLM didn't generate the response")

@socketio.on('delete_thread')
def handle_thread(data):
    thread_id = data.get("thread_id", "")
    assistant.delete_conversation(thread_id)
    print(f"{thread_id}: Thread deleted.")
    # Emit a response to the client
    emit('delete_thread_response', {"thread_id": thread_id, 
                                    "message": f"Thread {thread_id} has been deleted."})

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=8765, debug=True, use_reloader=False)
