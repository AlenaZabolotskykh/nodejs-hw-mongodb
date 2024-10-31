export const notFoundHandlers = (req, res) => {
  res.status(404).json({
    message: 'Contact not found',
  });
};
