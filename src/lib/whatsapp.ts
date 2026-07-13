// Builds a wa.me deep link that opens a chat with the given number and a
// prefilled message. `number` should be digits only (country code + number,
// no "+" or spaces) — exactly what WHATSAPP_NUMBER in .env is documented to be.
export function buildWhatsAppLink(number: string, message: string) {
  const digitsOnly = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
