const validateRow = (row) => {
  const { name, email, phone, age } = row;
  if (!name || typeof name !== "string")
    return { isValid: false, error: "Invalid or missing name" };
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    return { isValid: false, error: "Invalid email format" };
  if (phone && !/^\d{10}$/.test(phone))
    return { isValid: false, error: "Phone must be 10 digits" };
  if (age && isNaN(Number(age)))
    return { isValid: false, error: "Age must be a number" };

  return { isValid: true };
};

module.exports = { validateRow };
