import excuteQuery from "../../../lib/db";

/* Database Variables */

// userId, firstName, lastName, username, password, middleName, idNumber, role

export default async function handler(req, res) {
  
  if(req.method === 'GET') {

  } else if(req.method === 'POST') {

    console.log('hello post');

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const middleName = req.body.middleName;
    const idNumber = req.body.idNumber;
    const role = req.body.role;

    try {

      const result = await excuteQuery({
        query: 'INSERT INTO users (firstName, lastName, username, password, middleName, idNumber, role) VALUES(?, ?, ?, ?, ?, ?, ?)',                                                                 
        values: [firstName, lastName, username, password, middleName, idNumber, role]
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

  } else if(req.method === 'DELETE') {
    
  }

}
