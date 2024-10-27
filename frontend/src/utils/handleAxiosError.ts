const handleAxiosError = (error: any) => {
  if (error.response) {
    return {error: error.response.data.message}
  }
  return {error: "There is an error"};
}

export default handleAxiosError;