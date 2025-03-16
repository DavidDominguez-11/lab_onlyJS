const getMessages = async () => {
    const responce = await fetch('https://chat.calicheoficial.lat/messages')
    return await responce.json()

}
const postMessages = async (message) => {
    const body = JSON.stringify(message)
    const responce = await fetch(
        'https://chat.calicheoficial.lat/messages', 
        {
            method: 'POST',
            body
        }
    )
    return await responce.json()
}

const main = async () => {

}

main()