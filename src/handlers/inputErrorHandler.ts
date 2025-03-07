import { matchedData, validationResult } from "express-validator";

const inputErrorHandler = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const cleanData = matchedData(req);

  console.log(cleanData);

  res.status(400).json({ errors: result.array() });
};

export default inputErrorHandler;
