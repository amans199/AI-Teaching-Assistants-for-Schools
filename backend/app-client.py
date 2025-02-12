import socketio
import threading

# Create a Socket.IO client instance
sio = socketio.Client()

# Event to signal when a server response has been received
response_received = threading.Event()

@sio.event
def connect():
    print("Connected to server")

@sio.event
def message(data):
    # Print the server's response
    print(f"\nAssistant: {data['message']}\n")
    # Signal that a response has been received
    response_received.set()

@sio.event
def delete_thread_response(data):
    # Handle the 'delete_thread_response' event
    thread_id = data.get("thread_id", "")
    message = data.get("message", "")
    print(f"\n{message}\n")
    # Signal that a response has been received
    response_received.set()

@sio.event
def disconnect():
    print("Disconnected from server")

# Function to handle user input
def input_thread():
    while True:
        # Wait for the server's response before prompting for the next input
        response_received.wait()

        user_input = input("Enter your message (or 'quit' to exit): ")

        # Handle 'delete thread' command
        if user_input.lower() == "delete thread":
            print("Deleting the previous conversation.")
            sio.emit('delete_thread', {"thread_id": "conversation_1"})
            response_received.clear()  # Reset the flag
            continue  # Skip the rest of the loop and prompt for the next input

        # Break the loop if the user types 'quit'
        if user_input.lower() == "quit":
            print("Exiting the conversation.")
            sio.disconnect()
            break

        # Send the message to the server
        sio.emit('message', {"message": user_input, "thread_id": "conversation_1"})

        # Reset the event to wait for the next response
        response_received.clear()

# Connect to the server
sio.connect('http://localhost:8765')

# Start the input thread
threading.Thread(target=input_thread, daemon=True).start()

# Keep the main thread alive to process WebSocket events
sio.wait()