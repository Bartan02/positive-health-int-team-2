export async function startActivity(userId, startLocation) {
    const response = await fetch('http://localhost:3015/start/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, startLocation })
    });
    return response.json();
}