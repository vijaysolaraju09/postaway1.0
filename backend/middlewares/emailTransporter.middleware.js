import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'webdev.by.adi@gmail.com',
        pass: 'rljn bnjg bvps grxa'
    }
});

export default transporter;