
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
 */
export async function updateUserProfile(userid, firstName, lastName, profilePic, height, weight, gender, dateOfBirth){
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
            dateOfBirth: dateOfBirth
        })
    });
}