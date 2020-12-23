import axios from 'axios'

export const mapUserData = async (user) => {
    const { uid, email } = user
    const token = await user.getIdToken(true)
    //const response = await axios.post("/api/users/email", {email});
    //console.log(response.data);
    return {
      //...response.data,
      firebaseId: uid,
      email,
      token,
    }
  }