
export const getErrorMessageFromResponse = (error: any) => {
    if (error?.response && error?.response?.data) {
        const { messages } = error.response.data;
        const firstMessage = messages.shift();
        return Promise.reject(new Error(firstMessage))
      } else {
        return Promise.reject(new Error('Algo deu errado'))
      }
}