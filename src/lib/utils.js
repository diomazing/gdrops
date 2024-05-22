import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function camelCaseToNormal(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Handles lowercase followed by uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2"); // Handles consecutive uppercase
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
