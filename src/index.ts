export class WebSocketEngine {
    #socket: WebSocket;

    constructor(address: String, port: number) {
        this.#socket = new WebSocket(`ws://${address}:${port}`);
    }

    send(tag: String, message: String) {
        this.#socket.send(tag + ":" + message);
    }

    async* listen(): AsyncGenerator<String> {
        const yieldMessage = (message: String) => yield message;

        this.#socket.addEventListener("message", e => {
            yieldMessage(e.data);
        })
    }
} 