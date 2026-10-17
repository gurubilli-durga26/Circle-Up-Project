export function errorMiddleware(err, req, res, next) {
  console.error(err);

  if (err?.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err?.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");

    return res.status(400).json({
      success: false,
      message,
    });
  }

  const status = err.statusCode || 500;

  return res.status(status).json({
    success: false,
    message: err.message || "Server error",
  });
}
