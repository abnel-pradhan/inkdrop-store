export default function handler(req, res) {
  // This is where we will eventually send data to Qikink
  res.status(200).json({ 
    message: "Backend is online!", 
    time: new Date().toString() 
  });
}