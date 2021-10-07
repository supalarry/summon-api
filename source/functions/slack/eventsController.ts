import Logger from '../../services/logger';

const NAMESPACE = 'eventsController';

export default function processRequest(body: any): void {
    const type = body.event.type;
    Logger.info(NAMESPACE, `Start processing request of type: ${type}`);
    if (type === 'message') {
        console.log('call prcoessMessages');
        prcoessMessages(body);
    }
}

function prcoessMessages(body: any) {
    Logger.info(NAMESPACE, 'Start processing messages request');
    console.log('message', body.event.text);
}
