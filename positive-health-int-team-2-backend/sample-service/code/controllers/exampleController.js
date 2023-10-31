export async function responseExample(req, res) {
  res.status(200).send('everything went well');
}

export async function updateExample(req, res) {
  let body = req.body;
  res.status(200).send(`Hi 🤭; I got this data: ${JSON.stringify(body)}?`);
}
