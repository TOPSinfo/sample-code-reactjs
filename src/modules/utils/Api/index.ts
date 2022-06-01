// API URL
const baseURL: string = process.env.REACT_APP_tops_API_URL as string;

export const Api = {
  adminRegister: (payload: object, token: string) => {
    return fetch(`${baseURL}/adminRegister`, {
      // Your POST endpoint
      method: "POST",
      headers: {
        ...entryHeaders(token)
      },
      body: JSON.stringify({ data: payload })
    }).then((response) => response.json());
  },

  peopleInvite: (payload: object, token: string) => {
    return fetch(`${baseURL}/peopleInvite`, {
      // Your POST endpoint
      method: "POST",
      headers: {
        ...entryHeaders(token)
      },
      body: JSON.stringify({ data: payload })
    }).then((response) => response.json());
  },

  checkRolesbyEmail: (payload: object) => {
    return fetch(`${baseURL}/isAdminUserValid`, {
      // Your POST endpoint
      method: "POST",
      body: JSON.stringify({ data: payload })
    }).then((response) => response.json());
  }
};

function entryHeaders(firebaseToken: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${firebaseToken}`
  };
}

export default Api;
