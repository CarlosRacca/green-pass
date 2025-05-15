import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const sendWhatsApp = async (message) => {
  const instanceId = process.env.WHATSAPP_INSTANCE_ID;
  const token = process.env.WHATSAPP_TOKEN;
  const to = process.env.ADMIN_PHONE; // Número sin +

  try {
    await axios.post(`https://api.ultramsg.com/${instanceId}/messages/chat`, {
      to,
      body: message,
    }, {
      headers: { 'Content-Type': 'application/json' },
      params: { token },
    });
  } catch (error) {
    console.error('Error al enviar WhatsApp:', error.response?.data || error);
  }
};

export default sendWhatsApp;
