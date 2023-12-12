async function findPerson(req,res){
  try{
    const response = await fetch('http://api-gateway:3025/auth/user/'+req.params.prompt, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    const result = await response.json();
    if(!response.ok) throw "Not found!";
    return res.status(200).json(result);
  } catch(error){
    return res.status(404).json(error.message);
  }
  }

async function findRelationship(req,res){

}

export default { findPerson, findRelationship }