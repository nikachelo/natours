/* eslint-disable */

const formUserData = document.querySelector('.form-user-data');

const updateSettings = async (name, email) => {
  try {
    console.log('daachire');
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateme',
      data: {
        name,
        email,
      },
      withCredentials: true,
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      showAlert('success', 'Settings are saved');
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

formUserData.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  updateSettings(name, email);
});
