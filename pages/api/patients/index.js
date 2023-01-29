import excuteQuery from "../../../lib/db";

/* Database Variables */

// userId, username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status

export default async function handler(req, res) {
  
  if(req.method === 'GET') {

    const role = "user";
    try {

      const result = await excuteQuery({
        query: 'SELECT * FROM users WHERE role=?',                                                                 
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
