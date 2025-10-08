import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// export async function sendWelcomeEmail(email: string, firstName: string) {
//   try {
//     if (!resend) {
//       console.log('Resend not configured, skipping welcome email');
//       return { success: true, data: null };
//     }

//     const { data, error } = await resend.emails.send({
//       from: 'Prime Aura Asset Management <onboarding@resend.dev>',
//       to: [email],
//       subject: 'Welcome to Prime Aura Asset Management! 🎉',
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <div style="text-align: center; margin-bottom: 30px;">
//             <h1 style="color: #7c3aed; font-size: 28px; margin-bottom: 10px;">
//               Welcome to Prime Aura Asset Management!
//             </h1>
//             <p style="color: #666; font-size: 16px;">
//               Your account has been successfully created and your subscription is now active.
//             </p>
//           </div>
          
//           <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
//             <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">Hello ${firstName}! 👋</h2>
//             <p style="color: #555; line-height: 1.6; margin-bottom: 15px;">
//               Thank you for joining Prime Aura Asset Management. You now have access to our institutional-grade trading signals and algorithms.
//             </p>
//             <p style="color: #555; line-height: 1.6;">
//               Your subscription is active and you can start using our services immediately.
//             </p>
//           </div>
          
//           <div style="background: #7c3aed; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
//             <h3 style="margin: 0 0 10px 0; font-size: 18px;">🚀 Get Started Now</h3>
//             <p style="margin: 0; opacity: 0.9;">
//               Access your dashboard and start trading with confidence
//             </p>
//           </div>
          
//           <div style="text-align: center; margin-top: 30px;">
//             <a href="${process.env.NEXT_PUBLIC_SITE_URL}" 
//                style="background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
//               Go to Dashboard
//             </a>
//           </div>
          
//           <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
//             <p>If you have any questions, please don't hesitate to contact our support team.</p>
//             <p>© 2025 Prime Aura Asset Management. All rights reserved.</p>
//           </div>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error('Failed to send welcome email:', error);
//       return { success: false, error };
//     }

//     console.log('Welcome email sent successfully:', data);
//     return { success: true, data };
//   } catch (error) {
//     console.error('Error sending welcome email:', error);
//     return { success: false, error };
//   }
// }

export async function sendPaymentNotificationEmail(userEmail: string, firstName: string, lastName: string, amount: number = 99) {
  try {
    if (!resend) {
      console.log('Resend not configured, skipping payment notification email');
      return { success: true, data: null };
    }

    const serverEmail = process.env.SERVER_EMAIL || 'admin@primeaura.com';
    
    const { data, error } = await resend.emails.send({
      from: 'THOR Signals <onboarding@resend.dev>',
      to: [serverEmail],
      subject: `💰 New Payment Received - $${amount} from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; font-size: 28px; margin-bottom: 10px;">
              💰 New Payment Received!
            </h1>
            <p style="color: #666; font-size: 16px;">
              A user has successfully paid for their subscription.
            </p>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #166534; font-size: 20px; margin-bottom: 15px;">Payment Details</h2>
            <div style="color: #166534; line-height: 1.8;">
              <p><strong>Customer Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Customer Email:</strong> ${userEmail}</p>
              <p><strong>Amount Paid:</strong> $${amount}</p>
              <p><strong>Plan:</strong> THOR Signal Indicator</p>
              <p><strong>Payment Date (UTC timezone):</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Payment Time (UTC timezone):</strong> ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #fde68a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px;">📋 Next Steps</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li>User account has been automatically created</li>
              <li>Subscription is now active</li>
              <li>Welcome email has been sent to the customer</li>
              <li>User can now access the dashboard</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>This is an automated notification from THOR Signals.</p>
            <p>© 2025 THOR Signals. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Failed to send payment notification email:', error);
      return { success: false, error };
    }

    console.log('Payment notification email sent successfully to:', serverEmail);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending payment notification email:', error);
    return { success: false, error };
  }
}

export async function sendContactEmail(payload: {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}) {
  try {
    // Basic email validation to surface client issues earlier
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(payload.email)) {
      const error = new Error('Invalid email address format') as any
      ;(error as any).statusCode = 422
      throw error
    }
    if (!resend) {
      console.log('Resend not configured, skipping contact email')
      return { success: true, data: null }
    }

    const serverEmail = process.env.SERVER_EMAIL || 'admin@primeaura.com'

    const { data, error } = await resend.emails.send({
      from: 'THOR Signals <onboarding@resend.dev>',
      to: [serverEmail],
      replyTo: `${payload.firstName} ${payload.lastName} <${payload.email}>`,
      subject: `📬 Contact Form: ${payload.subject || 'New Message'} from ${payload.firstName} ${payload.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #7c3aed; font-size: 24px; margin: 0;">New Contact Message</h1>
            <p style="color: #666; font-size: 14px;">Received via website contact form</p>
          </div>
          <div style="background: #0f172a; color: #e5e7eb; border: 1px solid #1f2937; padding: 16px; border-radius: 8px;">
            <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
            <p><strong>Email:</strong> ${payload.email}</p>
            <p><strong>Subject:</strong> ${payload.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-wrap; background:#111827; padding:12px; border-radius:8px; border:1px solid #1f2937;">${payload.message}</div>
          </div>
          <p style="color:#6b7280; font-size:12px; text-align:center; margin-top:16px;">© 2025 THOR Signals</p>
        </div>
      `,
    })

    if (error) {
      console.error('Failed to send contact email:', error)
      return { success: false, error }
    }

    console.log('Contact email sent to:', serverEmail)
    return { success: true, data }
  } catch (error) {
    console.error('Error sending contact email:', error)
    return { success: false, error }
  }
}