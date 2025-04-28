import { createTransport } from "nodemailer"

const transport = createTransport({
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    secure: true,
})

export const sendMail = async (emails: string[], trackingId: string) => {
    const trackingUrl = `${Bun.env.BASE_URL}/api/v1/track-mail/${trackingId}`
    const mailOptions = {
        from: Bun.env.SMTP_USER,
        to: emails.join(','),
        subject: 'Tracking Email(dead pixel)',
        text: `your tracking id is ${trackingId}`,
        html: `
            <html>
                <body>
                    <h1>Hello 👋</h1>
                    <p>Your tracking ID is <strong>${trackingId}</strong>.</p>
                    <img src="${trackingUrl}" alt="Dead Pixel" style="display:none;" />
                </body>
            </html> 
        `,
    }
    try {
        await transport.sendMail(mailOptions)
    } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send email')
    }
}