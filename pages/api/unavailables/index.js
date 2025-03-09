import excuteQuery from "../../../lib/db";

/* Database Variables */

// userId, username, password, passwordText, role, patientName, patientAddress, contactNumber, gender, age, emailAddress, date, status

export default async function handler(req, res) {
  
  if(req.method === 'GET') {

    try {

        const result = await excuteQuery({
          query: 'SELECT * FROM unavailables'                                                            
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

    const value  = req.body.value;


    try {
       
        const existingDate = await excuteQuery({
            query: 'SELECT * FROM unavailables WHERE value = ?',
            values: [value],
        });
    
        let result;
        if (existingDate.length > 0) {
            // Step 2: If the date exists, delete it
            result = await excuteQuery({
                query: 'DELETE FROM unavailables WHERE value = ?',
                values: [value],
            });
    
            res.status(200).json({
                success: true,
                message: 'Date already existed and has been deleted.',
                data: result,
            });
        } else {
            // Step 3: If the date does not exist, insert it
            result = await excuteQuery({
                query: 'INSERT INTO unavailables (value) VALUES(?)',
                values: [value],
            });
    
            res.status(200).json({
                success: true,
                message: 'Date did not exist and has been inserted.',
                data: result,
            });
        }
    } catch (error) {
        // Handle any errors
        res.status(500).json({
            success: false,
            message: error.message || 'An error occurred while processing your request.',
            data: {},
        });
    }
   
  } else if(req.method === 'PUT') {
    
    
    
  } else if(req.method === 'DELETE') {
    
    
  }

}
