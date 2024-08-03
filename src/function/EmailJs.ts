import emailjs from 'emailjs-com';
import { feedbackType } from './util';

// service_b7y6qv9
// template_bd4u3be
// wf9WwClooysV80e15

export async function sendEmail(Data: feedbackType) {
    try {
        const templateParams = {
            to_email: 'alannixon2005@gmail.com',
            subject: 'feedback',
            from_name: Data.Name,
            to_name: 'Alan Nixon',
            message: Data.Feedback
        };

        const result = await emailjs.send(
            'service_b7y6qv9',
            'template_1kwovr4',
            templateParams,
            'wf9WwClooysV80e15'
        );

        console.log('Email sent successfully:', result.text);
    } catch (err) {
        console.error('Error sending email:', err);
    }
}
