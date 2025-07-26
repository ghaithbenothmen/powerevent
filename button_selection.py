import paho.mqtt.client as mqtt

broker = "192.168.1.180"
port = 1883
response_list=list("111")
response=""

def on_connect(client, userdata, flags, rc):
   # print("Connected to MQTT broker")
    client.subscribe("button_selection")

def publish_response():
    response="".join(response_list)
    client.publish("button_selection", response)
    
def on_message(client, userdata, msg):
    message = msg.payload.decode("utf-8")
    #print("Received message:", message)
    if message == "init":
         publish_response()
    elif message == "enablej1":
        response_list[0] = '1'
        publish_response()
    elif message == "disablej1":
        response_list[0] = '0'
        publish_response()
    elif message == "enablej2":
        response_list[1] = '1'
        publish_response()
    elif message == "disablej2":
        response_list[1] = '0'
        publish_response()
    elif message == "enablej3":
        response_list[2] = '1'
        publish_response()
    elif message == "disablej3":
        response_list[2] = '0'
        publish_response()
        
    

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect(broker, port)
client.loop_start()

try:
    while True:
        pass
except KeyboardInterrupt:
    pass

client.disconnect()
