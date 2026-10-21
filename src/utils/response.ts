export const LOG = {
  info: (message: any, data: any, res: any, success: any, status_code: any) => {
    return res.status(200).json({ message, data, success, status_code });
  },
  error: (
    message: any,
    data: any,
    error: any,
    res: any,
    success: any,
    status_code: any,
  ) => {
    console.error(error);
    return res.status(500).json({ message, data, success, status_code });
  },
};
