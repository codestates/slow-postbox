module.exports = {
  getTomorrow: () => {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    return tomorrow;
  },
};
