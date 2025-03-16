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

    // Guardar la posición actual del scroll antes de actualizar
    const scrollPosition = ul.scrollTop;
    const isAtBottom = ul.scrollHeight - ul.clientHeight <= scrollPosition + 10;

    messages.forEach((message) => {
        const li = document.createElement('li');

        const user = document.createElement('span');
        user.append(`${message.user}: `);

        const text = document.createElement('span');
        text.append(message.text);

        li.append(user);
        li.append(text);
        
        ul.append(li);

        // Restaurar la posición del scroll
    if (isAtBottom) {
        ul.scrollTop = ul.scrollHeight; // Mantiene el scroll abajo si ya estaba abajo
    } else {
        ul.scrollTop = scrollPosition; // Mantiene la posición anterior
    }
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

    // Estilos para el contenedor
    divify.style.display = 'flex';
    divify.style.flexDirection = 'column';
    divify.style.alignItems = 'center';
    divify.style.marginTop = '20px';
    divify.style.gap = '10px'; 

    const textarea = document.createElement('textarea');
    // Estilos para el textarea
    textarea.style.resize = 'none';
    textarea.style.width = '80%';
    textarea.style.height = '100px';
    textarea.style.border = '5px solid black';
    textarea.style.borderRadius = '10px';
    textarea.style.padding = '10px';
    textarea.style.fontSize = '16px';

    const button = document.createElement('button');
    button.append('SEND MESSAGE');

    // Estilos para el botn
    button.style.padding = '20px 20px';
    button.style.fontSize = '20px';
    button.style.backgroundColor = '#707070';
    button.style.color = 'white';
    button.style.border = '5px solid black';
    button.style.borderRadius = '10px';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s';

    // Efecto hover
    button.onmouseover = () => button.style.backgroundColor = '#3f3f3f';
    button.onmouseout = () => button.style.backgroundColor = '#707070';

    
    const sendMessage = async () => {

        // msg de menos 140
        const messageText = textarea.value;

        if (messageText.length > 140) {
            alert('El mensaje no puede exceder los 140 caracteres.');
            return;
        }

        const message = {
            text: textarea.value,
            user: 'David'
        };
        await postMessages(message);
        textarea.value = ''; // Limpia el textarea
        await drawMessages(ul); // Refresca los mensajes
    };

    // "Enter" para hacer submit
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // shift 
            e.preventDefault(); // Evitar el salto de linea
            sendMessage();
        }
    });

    // enviar con el btn
    button.onclick = sendMessage;

    divify.append(textarea);
    divify.append(button);

    document.body.append(divify);
};

const main = async () => {
    const ul = await drawMessagesContainer(); // Guardamos la referencia de la lista
    await drawInput(ul); // Pasamos la referencia para actualizar la misma lista

    // Auto-refresh cada 5 segundos
    setInterval(() => drawMessages(ul), 5000);

};

main();
