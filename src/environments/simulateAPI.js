const WebSocket = require('ws'); // load module WebSocket
const wss = new WebSocket.Server({ port: 8080 }); // Set the port to 8080
 
// function to generate random data
function generateRandomVehicleData() {
  return {
    camera: crypto.randomUUID(),
    timestamp: new Date().toString(),
    registrationNumber: 'QWE' + Math.floor(Math.random() * 1000),
    vehicleType: ['Car', 'Truck', 'Motorcycle'][Math.floor(Math.random() * 3)],
    brand: ['Audi', 'Ford', 'BMW', 'Toyota', 'Opel'][Math.floor(Math.random() * 5)],
    color: ['Blue', 'Green', 'Black', 'White'][Math.floor(Math.random() * 4)],
    location: 'Location-' + Math.floor(Math.random() * 100)
  };
}

wss.on('connection', ws => {
  console.log('Connected')
  // when a connection is established, setting an interval of 3000 ms to send real-time data
  const vehicleDataInterval = setInterval(() => {
    const vehicleData = generateRandomVehicleData();
    ws.send(JSON.stringify(vehicleData));
  }, 3000);

  ws.on('close', () => {
    console.log('Disconnected');
    clearInterval(vehicleDataInterval);  // Stop the interval when the client disconnects
  });
});

console.log('WebSocket server running on ws://localhost:8080');