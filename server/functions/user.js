import nodemailer from 'nodemailer'
import { emailId, password } from '../private.js'


export const getOTP = async (targetEmail) => {

    console.log(targetEmail);
    let regex = /^([a-z0-9\.-_]+)@([a-z0-9]+).([a-z]{2,7})(.[a-z]{2,7})?$/;
    let otp;
    if (regex.test(targetEmail)) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailId,
                pass: password
            }
        });
        const randomInt = () => {
            let low = 100000, high = 999999;
            return Math.floor(Math.random() * (high - low + 1) + low);
        }
        otp = randomInt();
        var mailOptions = {
            from: 'no-replay@gmail.com',
            to: targetEmail,
            subject: 'email verification OTP',
            html: `<img src='' alt='miligram logo'>
                    <h4> Welcome to miliGram </h4>
                    <p> 
                        Your otp for email verification is 
                        <span style="color:crimson">${otp}</span>
                    </p>
                    <p>
                        Enjoy this miliGram insta-clone web app,
                        and please give few second to leave your feedback
                        on app feedback section you are welcome there.
                    </p>`
        };
        await transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                otp = -1;
            }
        });
    } else {
        otp = 0;
    }
    return otp;
}