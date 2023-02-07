import excuteQuery from "../../../lib/db";

/* Database Variables */

// userId, username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status

export default async function handler(req, res) {
  
  if(req.method === 'GET') {

  } else if(req.method === 'POST') {

    
    const date = req.body.date;
    const time = req.body.time;
    const status = req.body.status;
    const paid = req.body.paid;
    const userId = req.body.userId;

  
    try {
      const result = await excuteQuery({
        query: 'INSERT INTO reservations (date, time, status, paid, userId) VALUES(?, ?, ?, ?, ?)',                                                                 
        values: [date, time, status, paid, userId]
      });

      const data = {
        success: true,
        data: result 
      };

      res.status(200).json(data);
      
    } catch(error) {
    
      const data = {
        success: false,
        data: {}
      };

      res.status(200).json(data);

    }
    
  
  } else if(req.method === 'PUT') {
  

    
    const status = req.body.status;
    const paid = req.body.paid;
    const reservationId = req.body.reservationId;

  
    try {
      const result = await excuteQuery({
        query: 'UPDATE reservations SET status=?, paid=? WHERE reservationId=?',                                                                 
        values: [status, paid, reservationId]
      });

      const data = {
        success: true,
        data: result 
      };

      res.status(200).json(data);
      
    } catch(error) {
    
      const data = {
        success: false,
        data: {}
      };

      res.status(200).json(data);

    }

    
  } else if(req.method === 'DELETE') {
    
    
  }

}
