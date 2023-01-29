import excuteQuery from "../../../lib/db";
import fetch from 'node-fetch';

const SERVICE_PLAN_ID = 'bada997d9b7548dc832c6d8453481af0';
const API_TOKEN = '39a977faef18433aa02af0a4d56c3e14';
const SINCH_NUMBER = '+447520652728';

async function run(number, message) {

  const resp = await fetch(
    'https://us.sms.api.sinch.com/xms/v1/' + SERVICE_PLAN_ID + '/batches',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_TOKEN
      },
      body: JSON.stringify({
        from: SINCH_NUMBER,
        to: [number],
        body: message
      })
    }
  );

  const data = await resp.json();
  console.log(data);
  
}

/* Database Variables */

// userId, username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status

export default async function handler(req, res) {
  
  if(req.method === 'GET') {

    const role = "user";
    try {

      const result = await excuteQuery({
        query: 'SELECT * FROM users LEFT JOIN prescriptions ON users.userId = prescriptions.userId WHERE role=?',                                                                 
        values: [role]
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

  } else if(req.method === 'POST') {

    const username = req.body.username;
    const password = req.body.password;
    const passwordText = req.body.passwordText;
    const role = req.body.role;
    const patientName = req.body.patientName;
    const patientAddress = req.body.patientAddress;
    const contactNumber = req.body.contactNumber;
    const gender = req.body.gender;
    const age = req.body.age;
    const emailAddress = req.body.emailAddress;
    const date = req.body.date;
    const status = req.body.status;

    try {

      const result = await excuteQuery({
        query: 'INSERT INTO users (username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',                                                                 
        values: [username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status]
      });

      const data = {
        success: true,
        data: result 
      };

      const message = "Username: " + username + " Password: " + passwordText;

      const sendText = await run(contactNumber, message);
      console.log(sendText);

      res.status(200).json(data);
      
    } catch(error) {
      

      const data = {
        success: false,
        data: {}
      };

      res.status(200).json(data);

    }
   
  } else if(req.method === 'PUT') {
    
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password;
    const passwordText = req.body.passwordText;
    const role = req.body.role;
    const patientName = req.body.patientName;
    const patientAddress = req.body.patientAddress;
    const contactNumber = req.body.contactNumber;
    const gender = req.body.gender;
    const age = req.body.age;
    const emailAddress = req.body.emailAddress;
    const date = req.body.date;
    const status = req.body.status;

    try {

      const result = await excuteQuery({
        query: 'UPDATE users SET patientName=?, patientAddress=?, contactNumber=?, gender=?, age=?, emailAddress=?, date=?, status=?  WHERE userId = ?',                                                                                  
        values: [patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status, userId]
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
    
    const userId = req.body.userId;

    try {

      const result = await excuteQuery({
        query: 'DELETE FROM users WHERE userId = ?',
        values: [userId]
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

  }

}
