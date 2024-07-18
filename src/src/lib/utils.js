import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const emailIsValid = (email) => {
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};