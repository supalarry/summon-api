export default function processRequest(body: any): void {
    const type = body.event.type;
    if (type === 'message') {
        prcoessMessages(body);
    }
}

function prcoessMessages(body: any) {
    console.log('message', body.event.text);
}