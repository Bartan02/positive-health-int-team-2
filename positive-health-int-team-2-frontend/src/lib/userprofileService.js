
/**
 * @param {any} userid
 */
export async function getUserInfo(userid) {
    const response = await fetch(`https://userprofile-service-329f9e3f251a.herokuapp.com/userInfo/getUserInfo/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}   

/**
 * @param {any} userid
 */
export async function createUserProfile(userid){
    const response = await fetch('https://userprofile-service-329f9e3f251a.herokuapp.com/userInfo/createUserProfile', {
    // const response = await fetch('http://localhost:3018/userInfo/createUserProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: userid
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}


/**
 * @param {string | null} userid
 * @param {any} firstName
 * @param {any} lastName
 * @param {any} profilePic
 * @param {any} height
 * @param {any} weight
 * @param {any} gender
 * @param {any} dateOfBirth
 * @param {any} favoriteSports
 * @param {any} location
 */
export async function updateUserProfile(userid, firstName, lastName, profilePic, height, weight, gender, dateOfBirth, favoriteSports, location){
    const response = await fetch('https://userprofile-service-329f9e3f251a.herokuapp.com/userInfo/updateUserProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: userid,
            firstName: firstName,
            lastName: lastName,
            profilePic: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
            height: height,
            weight: weight,
            gender: gender,
            dateOfBirth: dateOfBirth,
            favoriteSports: favoriteSports,
            location: location
        })
    });
}

/**
 * @param {any} userid
 */
export async function getUserInfoAuth(userid){
    const response = await fetch(`https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/user/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}