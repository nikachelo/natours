/* eslint-disable */

const formUserData = document.querySelector('.form-user-data');
const formPassword = document.querySelector('.form-user-settings');
let labelText;

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
    if (res.data.status === 'success') {
      showAlert('success', 'Settings are saved');
      labelText = 'Success';
    }
  } catch (err) {
    labelText = 'Error';
    showAlert('error', err.response.data.message);
  }
};

const updatePassword = async (currentPassword, password, passwordConfirm) => {
  try {
    console.log('daachire');
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/changepassword/',
      data: {
        currentPassword,
        password,
        passwordConfirm,
      },
      withCredentials: true,
    });
    if (res.data.status === 'success') {
      labelText = 'success';
      showAlert('success', 'Your password was changed');
    } else {
      console.log(res.data.status);
    }
  } catch (err) {
    labelText = 'Fail';
    showAlert('error', err.response.data.message);
  }
};

const updateLabel = (element, currentText, text, delay = 3000) => {
  element.textContent = text;
  setTimeout(() => {
    element.textContent = currentText;
  }, delay);
};

if (formUserData) {
  formUserData.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    await updateSettings(name, email);
    updateLabel(
      document.querySelector('.settings-button'),
      'SAVE SETTINGS',
      labelText,
    );
  });
}

if (formPassword) {
  formPassword.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('password-confirm').value;

    updateLabel(
      document.querySelector('.password-button'),
      'SAVE PASSWORD',
      'Updating',
    );
    await updatePassword(currentPass, password, confirmPass);
    updateLabel(
      document.querySelector('.password-button'),
      'SAVE PASSWORD',
      labelText,
    );

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
