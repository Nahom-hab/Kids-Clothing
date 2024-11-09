import axios from "axios";


const TELEGRAM_API_TOKEN = '7786553835:AAHn3PPyLoyBUOTckFvykwHSDAJn7lf04k0';
const CHAT_ID = '667605413';

export const sendMessage = async (req, res) => {

    try {
        const messages = req.body;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `order from Name:${messages.name}
                             Phone Number:${messages.phone}
                             Adress:${messages.address}
            `,
        });

        const mediaGroup = messages.data.map((image) => ({
            type: 'photo',
            media: image.imageURLs[0],
        }));
        console.log(mediaGroup);

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`, {
            chat_id: CHAT_ID,
            media: mediaGroup,
        })

        let total = 0
        for (let i = 0; i < messages.data.length; i++) {
            total += (parseInt(messages.data[i].quantity) * parseInt(messages.data[i].regularPrice))
            let telegramMessage = `
                
                - Cloth name: ${messages.data[i].name}
                -  ${messages.data[i].quantity} X ${messages.data[i].regularPrice} = ${parseInt(messages.data[i].quantity) * parseInt(messages.data[i].regularPrice)}ETB
                `;

            await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
                chat_id: CHAT_ID,
                text: telegramMessage
            });

        }
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `total Order ${total} ETB`,
        });



        res.status(200).json({ message: 'Message and image sent to Telegram' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message or image to Telegram', error: error.message });
        console.log(error.message);

    }
}



export const sendUserFeedBack = async (req, res) => {

    try {

        const messages = req.body;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: `
            Message From user:
        
            Name: ${messages.name}
            Phone Number: ${messages.phone}
            Message: ${messages.message}
            `,
        });

        res.status(200).json({ message: 'Message and image sent to Telegram' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message or image to Telegram', error: error.message });
        console.log(error.message);

    }
}





