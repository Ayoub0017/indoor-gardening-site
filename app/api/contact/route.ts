export const dynamic = 'force-dynamic'; // Defaults to auto, but for API routes usually dynamic if reading req

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation (Basic)
        if (!body.name || !body.email || !body.message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Here you would typically send an email using Resend, SendGrid, etc.
        // For now, we'll simulate a success
        console.log('Contact Form Submission:', body);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
