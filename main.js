const getMessages = async () => {
    try {
        const response = await fetch('https://chat.calicheoficial.lat/messages');
        return await response.json();
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

const postMessages = async (message) => {
    try {
        const body = JSON.stringify(message);
        await fetch('https://chat.calicheoficial.lat/messages', {
            method: 'POST',
            body
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const drawMessages = async (ul) => {
    ul.innerHTML = ''; // Limpiar la lista antes de actualizar
    const messages = await getMessages();

    messages.forEach((message) => {
        const li = document.createElement('li');

        const user = document.createElement('span');
        user.append(`${message.user}: `);

        const text = document.createElement('span');
        text.append(message.text);

        li.append(user);
        li.append(text);
        
        ul.append(li);
    });
};

const drawMessagesContainer = async () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');

    //div.style.height = "200px";

    h1.append('Messages');
    h1.style.textAlign = 'center';

    const ul = document.createElement('ul');

    // estilos pantalla de mensajes
    ul.style.width = '80%';
    ul.style.height = '60vh';
    ul.style.overflowY = 'auto'; //scroll 
    ul.style.border = '5px solid black';
    ul.style.borderRadius = '10px';
    ul.style.padding = '10px';
    ul.style.margin = 'auto';
    ul.style.display = 'block';

    await drawMessages(ul); // Llenar la lista inicialmente

    div.append(h1);
    div.append(ul);

    document.body.append(div);
    return ul; // Retornamos la referencia de la lista para actualizarla después
};

const drawInput = async (ul) => {
    const divify = document.createElement('div');
    const textarea = document.createElement('textarea');

    const button = document.createElement('button');
    button.append('SEND MESSAGE');
    button.onclick = async () => {
        const message = {
            text: textarea.value,
            user: 'David'
        };
        await postMessages(message);
        textarea.value = ''; // Limpia el textarea
        drawMessages(ul); // Refresca la lista de mensajes sin duplicarlos
    };

    divify.append(textarea);
    divify.append(button);

    document.body.append(divify);
};

const main = async () => {
    const ul = await drawMessagesContainer(); // Guardamos la referencia de la lista
    await drawInput(ul); // Pasamos la referencia para actualizar la misma lista
};

main();
