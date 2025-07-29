export const formatCategoryTitle = (title) => {
  // Guard clause: If the title is empty or invalid, return an empty string.
  if (!title) return "";

  // Handle special cases first
  if (title.toLowerCase() === "no categorizado") {
    return "No categorizado"; // Specific formatting for this case
  }

  // Handle acronyms (all uppercase and short)
  if (title.length <= 3 && title === title.toUpperCase()) {
    return title; // Returns "DNI", "POA", "RAS" as is.
  }

  // Default case: Capitalize the first letter, lowercase the rest.
  // This will handle "VOUCHER" -> "Voucher"
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};
