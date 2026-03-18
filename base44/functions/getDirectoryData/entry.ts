Deno.serve(async (req) => {
    // This function ONLY returns a simple JSON object.
    const data = {
        message: "Hello from the NEW getDirectoryData API!",
        status: "Success",
        timestamp: new Date().toISOString()
    };

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*'); // Allow any website to call this

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: headers
    });
});