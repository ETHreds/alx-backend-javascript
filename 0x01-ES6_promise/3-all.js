import { createUser, uploadPhoto } from './utils';

export default function handleProfileSignup() {
  const profilePhoto = uploadPhoto();
  const userName = createUser();

  return Promise.all([profilePhoto, userName]).then((result) => {
    console.log(`${result[0].body} ${result[1].firstName} ${result[1].lastName}`);
  }).catch(() => (console.error('Signup system offline')));
}
