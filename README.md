# Titan Alarm & Electronics

A responsive Next.js website for a security installation and support company.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and configure email delivery (details below).
3. Start the development server with `npm run dev`.

## Contact form email delivery

Both quote requests and general contact messages are sent through [Resend](https://resend.com/). Configure these environment variables in `.env.local` and in the production hosting environment:

- `RESEND_API_KEY`: a Resend API key authorized to send email.
- `CONTACT_EMAIL`: the inbox that should receive form submissions.
- `RESEND_FROM_EMAIL`: a sender address verified in Resend.

Until these values are configured, the form returns an explicit unavailable message and displays the phone number as an alternate contact option; submissions are not stored. The public forms include required-field validation and a honeypot field. Production deployment should also apply provider/platform-level request rate limiting and configure a verified sender domain.

Before launch, replace the example brand contact details, service-area language, and domain (`titansecure.com`) with the company’s real information. The project gallery currently contains illustrative stock photography and sample concepts, not completed customer installations. Replace these with actual work and publish photos only with written customer permission; do not publish sensitive security details.
