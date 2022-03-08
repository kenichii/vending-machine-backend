// Success Response
const successResponseHandler = (res, message, result) => {
  const jsonResponse = { ...message, data: result };
  if (message && message.http_code) {
    return res.status(message.http_code || 200).json(jsonResponse);
  }
  return res.json(jsonResponse);
};

// Error Response
const errorResponseHandler = (res, err) => {
  if (err && err.error_code) {
    return res.status(err.http_code || 422).json(err);
  }
  return res.status(422).json({ message: err.message });
};

module.exports = { successResponseHandler, errorResponseHandler };
