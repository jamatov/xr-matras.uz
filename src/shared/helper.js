import axios from "axios";
import { MATTRESS_BOT_TOKEN, MATTRESS_CHAT_ID } from "./types";
import { toast } from "react-toastify";

export const getCorrectMattressType = (type) => {
  switch (type) {
    case "ANATOMOCHEKIE":
      return "Анатомический";
    case "TOPPER":
      return "Топпер";
    case "MILANO":
      return "Милано";
    case "SOFT_MEMRI":
      return "Софт мемри";
    case "PREMIUM":
      return "Премиум";
    case "ARTAPEDIK":
      return "Ортопедические";
    default:
      return "";
  }
};

export const getFilteredSizes = (id, sizes) => {
  const filteredSizes = sizes.filter((size) => size.mattressId === id);
  return filteredSizes;
};

export const numberFormat = (x, currency = "uzs") => {
  return `${x.toLocaleString({ currency })} ${currency.toUpperCase()}`;
};

export const sendFeedback = async ({
  userName,
  phone,
  name,
  type,
  size,
  price,
}) => {
  const text =
    !!name && !!type && !!size && !!price
      ? `Name: ${userName}.%0APhone number: ${phone}.%0AMatras name: ${name}.%0AMatras type: ${getCorrectMattressType(
          type
        )}.%0AMatras size: ${size}.%0AMatras price: ${price}.`
      : `Name: ${userName}.%0APhone number: ${phone}.`;
  await axios
    .post(
      `https://api.telegram.org/bot${MATTRESS_BOT_TOKEN}/sendMessage?chat_id=${MATTRESS_CHAT_ID}&text=${text}`
    )
    .then(() => {
      toast.success("Success!");
    })
    .catch(() => {
      toast.error("Internal server error");
    });
};
