const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db');
const cors = require('cors');
const axios = require('axios');
const sendTicketEmail = require("./email");
const crypto = require("crypto");
const { log } = require('console');

// enable CORS
dotenv.config();
// setup express
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT;
const validateTickets = ["Regular", "VIP", "Premium"];

// routes 
app.get("/api", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
        console.log("result", result.rows);
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        })

    }
})

app.post("/api/register", async (req, res) => {
    const { name, email, ticket, phone } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.match(emailRegex)) {
        return res.status(400).json({
            success: false,
            message: "Valid email is required"
        })
    }

    if (!ticket) {
        return res.status(400).json({
            success: false,
            message: "Ticket is required"
        })
    }

    if (!validateTickets.includes(ticket.trim())) {
        return res.status(400).json({
            message: "Invalid ticket type",
            success: false
        })
    }
    const phoneRegex = /^0\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: "Valid phone number is required"
        })
    }

    //  to check if the email already exists in the database
    const existingUser = await pool.query(
        "SELECT * FROM registrations WHERE email = $1::text",
        [email]
    );

    if (existingUser.rows.length > 0) {
        return res.status(409).json({
            success: false,
            message: "Email is already registered"
        });
    }

    // save the data to the database
    try {
        const result = await pool.query(
            `INSERT INTO registrations (name, email, phone, ticket)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
            [name, email, phone, ticket]
        )
        res.json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

        // to see my data in the terminal 
        console.log(req.body);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to register user"
        })
    }


})
// get all registrations from database postgress
app.get("/api/registrations", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM registrations");
        res.status(200).json({
            success: true,
            message: "All Registrations Retrieved",
            data: result.rows
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to Retrieve All Registration"
        })
    }

})

// get all paid registrations from database postgress
app.get("/api/registrations/paid", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, phone, ticket, payment_reference, amount, created_at
             FROM registrations
             WHERE payment_status = $1::text
             ORDER BY created_at DESC`,
            ["success"]
        );

        res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch paid registrations"
        });
    }
});

// get registration by id from database postgress
app.get("/api/registrations/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("SELECT * FROM registrations WHERE id = $1", [id])

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Registration not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Registration Retrieved",
            data: result.rows[0]
        })


    }
    catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Failed to Retrieve Registration"
        })
    }
})

// delete registration by id from database postgress
app.delete("/api/registrations/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM registrations WHERE id = $1", [id])

        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration was not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Registration deleted successfully",

        })
    }


    catch (error) {
        res.status(500).json({
            success: false,
            message: "Fail to delete Registration"
        })
    }
})

app.put("/api/registrations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, ticket } = req.body;

        if (!name || !email || !phone || !ticket) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!validateTickets.includes(ticket)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ticket type"
            })
        }

        // NAME VALIDATION
        if (!name || name.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        // EMAIL VALIDATION
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Valid email is required"
            });
        }

        // PHONE VALIDATION
        const phoneRegex = /^0\d{10}$/;

        if (!phone || !phoneRegex.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Valid Nigerian phone number is required"
            });
        }

        // TICKET VALIDATION
        if (!ticket || ticket.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Ticket is required"
            });
        }

        if (!validateTickets.includes(ticket.trim())) {
            return res.status(400).json({
                success: false,
                message: "Invalid ticket type"
            });
        }

        const result = await pool.query(
            `UPDATE registrations
             SET name = $1,
             email = $2,
             phone = $3,
            ticket = $4
            WHERE id = $5`,
            [name, email, phone, ticket, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Registration not Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Registration updated successfully"
        })
    }

    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to update Registration"
        })
    }
})


//  initialize paystack payment
app.post("/api/payment/initialize", async (req, res) => {
    try {
        const { email, ticket } = req.body;

        // console.log("BODY:", req.body);
        //    const { email, ticket } = req.body || {};

        const ticketPrices = {
            Regular: 20000,
            VIP: 50000,
            Premium: 100000
        };

        if (!email || !ticket) {
            return res.status(400).json({
                success: false,
                message: "Email and ticket are required "
            })
        };

        if (!ticketPrices[ticket]) {
            return res.status(400).json({
                success: false,
                message: "Invalid ticket type"
            })
        };

        const response = await axios.post("https://api.paystack.co/transaction/initialize",
            {
                email: email,
                amount: ticketPrices[ticket]
            },

            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            },)

        res.status(200).json({
            success: true,
            message: "payment initialized successfully",
            data: response.data.data
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to initialize payment"
        })
    }
})

function generateTicketId() {
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `TC-${randomPart}`;
}
/// verify paystack payment
app.post("/api/payment/verify/:reference", async (req, res) => {
    
    try {
        const { reference } = req.params;
        const { name, email, phone, ticket } = req.body;

        // Check that all registration details were provided
        if (!name || !email || !phone || !ticket) {
            return res.status(400).json({
                success: false,
                message: "Name, email, phone and ticket are required"
            });
        }

        if (!reference) {
            return res.status(400).json({
                success: false,
                message: "Payment Reference is required "
            })
        }
        // ask paystack to verify the payment
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        //  return payment data to the client
        const paymentData = response.data.data;
        console.log("PAYSTACK PAYMENT DATA:", paymentData);

        //  ask paystack if the payment is succesful
        if (paymentData.status !== "success") {
            return res.status(400).json({
                success: false,
                message: "Payment was not successful"
            })
        }
       // Check if this payment has already been processed
const existingPayment = await pool.query(
    "SELECT * FROM registrations WHERE payment_reference = $1",
    [paymentData.reference]
);
 
if (existingPayment.rows.length > 0) {
    return res.status(409).json({
        success: false,
        message: "This payment has already been processed",
        data: existingPayment.rows[0]
    });
}
          const ticketId = generateTicketId();

        // Save registration and payment details in PostgreSQL
        const result = await pool.query(
            `INSERT INTO registrations
            (name, email, phone, ticket, payment_reference, payment_status, amount, ticket_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [
                name,
                email,
                phone,
                ticket,
                paymentData.reference,
                paymentData.status,
                paymentData.amount / 100, // convert amount from kobo to naira
                ticketId
            ]
        );


      try {
          // Send ticket email
        await sendTicketEmail({
            name,
            email,
            ticket,
            amount: paymentData.amount / 100,
            reference: paymentData.reference,
            ticketId
        });
           console.log("Ticket has been sent to  email  successfully");
      } catch (error) {
        console.log("Ticket email failed", error.message)
      }

        res.status(200).json({
            success: true,
            message: "Payment verified and registration saved successfully",
            data: result.rows[0]
        });

    } catch (error) {
        console.log(error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        })
    }
})

// to verify ticket id 
app.get("/api/tickets/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;

        const result = await pool.query(
            `SELECT id, name, email, ticket, amount, payment_status, ticket_id, ticket_used
             FROM registrations
             WHERE ticket_id = $1`,
            [ticketId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            });
        }

        const ticket = result.rows[0];

        if (ticket.payment_status !== "success") {
            return res.status(400).json({
                success: false,
                message: "This ticket does not have a successful payment"
            });
        }

        res.status(200).json({
            success: true,
            message: "Valid TechConnect ticket",
            data: ticket
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Unable to verify ticket"
        });
    }
});




// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})