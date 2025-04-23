import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names.
 *
 * @param inputs the class names to merge
 * @returns the merged class names
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
