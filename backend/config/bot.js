import { Telegraf } from 'telegraf';
import Product from '../models/Product.js';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

const bot = new Telegraf('7786553835:AAHn3PPyLoyBUOTckFvykwHSDAJn7lf04k0');


// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const StartBot = () => {
    const userInputs = {};

    bot.start((ctx) => {
        const chatId = ctx.chat.id;
        userInputs[chatId] = {}; // Initialize an empty object to store product details
        ctx.reply('Welcome! Let’s add a new product. What is the product name?');
    });

    bot.on('text', async (ctx) => {
        const chatId = ctx.chat.id;
        const message = ctx.message.text;

        if (!userInputs[chatId].name) {
            userInputs[chatId].name = message;
            ctx.reply('Please enter the product description:');
        } else if (!userInputs[chatId].description) {
            userInputs[chatId].description = message;
            ctx.reply('Enter the regular price:');
        } else if (!userInputs[chatId].regularPrice) {
            userInputs[chatId].regularPrice = message;
            ctx.reply('Enter the discount percent:');
        } else if (!userInputs[chatId].discountPercent) {
            userInputs[chatId].discountPercent = message;
            ctx.reply('How many items are in stock?');
        } else if (!userInputs[chatId].numberInStock) {
            userInputs[chatId].numberInStock = parseInt(message);
            ctx.reply('Specify the cloth type (e.g., jeans, tshirt, sweaters, etc.):');
        } else if (!userInputs[chatId].clothType) {
            if (['jeans', 'tshirt', 'sweaters', 'pants', 'shoes', 'pajamas', 'socks'].includes(message.toLowerCase())) {
                userInputs[chatId].clothType = message.toLowerCase();
                ctx.reply('Specify the type (boy, girl, or baby):');
            } else {
                ctx.reply('Invalid cloth type. Please enter one of the following: jeans, tshirt, sweaters, pants, shoes, pajamas, socks.');
            }
        } else if (!userInputs[chatId].type) {
            if (['boy', 'girl', 'baby'].includes(message.toLowerCase())) {
                userInputs[chatId].type = message.toLowerCase();
                ctx.reply('Please upload the product images. Send "done" when you finish uploading all images.');
            } else {
                ctx.reply('Invalid type. Please enter one of the following: boy, girl, or baby.');
            }
        } else if (message.toLowerCase() === 'done') {
            // Check if images were uploaded
            if (userInputs[chatId].imageURLs && userInputs[chatId].imageURLs.length > 0) {
                // Save to MongoDB
                try {
                    const product = new Product(userInputs[chatId]);
                    await product.save();
                    ctx.reply('Product saved successfully!');
                    delete userInputs[chatId]; // Clear temporary data
                } catch (error) {
                    console.error('Error saving product to MongoDB:', error);
                    ctx.reply('There was an error saving the product. Please try again.');
                }
            } else {
                ctx.reply('No images uploaded yet. Please upload images or type "done" when finished.');
            }
        } else {
            ctx.reply('Please type "done" once you have uploaded all images.');
        }
    });

    bot.on('photo', async (ctx) => {
        const chatId = ctx.chat.id;
        if (!userInputs[chatId].imageURLs) {
            userInputs[chatId].imageURLs = [];
        }

        const fileId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

        try {
            const file = await bot.telegram.getFile(fileId);
            const fileLink = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;

            // Upload to Cloudinary
            const uploadedImage = await uploadToCloudinary(fileLink);

            // Save the Cloudinary URL
            userInputs[chatId].imageURLs.push(uploadedImage.secure_url);

            ctx.reply('Image uploaded successfully. Send more images or type "done" if you are finished.');
        } catch (error) {
            console.error('Error handling image:', error);
            ctx.reply('Failed to process the image. Please try uploading it again.');
        }
    });

    bot.launch();
};

// Function to upload image to Cloudinary
async function uploadToCloudinary(fileLink) {
    try {
        const response = await axios({
            url: fileLink,
            method: 'GET',
            responseType: 'arraybuffer',
        });

        return await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: 'telegram_bot_images' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            ).end(response.data);
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}