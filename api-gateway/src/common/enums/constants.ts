export enum RabbitMQQueue {
  USERS = 'users_queue',
  PASSENGER = 'passenger_queue',
  FLIGHT = 'flight_queue',
}
export enum UserMSG {
  CREATE_USER = 'CREATE-USER',
  FIND_ALL_USERS = 'FIND-ALL-USERS',
  FIND_USER_BY_ID = 'FIND-USER-BY-ID',
  UPDATE_USER = 'UPDATE-USER',
  DELETE_USER = 'DELETE-USER',
  VALID = 'VALID-USER',
}
export enum PassengerMSG {
  CREATE_PASSENGER = 'CREATE-PASSENGER',
  FIND_ALL_PASSENGERS = 'FIND-ALL-PASSENGERS',
  FIND_PASSENGER_BY_ID = 'FIND-PASSENGER-BY-ID',
  UPDATE_PASSENGER = 'UPDATE-PASSENGER',
  DELETE_PASSENGER = 'DELETE-PASSENGER',
}
export enum FlightMSG {
  CREATE_FLIGHT = 'CREATE-FLIGHT',
  FIND_ALL_FLIGHTS = 'FIND-ALL-FLIGHTS',
  FIND_FLIGHT_BY_ID = 'FIND-FLIGHT-BY-ID',
  UPDATE_FLIGHT = 'UPDATE-FLIGHT',
  DELETE_FLIGHT = 'DELETE-FLIGHT',
  ADD_PASSENGER = 'ADD-PASSENGER',
}
