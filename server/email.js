require("dotenv").config();
const { Resend } = require("resend");
const QRCode = require("qrcode");


const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTicketEmail({ name, email, ticket, amount, reference, ticketId }) {

    const verificationUrl = `${process.env.TICKET_BASE_URL}/api/tickets/${ticketId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl);

    const { data, error } = await resend.emails.send({
       from: `TechConnect Nigeria <${process.env.RESEND_FROM_EMAIL}>`,
        to: [email],
        subject: "Your TechConnect Nigeria 2027 Ticket",
        attachments: [
    {
        filename: "techconnect-ticket-qr.png",
        content: qrCodeDataUrl.split(",")[1],
        contentType: "image/png",
        contentId: "ticket-qr"
    }
],
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
                
                <h1>TECHCONNECT NIGERIA 2027</h1>
                
                <p>Building the future together</p>

                <hr>

                <h2>Registration Confirmed!</h2>

                <p>Hello ${name},</p>

                <p>
                    Your payment was successful and your registration
                    for TechConnect Nigeria 2027 has been confirmed.
                </p>

                <h3>Your Ticket Details</h3>

                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Ticket:</strong> ${ticket}</p>
                <p><strong>Amount Paid:</strong> ₦${amount}</p>
                <p><strong>Payment Reference:</strong> ${reference}</p>
                <p><strong>Ticket ID:</strong> ${ticketId}</p>
                     <div style="text-align: center; margin: 30px 0;">
             <p><strong>Scan to verify your ticket</strong></p>

           <img 
        src="cid:ticket-qr" 
        alt="TechConnect Ticket QR Code"
        width="200"
        height="200" >

    <p>
        Ticket ID: <strong>${ticketId}</strong>
    </p>
</div>
                <hr>

                <p>
                    Please keep this email as proof of your registration.
                </p>

                <p>
                    We look forward to seeing you at TechConnect Nigeria 2027.
                </p>

            </div>
        `
    });

    if (error) {
        console.log("Email error:", error);
        return { success: false, error }
    }

    console.log("Ticket email sent successfully:", data);
    return {
        success: true,
        data
    }
}



module.exports = sendTicketEmail;