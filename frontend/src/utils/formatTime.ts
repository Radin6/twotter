import { formatDistance } from "date-fns";

const formatTime = (dateToFormat: string) => {
  let formattedTime = "no date";

  // Validate date
  if (dateToFormat) {
    try {
      const postDate = new Date(dateToFormat);
      if (!isNaN(postDate.getTime())) {
        formattedTime = formatDistance(postDate, new Date(), { addSuffix: true });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }
  }

  return formattedTime;
}

export default formatTime;