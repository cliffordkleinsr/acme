import { SECRET_TWILIO_ACCOUNT_SID, SECRET_TWILIO_AUTH_TOKEN } from '$env/static/private';
import twilio from 'twilio';

const client = twilio(SECRET_TWILIO_ACCOUNT_SID, SECRET_TWILIO_AUTH_TOKEN);

export { client };
