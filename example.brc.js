export default {
  key: "XXXXXXXXX",
  baseURL: "https://example.com/api/v1/",
  headers: {
    'Key': 'Value'
  },
  dateFormat: 'YY-MM-DD',
  endpoints:{
    getBookings: {
      methodType: "GET",
      url: "bookings"
    }
  }
}